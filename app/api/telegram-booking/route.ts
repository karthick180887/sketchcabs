
import { NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        return NextResponse.json(
            { error: 'Telegram configuration missing' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();
        const {
            name,
            phone,
            pickup,
            drop,
            date,
            time,
            carType,
            distance,
            fare
        } = body;

        const message = `
🚖 *New Booking Request*

👤 *Customer:* ${name || 'N/A'}
📱 *Phone:* \`${phone || 'N/A'}\`

📍 *Pickup:* ${pickup}
🎯 *Drop:* ${drop}

📅 *Date:* ${date}
🕐 *Time:* ${time}
🚙 *Car:* ${carType}
📏 *Distance:* ${distance} km

💰 *Est. Fare:* ₹${fare?.total || 'N/A'}
(Base: ₹${fare?.baseFare}, Bata: ₹${fare?.bata})
`;


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
                parse_mode: 'Markdown',
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
