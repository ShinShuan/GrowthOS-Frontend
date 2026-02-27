import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const backendUrl = process.env.BACKEND_URL || 'https://growth-os-backend-wwa4.vercel.app';

        const res = await fetch(`${backendUrl}/api/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error(`[API Proxy] Backend returned ${res.status}:`, data);
            return NextResponse.json(
                { success: false, message: data.message || 'Le serveur backend a renvoyé une erreur.' },
                { status: res.status }
            );
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('[API Proxy Error]', error);
        return NextResponse.json(
            { success: false, message: 'Erreur de communication avec le serveur (Proxy).' },
            { status: 500 }
        );
    }
}
