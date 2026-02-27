import Airtable from 'airtable';

const TABLE = process.env.AIRTABLE_TABLE_NAME || 'Leads';

function getBase() {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
        throw new Error('Configuration Airtable manquante (API Key ou Base ID).');
    }

    if (!baseId.startsWith('app')) {
        throw new Error(`AIRTABLE_BASE_ID invalide : "${baseId}".`);
    }

    return new Airtable({ apiKey }).base(baseId);
}

export interface LeadData {
    nom: string;
    email: string;
    telephone: string;
    agence: string;
}

export async function createLead(data: LeadData) {
    const base = getBase();
    console.log(`[Airtable] Creating lead in table: ${TABLE}`);

    try {
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Airtable Timeout (8s)')), 8000)
        );

        const createRecord = () => base(TABLE).create([
            {
                fields: {
                    "Nom": data.nom || "Client",
                    "Email": data.email || "",
                    "Téléphone": data.telephone || "",
                    "Agence": data.agence || ""
                },
            },
        ]);

        const records = await Promise.race([createRecord(), timeoutPromise]) as any;
        return records[0];
    } catch (error: any) {
        console.error('[Airtable Error]', error.message);
        throw error;
    }
}
