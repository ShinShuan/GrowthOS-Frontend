/**
 * Service pour l'intégration Zoho CRM avec gestion OAuth2 (Refresh Token)
 */

export interface ZohoLead {
    nom: string;
    email: string;
    telephone: string;
    agence?: string;
}

/**
 * Récupère un nouvel Access Token à partir du Refresh Token
 */
async function getAccessToken() {
    const clientID = process.env.ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN;

    if (!clientID || !clientSecret || !refreshToken) {
        throw new Error("Missing Zoho OAuth2 credentials (Client ID, Secret, or Refresh Token)");
    }

    // URL pour Zoho EU (modifiez si nécessaire pour .com)
    const tokenUrl = `https://accounts.zoho.eu/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientID}&client_secret=${clientSecret}&grant_type=refresh_token`;

    const response = await fetch(tokenUrl, { method: 'POST' });
    const data = await response.json();

    if (!response.ok || !data.access_token) {
        throw new Error(`Failed to refresh Zoho token: ${data.error || 'Unknown error'}`);
    }

    return data.access_token;
}

export async function createZohoLead(lead: ZohoLead) {
    console.log(`[Zoho CRM] Tentative d'envoi pour : ${lead.email}`);

    try {
        const accessToken = await getAccessToken();
        const ZOHO_API_URL = process.env.ZOHO_API_URL || 'https://www.zohoapis.eu/crm/v2/Leads';

        console.log(`[Zoho CRM] Utilisation de l'URL : ${ZOHO_API_URL}`);

        const response = await fetch(ZOHO_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: [
                    {
                        Last_Name: lead.nom,
                        Email: lead.email,
                        Phone: lead.telephone,
                        Company: lead.agence || 'B2C / Indépendant',
                        Lead_Source: 'Site Web GrowthOS',
                        Description: 'Lead généré via le formulaire du site web.'
                    }
                ],
                trigger: ['workflow']
            })
        });

        const result = await response.json();

        if (response.ok) {
            console.log("✅ [Zoho CRM] Lead enregistré avec succès ! ID:", result.data?.[0]?.details?.id || 'Inconnu');
            return { success: true, data: result };
        } else {
            console.error("❌ [Zoho CRM] Erreur API détectée :", JSON.stringify(result, null, 2));
            return { success: false, error: result };
        }
    } catch (error: any) {
        console.error("❌ [Zoho CRM] Erreur critique lors de l'envoi :", error.message);
        if (error.message.includes("credential")) {
            console.error("👉 CONSEIL : Vérifiez vos variables ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET et ZOHO_REFRESH_TOKEN sur Vercel.");
        }
        return { success: false, error: error.message };
    }
}
