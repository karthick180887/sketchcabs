import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

type BookingPayload = {
    name?: string;
    phone?: string;
    pickup?: string;
    drop?: string;
    date?: string;
    time?: string;
    carType?: string;
    distance?: number | string;
    fare?: {
        total?: number | string;
        baseFare?: number | string;
        bata?: number | string;
    };
};

const safeText = (value: unknown) => {
    if (typeof value === 'string') {
        const trimmed = value.trim();
        return trimmed || 'N/A';
    }
    if (value === null || value === undefined) {
        return 'N/A';
    }
    return String(value);
};

const safeNumber = (value: unknown) => {
    const num = typeof value === 'number' ? value : Number(value);
    return Number.isFinite(num) ? num : null;
};

const formatAmount = (value: unknown) => {
    const num = safeNumber(value);
    return num === null ? 'N/A' : `Rs ${Math.round(num)}`;
};

export async function POST(request: Request) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return NextResponse.json(
            { error: 'Telegram configuration missing' },
            { status: 500 }
        );
    }

    try {
        const body = (await request.json()) as BookingPayload;
        const requiredFields = {
            name: typeof body.name === 'string' ? body.name.trim() : '',
            phone: typeof body.phone === 'string' ? body.phone.trim() : '',
            pickup: typeof body.pickup === 'string' ? body.pickup.trim() : '',
            drop: typeof body.drop === 'string' ? body.drop.trim() : '',
        };

        if (!requiredFields.name || !requiredFields.phone || !requiredFields.pickup || !requiredFields.drop) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const distanceKm = safeNumber(body.distance);
        const distanceText = distanceKm === null ? 'N/A' : `${distanceKm} km`;

        const messageLines = [
            'New Booking Request',
            '',
            `Customer: ${safeText(body.name)}`,
            `Phone: ${safeText(body.phone)}`,
            '',
            `Pickup: ${safeText(body.pickup)}`,
            `Drop: ${safeText(body.drop)}`,
            '',
            `Date: ${safeText(body.date)}`,
            `Time: ${safeText(body.time)}`,
            `Car: ${safeText(body.carType)}`,
            `Distance: ${distanceText}`,
            '',
            `Est. Fare: ${formatAmount(body.fare?.total)}`,
            `(Base: ${formatAmount(body.fare?.baseFare)}, Bata: ${formatAmount(body.fare?.bata)})`,
        ];

        const message = messageLines.join('\n');

        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        // Log environment (safely)
        console.log(`Sending to Telegram. Token present: ${!!TELEGRAM_BOT_TOKEN}, ChatID: ${TELEGRAM_CHAT_ID}`);

        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
            }),
        });

        const data = await response.json();

        if (!data.ok) {
            console.error('Telegram API Error:', data);
            return NextResponse.json(
                { error: 'Failed to send notification to Telegram', details: data },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing booking request:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
