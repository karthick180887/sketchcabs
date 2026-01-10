import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const tokenPresent = Boolean(process.env.TELEGRAM_BOT_TOKEN);
    const chatIdPresent = Boolean(process.env.TELEGRAM_CHAT_ID);

    return NextResponse.json(
        { tokenPresent, chatIdPresent },
        { headers: { 'Cache-Control': 'no-store' } }
    );
}
