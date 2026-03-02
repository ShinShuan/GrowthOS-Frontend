/**
 * Service pour l'intégration Zoho CRM vers les Leads
 */

export interface ZohoLead {
    nom: string;
    email: string;
    telephone: string;
    agence?: string;
}

export async function createZohoLead(lead: ZohoLead) {
    // Note : L'intégration Zoho nécessite normalement un Access Token OAuth2.
    // Pour rester simple et efficace dans un premier temps, on prépare la structure
    // qui pourra être utilisée soit avec le SDK Zoho, soit via une requête fetch directe.

    const ZOHO_API_URL = process.env.ZOHO_API_URL || 'https://www.zohoapis.eu/crm/v2/Leads';
    const ZOHO_ACCESS_TOKEN = process.env.ZOHO_ACCESS_TOKEN;

    if (!ZOHO_ACCESS_TOKEN) {
        console.warn("⚠️ ZOHO_ACCESS_TOKEN manquant. Le lead ne sera pas envoyé à Zoho.");
        return { success: false, error: "Missing token" };
    }

    try {
        const response = await fetch(ZOHO_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${ZOHO_ACCESS_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: [
                    {
                        Last_Name: lead.nom, // Last_Name est obligatoire dans Zoho CRM
                        Email: lead.email,
                        Phone: lead.telephone,
                        Company: lead.agence || 'B2C / Indépendant',
                        Lead_Source: 'Site Web GrowthOS',
                        Description: 'Lead généré via le formulaire du site web.'
                    }
                ],
                trigger: ['workflow'] // Déclenche les automatisations Zoho
            })
        });

        const result = await response.json();

        if (response.ok) {
            console.log("✅ Lead enregistré dans Zoho CRM");
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
