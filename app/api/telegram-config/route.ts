import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const tokenPresent = Boolean(process.env.TELEGRAM_BOT_TOKEN);
    const chatIdPresent = Boolean(process.env.TELEGRAM_CHAT_ID);
    const googleMapsKeyPresent = Boolean(
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    );

    return NextResponse.json(
        { tokenPresent, chatIdPresent, googleMapsKeyPresent },
        { headers: { 'Cache-Control': 'no-store' } }
    );
}
