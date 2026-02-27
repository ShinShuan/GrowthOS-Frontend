import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const backendUrl = process.env.BACKEND_URL || 'https://growthos-tau.vercel.app';

        const res = await fetch(`${backendUrl}/api/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API Proxy Error]', error);
        return NextResponse.json(
            { success: false, error: 'Erreur serveur interne.' },
            { status: 500 }
        );
    }
}
