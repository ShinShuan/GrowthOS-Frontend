import { NextRequest, NextResponse } from 'next/server';
import { createLead } from '@/lib/airtable';
import { sendPdfEmail } from '@/lib/email';
import { generateLeadMagnet } from '@/lib/pdf-generator';

export async function GET() {
    // Diagnostic for the user to check their Vercel variables on the frontend project
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'Leads';

    return NextResponse.json({
        success: true,
        project: "GrowthOS Frontend",
        config: {
            AIRTABLE_TABLE_NAME: tableName,
            AIRTABLE_BASE_ID_MASK: baseId ? `${baseId.substring(0, 3)}...${baseId.substring(baseId.length - 3)}` : 'MISSING',
            AIRTABLE_API_KEY_START: apiKey ? `${apiKey.substring(0, 4)}...` : 'MISSING',
            AIRTABLE_API_KEY_FORMAT: apiKey ? (apiKey.startsWith('pat') ? 'VALID (pat)' : 'INVALID (No pat)') : 'MISSING',
        }
    });
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { nom, email, telephone, agence } = body;

        if (!nom || !email || !telephone) {
            return NextResponse.json({ success: false, message: "Données manquantes." }, { status: 400 });
        }

        console.log(`[Lead API] Processing lead for: ${email}`);

        // 1. Create lead in Airtable
        try {
            await createLead({ nom, email, telephone, agence: agence || '' });
            console.log("✅ Lead créé dans Airtable");
        } catch (airtableError: any) {
            console.error("⚠️ Échec Airtable:", airtableError.message);
            return NextResponse.json({
                success: false,
                message: `Erreur Airtable : ${airtableError.message}`
            }, { status: 500 });
        }

        // 2. Generate PDF and Send Email (Non-blocking for the user response)
        (async () => {
            try {
                const pdfBuffer = await generateLeadMagnet(nom);
                await sendPdfEmail({ nom, email, pdfBuffer });
                console.log(`📧 Email envoyé à: ${email}`);
            } catch (emailError: any) {
                console.error("❌ Erreur génération/envoi email:", emailError.message);
            }
        })();

        return NextResponse.json({
            success: true,
            message: 'Lead enregistré avec succès !'
        });

    } catch (error: any) {
        console.error('[Lead API Error]', error);
        return NextResponse.json(
            { success: false, message: `Erreur serveur : ${error.message}` },
            { status: 500 }
        );
    }
}
