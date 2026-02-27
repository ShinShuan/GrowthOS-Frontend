"use client";

import { useState } from "react";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, LineChart, Briefcase, Download, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const navItems = [
    { name: 'Accueil', url: '/', icon: Home },
    { name: 'Solution', url: '/#solution', icon: LineChart },
    { name: 'Études de cas', url: '/#cas', icon: Briefcase },
    { name: 'Guide Gratuit', url: '/capture', icon: Download }
];

export default function CapturePage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            nom: formData.get("nom"),
            email: formData.get("email"),
            telephone: formData.get("telephone"),
            agence: formData.get("agence"),
            rgpd: formData.get("rgpd") === "on",
        };

        try {
            // Call our own Next.js API proxy to avoid CORS issues
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            const json = await res.json();
            if (res.ok && json.success) {
                setSuccess(true);
            } else {
                setError(json.message || "Une erreur est survenue.");
            }
        } catch (err) {
            setError("Erreur de connexion au serveur.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground font-sans relative">
            <NavBar items={navItems} />

            <section className="container mx-auto px-4 py-20 lg:py-32 flex justify-center min-h-screen items-center">
                {!success ? (
                    <div className="w-full max-w-xl mx-auto space-y-8">
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Le Guide Gratuit</h1>
                            <p className="text-muted-foreground text-lg">
                                10 RDV automatisés en 3 semaines. Entrez vos informations pour recevoir la méthode immédiatement.
                            </p>
                        </div>

                        <div className="relative group rounded-2xl border border-border p-1 bg-background/50 z-20 pointer-events-auto">
                            <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                            <form onSubmit={onSubmit} className="relative z-30 pointer-events-auto bg-card/90 backdrop-blur-md rounded-xl p-8 space-y-6 shadow-2xl">
                                <div className="space-y-4 relative z-40">
                                    <div className="space-y-2">
                                        <label htmlFor="nom" className="text-sm font-medium">Nom complet *</label>
                                        <input required id="nom" name="nom" className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Jean Dupont" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">Email professionnel *</label>
                                        <input required type="email" id="email" name="email" className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="jean@agence.fr" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="telephone" className="text-sm font-medium">Téléphone *</label>
                                        <input required type="tel" id="telephone" name="telephone" className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="06 12 34 56 78" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="agence" className="text-sm font-medium">Nom de l'agence</label>
                                        <input id="agence" name="agence" className="w-full bg-background border border-border rounded-lg h-12 px-4 focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Agence Immobilière" />
                                    </div>

                                    <div className="flex items-start gap-3 pt-2">
                                        <input required type="checkbox" id="rgpd" name="rgpd" className="mt-1 w-4 h-4 cursor-pointer" />
                                        <label htmlFor="rgpd" className="text-xs text-muted-foreground leading-relaxed">
                                            J'accepte de recevoir des communications concernant les produits et services. Mes données ne seront jamais revendues.
                                        </label>
                                    </div>
                                </div>

                                {error && <p className="text-sm text-center font-medium bg-secondary text-secondary-foreground py-2 rounded-md">{error}</p>}

                                <Button disabled={loading} type="submit" size="lg" className="w-full h-14 text-lg font-semibold rounded-full bg-white text-black hover:bg-white/90 group relative overflow-hidden">
                                    {loading ? "Envoi en cours..." : "Recevoir mon guide"}
                                    {!loading && <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                                </Button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className="w-full max-w-xl mx-auto space-y-8 text-center bg-card border border-border rounded-2xl p-12 shadow-2xl">
                        <div className="w-20 h-20 rounded-full bg-border mx-auto flex items-center justify-center">
                            <CheckCircle2 className="w-10 h-10 text-foreground" />
                        </div>
                        <h2 className="text-3xl font-bold">C'est parti !</h2>
                        <p className="text-muted-foreground text-lg">
                            Votre guide a été envoyé à votre adresse email. Pensez à vérifier vos courriers indésirables si vous ne le recevez pas d'ici 5 minutes.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            <strong className="text-foreground">PS:</strong> Notre Agent vous contactera d'ici quelques heures pour valider la réception.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
}
