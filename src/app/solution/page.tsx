"use client";

import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, LineChart, Briefcase, Download, Database, PhoneCall, Calendar, MessageSquare, Activity, ArrowRight } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const navItems = [
    { name: 'Accueil', url: '/', icon: Home },
    { name: 'Solution', url: '/solution', icon: LineChart },
    { name: 'Études de cas', url: '/cas', icon: Briefcase },
    { name: 'Guide Gratuit', url: '/capture', icon: Download }
];

const timelineData = [
    {
        id: 1,
        title: "Scraper Agent",
        date: "Base de données",
        content: "Parcourt vos bases de données, CRM et portails immobiliers pour identifier et corriger les contacts inactifs les plus prometteurs. Il enrichit la donnée et filtre les numéros non valides.",
        painPoint: "Des milliers de contacts accumulés inexploitables et chronographes à trier.",
        useCase: "Génère une liste propre et scorée de leads à contacter en priorité absolue.",
        category: "Extraction",
        icon: Database,
        relatedIds: [2, 5, 6],
        status: "completed" as const,
        energy: 100,
    },
    {
        id: 2,
        title: "Agent Vocal (Marc)",
        date: "Appels à froid",
        content: "Appelle en votre nom avec une voix humaine. Il qualifie le projet immobilier (vente, achat), filtre les curieux, traite les objections classiques, et transmet les chauds au Booking Agent.",
        painPoint: "La pige coûte trop de temps, démotive les équipes et génère trop de rejets.",
        useCase: "Filtre 100% des appels inutiles. Seuls les prospects qualifiés parlent à vos commerciaux.",
        category: "Qualification",
        icon: PhoneCall,
        relatedIds: [1, 3],
        status: "completed" as const,
        energy: 95,
    },
    {
        id: 5,
        title: "Agent SMS Qualif",
        date: "Asynchrone",
        content: "Engage la conversation par SMS pour les prospects injoignables au téléphone. Il qualifie silencieusement leurs besoins et rebondit si le prospect montre un signe d'intérêt.",
        painPoint: "Environ 60% des prospects ne répondent jamais à un appel inconnu.",
        useCase: "Convertit les injoignables silencieux en engageant des conversations textuelles amicales.",
        category: "Filtre Asynchrone",
        icon: MessageSquare,
        relatedIds: [1, 3],
        status: "completed" as const,
        energy: 85,
    },
    {
        id: 3,
        title: "Booking Agent",
        date: "Synchronisation",
        content: "Prend le relais dès qu'un prospect est déclaré 'chaud'. Il lit votre Google Calendar ou Outlook et cale un rendez-vous directement aux créneaux disponibles. Il envoie un SMS de confirmation.",
        painPoint: "Aller-retours interminables pour trouver un créneau et no-shows fréquents.",
        useCase: "Les RDV d'estimation ou visites apparaissent magiquement dans votre agenda.",
        category: "Conversion",
        icon: Calendar,
        relatedIds: [2, 4, 5],
        status: "completed" as const,
        energy: 90,
    },
    {
        id: 4,
        title: "Agent de Relance",
        date: "Nurturing",
        content: "Relance automatiquement par email ou SMS les prospects qui ont reporté le projet ou ne sont pas encore mûrs (cycle de 3/6/9 mois), jusqu'à ce qu'ils soient prêts à signer un mandat.",
        painPoint: "Oubli de relancer les projets à long terme par manque de rigueur.",
        useCase: "Garde un contact chaleureux sur 12 mois sans aucun effort humain.",
        category: "Suivi Long Terme",
        icon: Activity,
        relatedIds: [3],
        status: "completed" as const,
        energy: 75,
    },
    {
        id: 6,
        title: "Agent Data Miner",
        date: "Veille Locale",
        content: "Analyse en direct les prix du marché local et détecte les variations de DPE. Permet à vos commerciaux de contacter les prospects avec des arguments béton basés sur les derniers décrets.",
        painPoint: "Manque d'arguments percutants lors des appels de relance.",
        useCase: "Fournit à l'Agent de Relance des raisons très spécifiques de recontacter le lead.",
        category: "Analyse Marché",
        icon: LineChart,
        relatedIds: [1, 4],
        status: "completed" as const,
        energy: 80,
    },
    {
        id: 7,
        title: "Agent Support Web",
        date: "In-bound",
        content: "Prend en charge les visiteurs de votre site web 24/7. Répond aux questions fréquentes, qualifie l'urgence, et redirige vers un agent humain ou le Booking Agent.",
        painPoint: "Perte de leads hors des heures d'ouverture de l'agence.",
        useCase: "Un standardiste toujours éveillé qui ne laisse passer aucune opportunité entrante.",
        category: "Assistance",
        icon: Download,
        relatedIds: [3],
        status: "completed" as const,
        energy: 65,
    },
    {
        id: 8,
        title: "Agent Comptable",
        date: "Gestion",
        content: "Automatise la récolte des pièces comptables, lettrage bancaire et relance des factures impayées par email.",
        painPoint: "Lourdeur administrative qui éloigne de la vente et du closing.",
        useCase: "Une trésorerie toujours à jour sans y passer tout son dimanche.",
        category: "Back-office",
        icon: LineChart,
        relatedIds: [4, 7],
        status: "in-progress" as const,
        energy: 45,
    },
    {
        id: 9,
        title: "Agent RH/Recrutement",
        date: "Sourcing",
        content: "Parcourt LinkedIn et les CV-thèques pour chasser de nouveaux talents commerciaux, fait le premier tri et organise des entretiens vidéo.",
        painPoint: "Le turn-over des agents/négociateurs freine fortement la croissance de l'agence.",
        useCase: "Un chasseur de tête permanent qui vous amène des candidats pré-filtrés sur un plateau.",
        category: "Scale",
        icon: Briefcase,
        relatedIds: [2],
        status: "in-progress" as const,
        energy: 55,
    },
    {
        id: 10,
        title: "Rédacteur SEO",
        date: "Visibilité",
        content: "Analyse les requêtes Google de votre secteur et génère des articles de blog ultra-ciblés (prix au m², dynamise d'un quartier).",
        painPoint: "Le site n'attire pas de trafic organique localement.",
        useCase: "Poste du contenu local en continu pour dominer la recherche 'Immobilier + Ville'.",
        category: "Marketing",
        icon: MessageSquare,
        relatedIds: [1, 6],
        status: "completed" as const,
        energy: 70,
    }
];

export default function SolutionPage() {
    return (
        <main className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary/30">
            <NavBar items={navItems} />

            <section className="pt-32 pb-4 container mx-auto px-4 z-10 relative pointer-events-none">
                <div className="text-center max-w-4xl mx-auto space-y-6 pointer-events-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl lg:text-6xl font-extrabold tracking-tight"
                    >
                        L'Écosystème <span className="text-foreground">Autonome</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-muted-foreground"
                    >
                        Une synergie parfaite. Explorez comment vos Agents IA communiquent entre eux pour transformer vos bases de données en rendez-vous qualifiés.
                    </motion.p>
                </div>
            </section>

            {/* The Orbital Component */}
            <div className="-mt-10 lg:-mt-20 relative z-50">
                <RadialOrbitalTimeline timelineData={timelineData} />
            </div>

            <section className="pb-32 pt-10 container mx-auto px-4 text-center z-10 relative">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Button asChild size="lg" className="h-14 px-8 text-lg rounded-full w-full sm:w-auto bg-white text-black hover:bg-white/90 group">
                        <Link href="/capture">
                            Installer ce système dans mon agence
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </motion.div>
            </section>
        </main>
    );
}
