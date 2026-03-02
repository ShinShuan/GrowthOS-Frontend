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
        instructions: "Vérifiez que AIRTABLE_TABLE_NAME correspond EXACTEMENT au nom de l'onglet dans Airtable (respectez les majuscules).",
        help_link: baseId?.startsWith('app') ? `https://airtable.com/${baseId}/api/docs` : "https://airtable.com/api",
        config: {
            AIRTABLE_TABLE_NAME: tableName,
            AIRTABLE_BASE_ID: baseId ? (baseId.startsWith('app') ? "✅ FORMAT OK" : "❌ DOIT COMMENCER PAR 'app'") : 'MISSING',
            AIRTABLE_BASE_ID_VALUE: baseId ? `${baseId.substring(0, 3)}...${baseId.substring(baseId.length - 3)}` : 'MISSING',
            AIRTABLE_API_KEY_FORMAT: apiKey ? (apiKey.startsWith('pat') ? '✅ PAT (OK)' : '⚠️ ANCIENNE CLÉ (PAT RECOMMANDÉ)') : 'MISSING',
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
            // On continue quand même vers Zoho et Email même si Airtable échoue
        }

        // 2. Create lead in Zoho CRM (New)
        try {
            const { createZohoLead } = await import('@/lib/zoho');
            await createZohoLead({ nom, email, telephone, agence: agence || '' });
        } catch (zohoError: any) {
            console.error("⚠️ Échec Zoho CRM:", zohoError.message);
        }

        // 3. Generate PDF and Send Email (Non-blocking)
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
