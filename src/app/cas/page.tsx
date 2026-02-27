"use client";

import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, LineChart, Briefcase, Download, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const navItems = [
    { name: 'Accueil', url: '/', icon: Home },
    { name: 'Solution', url: '/solution', icon: LineChart },
    { name: 'Études de cas', url: '/cas', icon: Briefcase },
    { name: 'Guide Gratuit', url: '/capture', icon: Download }
];

const caseStudies = [
    {
        city: "Réseau Century 21",
        agency: "Intégration Multisites",
        description: "Un réseau de 15 agences cherchait à moderniser sa pige immobilière et réengager 40 000 contacts dormants dans leur CRM SweepBright. Les agents perdaient environ 3 heures par jour sur des appels non qualifiés.",
        results: [
            "120 RDVs qualifiés générés le premier mois",
            "+35% de mandats exclusifs (vs année précédente)",
            "Gains de 45h/semaine sur l'ensemble du réseau",
            "Mise en place d'une IA Agent Vocal (Marc) pour le premier contact"
        ],
        quote: "L'intelligence artificielle n'a pas remplacé nos agents, elle leur a rendu leur vrai métier : la négociation et l'humain. C'est le meilleur ROI technologique de l'année.",
        delay: 0.1
    },
    {
        city: "PropTech Startup",
        agency: "Acteur de l'Investissement Locatif",
        description: "Entreprise à forte croissance recevant 500 leads par semaine. Le temps de premier contact dépassait les 48h, entraînant une perte de 60% des prospects. Besoin urgent de qualification asynchrone.",
        results: [
            "Temps de réponse réduit à moins de 2 minutes (24/7)",
            "Taux de qualification via SMS/Email monté à 78%",
            "Booking Agent déployé pour planifier directement dans Calendly",
            "CA mensuel doublé en moins de 3 mois"
        ],
        quote: "Nous perdions des fortunes car la réactivité était notre point faible. Désormais, l'IA engage chaque prospect à la seconde où il dépose ses coordonnées.",
        delay: 0.3
    },
    {
        city: "Keller Williams",
        agency: "Centre d'Affaires Premium",
        description: "Une agence orientée transaction de prestige avec des clients internationaux. Les conseillers peinaient à faire du suivi long-terme sur des projets à horizon 12-24 mois.",
        results: [
            "Agent de Relance intelligent déployé sur des cycles de 18 mois",
            "Détection d'intention d'achat/vente via analyse des taux du marché",
            "Réactivation de 65 investisseurs 'silencieux'",
            "Pipeline pérennisé avec des revenus prévisibles"
        ],
        quote: "Le système de relance automatique avec des informations de marché pertinentes (DPE, taux) maintient un lien de confiance invisible mais extrêmement puissant.",
        delay: 0.5
    }
];

export default function CasPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary/30">
            <NavBar items={navItems} />

            <section className="pt-32 pb-20 container mx-auto px-4 z-10 relative">
                <div className="text-center max-w-4xl mx-auto space-y-6 mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl lg:text-7xl font-extrabold tracking-tight"
                    >
                        Résultats <span className="text-foreground">Déployés</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Explorez comment nos configurations d'Agents IA transforment vos bases de données dormantes en dizaines de milliers d'euros de chiffre d'affaires.
                    </motion.p>
                </div>

                <div className="flex flex-col space-y-16 max-w-4xl mx-auto">
                    {caseStudies.map((cas, index) => (
                        <motion.div
                            key={cas.city}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: cas.delay }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-primary/5 blur-[50px] rounded-full -z-10 group-hover:bg-primary/10 transition-colors" />
                            <div className="relative rounded-2xl border border-border p-2">
                                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                                <div className="relative flex flex-col md:flex-row gap-8 rounded-xl border bg-background/50 p-8 shadow-sm backdrop-blur-sm z-10">
                                    <div className="md:w-1/3 space-y-4 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
                                        <div className="inline-flex rounded-full border bg-muted p-3">
                                            <TrendingUp className="h-6 w-6 text-foreground" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold">{cas.city}</h3>
                                            <p className="text-muted-foreground mt-1 font-medium">{cas.agency}</p>
                                        </div>
                                        <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary/50 pl-4 mt-6">
                                            "{cas.quote}"
                                        </blockquote>
                                    </div>
                                    <div className="md:w-2/3 space-y-6">
                                        <div>
                                            <h4 className="text-lg font-semibold mb-2">Le Contexte</h4>
                                            <p className="text-muted-foreground leading-relaxed">{cas.description}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold mb-4">Résultats (en moins de 6 semaines)</h4>
                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {cas.results.map((result, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mr-3 shrink-0 mt-0.5" />
                                                        <span className="text-sm font-medium text-foreground">{result}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-24 text-center"
                >
                    <h2 className="text-2xl font-bold mb-6">Prêt à obtenir ces chiffres dans votre secteur ?</h2>
                    <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-white text-black hover:bg-white/90 group">
                        <Link href="/capture">
                            Voir si mon agence est éligible
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>
            </section>
        </main>
    );
}
