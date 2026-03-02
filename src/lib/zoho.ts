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
    try {
        const accessToken = await getAccessToken();
        const ZOHO_API_URL = process.env.ZOHO_API_URL || 'https://www.zohoapis.eu/crm/v2/Leads';

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
            console.log("✅ Lead enregistré dans Zoho CRM via OAuth2");
            return { success: true, data: result };
        } else {
            console.error("❌ Erreur Zoho CRM API:", result);
            return { success: false, error: result };
        }
    } catch (error: any) {
        console.error("❌ Erreur lors de l'envoi à Zoho:", error.message);
        return { success: false, error: error.message };
    }
}
