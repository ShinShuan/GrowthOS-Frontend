import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        let backendUrl = process.env.BACKEND_URL || 'https://growth-os-backend-wwa4.vercel.app';
        // Normalize URL: remove trailing slash
        backendUrl = backendUrl.replace(/\/$/, "");

        console.log(`[API Proxy] Forwarding to: ${backendUrl}/api/leads`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout to beat Vercel's 10s limit

        try {
            const res = await fetch(`${backendUrl}/api/leads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            // Try to get response text first in case it's not JSON
            const text = await res.text();
            console.log(`[API Proxy] Backend responded with status ${res.status}`);

            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                data = { message: text || 'Erreur inconnue du serveur backend.' };
            }

            if (!res.ok) {
                console.error(`[API Proxy] Backend returned ${res.status}:`, data);
                return NextResponse.json(
                    { success: false, message: data.message || data.error || 'Le serveur backend a renvoyé une erreur.' },
                    { status: res.status }
                );
            }

            return NextResponse.json(data);
        } catch (fetchError: any) {
            if (fetchError.name === 'AbortError') {
                console.error('[API Proxy] Request timed out after 8s');
                return NextResponse.json(
                    { success: false, message: 'Le serveur backend met trop de temps à répondre (Timeout).' },
                    { status: 504 }
                );
            }
            throw fetchError;
        }
    } catch (error: any) {
        console.error('[API Proxy Error]', error);
        return NextResponse.json(
            { success: false, message: `Erreur de communication : ${error.message || 'Le serveur est injoignable.'}` },
            { status: 500 }
        );
    }
}
