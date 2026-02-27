"use client";

import { cn } from "@/lib/utils";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Hero } from "@/components/ui/animated-hero";
import { Component as Globe } from "@/components/ui/interactive-globe";
import DisplayCards from "@/components/ui/display-cards";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Pricing } from "@/components/blocks/pricing";
import { Home, LineChart, Briefcase, Download, Sparkles, TrendingUp, Search, PhoneCall, Calendar, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const navItems = [
  { name: 'Accueil', url: '/', icon: Home },
  { name: 'Solution', url: '/solution', icon: LineChart },
  { name: 'Études de cas', url: '/cas', icon: Briefcase },
  { name: 'Guide Gratuit', url: '/capture', icon: Download }
];

const pbSolutionCards = [
  {
    icon: <Search className="size-5 text-primary" />,
    title: "1. Scraper Intelligent",
    description: "Score de chaleur 1-10",
    date: "15 min d'analyse",
    className:
      "[grid-area:stack] -translate-x-4 -translate-y-4 md:-translate-x-8 md:-translate-y-8 z-10 hover:z-[100] hover:scale-105 transition-all duration-300 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <PhoneCall className="size-5 text-primary" />,
    title: "2. Agent IA d'Appels",
    description: "Marc qualifie 24/7",
    date: "0 action requise",
    className:
      "[grid-area:stack] translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4 z-20 hover:z-[100] hover:scale-105 transition-all duration-300 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Calendar className="size-5 text-primary" />,
    title: "3. Booking Auto",
    description: "RDV dans votre agenda",
    date: "+10 rdv par mois",
    className:
      "[grid-area:stack] translate-x-8 translate-y-8 md:translate-x-16 md:translate-y-16 z-30 hover:z-[100] hover:scale-105 transition-all duration-300 hover:grayscale-0 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:left-0 before:top-0",
  },
];

const pricingPlans = [
  {
    name: "STARTER",
    price: "1497",
    yearlyPrice: "1197",
    period: "Setup unique",
    features: [
      "1 agent spécialisé",
      "Setup en 48h",
      "Formation équipe (1h)",
      "Support 30 jours"
    ],
    description: "Idéal pour démarrer l'automatisation de vos relances.",
    buttonText: "Réserver un appel",
    href: "/capture",
    isPopular: false,
  },
  {
    name: "PROFESSIONNEL",
    price: "4997",
    yearlyPrice: "3997",
    period: "Setup complet",
    features: [
      "3 agents interconnectés",
      "Workflow complet de bout en bout",
      "CRM intégré automatique",
      "Support 90 jours",
      "Session stratégique mensuelle"
    ],
    description: "La solution la plus choisie par les agences performantes.",
    buttonText: "Réserver un appel",
    href: "/capture",
    isPopular: true,
  },
  {
    name: "TRANSFORMATION",
    price: "9997",
    yearlyPrice: "7997",
    period: "Déploiement sur mesure",
    features: [
      "10 agents customisés",
      "API & synchronisation interne",
      "Formation équipe (1 jour)",
      "Support premium 6 mois"
    ],
    description: "Pour les réseaux d'agences et volumes importants.",
    buttonText: "Demander un audit",
    href: "/capture",
    isPopular: false,
  },
];

export default function LandingPage() {
  const [selectedGlobeMarker, setSelectedGlobeMarker] = useState<any>(null);
  const [globeSize, setGlobeSize] = useState(500);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setGlobeSize(320);
      } else {
        setGlobeSize(500);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden selection:bg-primary/30">

      {/* Navbar en bas sur mobile, en haut sur desktop */}
      <NavBar items={navItems} />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 z-10">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                Agences Immobilières & Courtiers
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                247 contacts dormants = <span className="text-foreground">370 000€ évaporés</span> chaque année.
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                Les agences qui signent 50+ mandats par an ont un secret : l'IA automatise leur prospection pendant qu'elles se concentrent sur le closing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/capture" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full text-lg px-8 h-14 rounded-full">
                    Télécharger le Guide Gratuit (20p)
                  </Button>
                </Link>
                <Link href="/solution" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full text-lg px-8 h-14 rounded-full">
                    Voir la méthode
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
                Seulement 100 téléchargements ce mois
              </p>
            </div>

            <div className="flex-1 w-full lg:w-auto relative flex justify-center mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] w-full h-[300px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
              <Globe
                size={globeSize}
                className="opacity-90 max-w-full"
                markers={[
                  { lat: 40.7128, lng: -74.0060, label: "New York", data: { company: "Quantum Real Estate", figures: "+145% de mandats exclusifs", details: "L'IA prédictive identifie les vendeurs 6 mois avant la mise sur le marché. ROI de 340% en 1 an." } },
                  { lat: 51.5074, lng: -0.1278, label: "London", data: { company: "Prime Properties UK", figures: "10h sauvegardées/jour", details: "Le système de qualification vocale a remplacé un centre d'appels entier tout en augmentant la satisfaction client." } },
                  { lat: 48.8566, lng: 2.3522, label: "Paris", data: { company: "Agence Rive Gauche", figures: "+80 RDV vendeurs par mois", details: "Le scraping intelligent combiné au booking automatisé garantit un agenda plein aux négociateurs sans effort de prospection." } },
                  { lat: 35.6762, lng: 139.6503, label: "Tokyo", data: { company: "NeoTech Housing", figures: "-70% de churn client", details: "L'agent de Nurturing garde le contact avec les prospects dormants pendant des mois jusqu'à la maturation du projet." } },
                  { lat: -33.8688, lng: 151.2093, label: "Sydney", data: { company: "Harbour Estates", figures: "+3M$ de volume de ventes", details: "L'analyse prédictive du marché local permet aux agents d'avoir des arguments irréfutables lors de la relance." } },
                  { lat: 25.2048, lng: 55.2708, label: "Dubai", data: { company: "Sand & Stone Realty", figures: "Qualification 24/7 en 8 langues", details: "Le standard IA traite 100% des leads internationaux instantanément, éliminant la perte liée aux fuseaux horaires." } },
                  { lat: 1.3521, lng: 103.8198, label: "Singapore", data: { company: "LionCity Brokers", figures: "Conversion des leads doublée", details: "L'agent SMS asynchrone engage les prospects injoignables au téléphone, récupérant 60% des leads habituellement perdus." } },
                  { lat: -23.5505, lng: -46.6333, label: "São Paulo", data: { company: "Vanguard Imobiliária", figures: "Croissance de 200%", details: "Un écosystème IA complet gérant le lead du premier contact froid à la prise de rendez-vous qualifiée." } },
                ]}
                connections={[
                  { from: [40.7128, -74.0060], to: [51.5074, -0.1278] },
                  { from: [51.5074, -0.1278], to: [48.8566, 2.3522] },
                  { from: [48.8566, 2.3522], to: [25.2048, 55.2708] },
                  { from: [25.2048, 55.2708], to: [1.3521, 103.8198] },
                  { from: [1.3521, 103.8198], to: [35.6762, 139.6503] },
                  { from: [35.6762, 139.6503], to: [-33.8688, 151.2093] },
                  { from: [40.7128, -74.0060], to: [-23.5505, -46.6333] },
                ]}
                autoRotateSpeed={0.001}
                onMarkerClick={(marker) => setSelectedGlobeMarker(marker)}
              />

              {/* Globe Overlays */}
              {selectedGlobeMarker && selectedGlobeMarker.data && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-80 bg-background/95 border-2 border-primary/50 p-6 rounded-2xl shadow-2xl backdrop-blur-xl z-50 pointer-events-auto"
                >
                  <button onClick={() => setSelectedGlobeMarker(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                    <X className="w-5 h-5" />
                  </button>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">{selectedGlobeMarker.label}</p>
                  <h4 className="text-xl font-bold text-foreground mb-4">{selectedGlobeMarker.data.company}</h4>

                  <div className="space-y-4">
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                      <p className="text-sm font-semibold text-primary">Impact Business</p>
                      <p className="text-lg font-bold text-foreground">{selectedGlobeMarker.data.figures}</p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedGlobeMarker.data.details}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Problem Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Le Problème</h2>
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tight">Vous jetez 73% de vos leads.</h3>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 justify-between max-w-6xl mx-auto">
            <div className="flex-1 max-w-xl text-lg text-muted-foreground space-y-6">
              <p>
                Vous accumulez des contacts dans votre base de données sans pouvoir tous les suivre correctement. Ces <strong className="text-foreground">leads dormants</strong> ont pourtant 2,5× plus de chances de convertir.
              </p>
              <p>
                Notre solution remplace 3 commerciaux en automatisant : le <strong className="text-foreground">scraping</strong> CRM, les <strong className="text-foreground">appels de qualification</strong> (via notre IA Marc), et la <strong className="text-foreground">prise de rendez-vous</strong> dans votre agenda.
              </p>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <h4 className="text-4xl font-bold text-foreground">18.4K€</h4>
                  <span className="text-sm">Générés en 3 sem.</span>
                </div>
                <div className="h-10 w-px bg-border"></div>
                <div>
                  <h4 className="text-4xl font-bold text-foreground">+40%</h4>
                  <span className="text-sm">Taux de réponse</span>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center py-10">
              <DisplayCards cards={pbSolutionCards} />
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-sm font-bold tracking-widest text-primary uppercase">Preuves Sociales</h2>
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tight">Ils génèrent déjà des résultats.</h3>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Cas 1 */}
            <li className="list-none">
              <div className="relative h-full rounded-2xl border border-border p-2">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border bg-background/50 p-6 shadow-sm backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="inline-flex rounded-full border bg-muted p-2">
                      <TrendingUp className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Réseau Century 21</h3>
                    <p className="text-sm text-muted-foreground">Intégration Multisites</p>
                    <p className="text-lg font-medium">120 RDVs qualifiés générés le premier mois</p>
                    <div className="mt-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary border border-primary/20">
                      Gains 45h/semaine
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/* Cas 2 */}
            <li className="list-none">
              <div className="relative h-full rounded-2xl border border-border p-2">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border bg-background/50 p-6 shadow-sm backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="inline-flex rounded-full border bg-muted p-2">
                      <TrendingUp className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">PropTech Startup</h3>
                    <p className="text-sm text-muted-foreground">Acteur de l'Investissement Locatif</p>
                    <p className="text-lg font-medium">CA mensuel doublé en moins de 3 mois</p>
                    <div className="mt-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary border border-primary/20">
                      Taux réponse 78%
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {/* Cas 3 */}
            <li className="list-none">
              <div className="relative h-full rounded-2xl border border-border p-2">
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border bg-background/50 p-6 shadow-sm backdrop-blur-sm">
                  <div className="space-y-4">
                    <div className="inline-flex rounded-full border bg-muted p-2">
                      <TrendingUp className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Keller Williams</h3>
                    <p className="text-sm text-muted-foreground">Centre d'Affaires Premium</p>
                    <p className="text-lg font-medium">Réactivation de 65 investisseurs silencieux</p>
                    <div className="mt-4 inline-flex items-center justify-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary border border-primary/20">
                      Cycle long sécurisé
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing
        plans={pricingPlans}
        title="Choisissez votre automatisation"
        description="Passez d'un CRM inactif à une machine de relance vocale et textuelle automatique."
      />

    </main>
  );
}
