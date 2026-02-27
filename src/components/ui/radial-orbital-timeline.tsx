"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    painPoint?: string;
    useCase?: string;
    category: string;
    icon: React.ElementType;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
    timelineData,
}: RadialOrbitalTimelineProps) {
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
        {}
    );
    const [viewMode, setViewMode] = useState<"orbital">("orbital");
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
    const [radius, setRadius] = useState(250);
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setRadius(110);
            } else if (window.innerWidth < 1024) {
                setRadius(180);
            } else {
                setRadius(250);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
            setCenterOffset({ x: 0, y: 0 });
        }
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const newPulseEffect: Record<number, boolean> = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);

                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
                setCenterOffset({ x: 0, y: 0 });
            }

            return newState;
        });
    };

    useEffect(() => {
        let rotationTimer: NodeJS.Timeout;

        if (autoRotate && viewMode === "orbital") {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => {
                    const newAngle = (prev + 0.3) % 360;
                    return Number(newAngle.toFixed(3));
                });
            }, 50);
        }

        return () => {
            if (rotationTimer) {
                clearInterval(rotationTimer);
            }
        };
    }, [autoRotate, viewMode]);

    const centerViewOnNode = (nodeId: number) => {
        if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;

        setRotationAngle(270 - targetAngle);

        // On mobile, also shift the center slightly down so the card has more room up top
        if (window.innerWidth < 768) {
            setCenterOffset({ x: 0, y: 80 });
        }
    };

    const calculateNodePosition = (index: number, total: number) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(
            0.4,
            Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
        );

        return { x, y, angle, zIndex, opacity };
    };

    const getRelatedItems = (itemId: number): number[] => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status: TimelineItem["status"]): string => {
        switch (status) {
            case "completed":
                return "text-white bg-black border-white";
            case "in-progress":
                return "text-black bg-white border-black";
            case "pending":
                return "text-white bg-black/40 border-white/50";
            default:
                return "text-white bg-black/40 border-white/50";
        }
    };

    return (
        <div
            className="w-full h-[600px] md:h-[800px] flex flex-col items-center justify-center bg-black overflow-hidden relative rounded-xl border border-white/10"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center transition-transform duration-700 ease-in-out"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    {/* Central sun/core */}
                    <div className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-white/80 via-white/50 to-white/20 animate-pulse flex items-center justify-center z-10">
                        <div className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/90 backdrop-blur-md"></div>
                    </div>

                    <div
                        className="absolute rounded-full border border-white/10"
                        style={{ width: `${radius * 2}px`, height: `${radius * 2}px` }}
                    ></div>

                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];
                        const Icon = item.icon;

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            zIndex: isExpanded ? 200 : position.zIndex,
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { nodeRefs.current[item.id] = el; }}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                <div
                                    className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""
                                        }`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
                                        width: `${item.energy * 0.4 + 30}px`,
                                        height: `${item.energy * 0.4 + 30}px`,
                                        left: `-${(item.energy * 0.4 + 30 - 30) / 2}px`,
                                        top: `-${(item.energy * 0.4 + 30 - 30) / 2}px`,
                                    }}
                                ></div>

                                <div
                                    className={`
                                        w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center pointer-events-auto
                                        ${isExpanded
                                            ? "bg-white text-black"
                                            : isRelated
                                                ? "bg-white/80 text-black"
                                                : "bg-black text-white"
                                        }
                                        border-2 
                                        ${isExpanded
                                            ? "border-white shadow-lg shadow-white/30"
                                            : isRelated
                                                ? "border-white animate-pulse"
                                                : "border-white/40"
                                        }
                                        transition-all duration-300 transform
                                        ${isExpanded ? "scale-110 md:scale-125" : ""}
                                    `}
                                >
                                    <Icon size={window.innerWidth < 768 ? 20 : 24} />
                                </div>

                                <div
                                    className={`
                                        absolute top-14 md:top-16 left-1/2 -translate-x-1/2 whitespace-nowrap
                                        text-[10px] md:text-sm font-semibold tracking-wider
                                        transition-all duration-300
                                        ${isExpanded ? "text-white scale-110" : "text-white/70"}
                                    `}
                                >
                                    {item.title}
                                </div>

                                {isExpanded && (
                                    <Card className="absolute bottom-20 md:bottom-auto md:top-24 left-1/2 -translate-x-1/2 w-[280px] sm:w-80 bg-black/95 backdrop-blur-xl border-white/30 shadow-2xl shadow-white/10 overflow-visible z-50">
                                        <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                                        <div className="md:hidden absolute -bottom-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <Badge
                                                    className={`px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider ${getStatusStyles(
                                                        item.status
                                                    )}`}
                                                >
                                                    {item.category}
                                                </Badge>
                                                <span className="text-xs font-mono text-white/50">
                                                    {item.date}
                                                </span>
                                            </div>
                                            <CardTitle className="text-lg mt-3 text-white">
                                                {item.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-white/80 space-y-3">
                                            <p className="leading-relaxed border-b border-white/10 pb-3">{item.content}</p>

                                            {item.painPoint && (
                                                <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-red-200">
                                                    <span className="font-semibold block mb-0.5 opacity-80 text-xs uppercase tracking-wider">Point de douleur</span>
                                                    {item.painPoint}
                                                </div>
                                            )}

                                            {item.useCase && (
                                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-2 text-emerald-200">
                                                    <span className="font-semibold block mb-0.5 opacity-80 text-xs uppercase tracking-wider">Utilité & Solution</span>
                                                    {item.useCase}
                                                </div>
                                            )}

                                            <div className="mt-4 pt-3 border-t border-white/10">
                                                <div className="flex justify-between items-center text-xs mb-1">
                                                    <span className="flex items-center text-white/70">
                                                        <Zap size={12} className="mr-1 text-white" />
                                                        Niveau d'Impact
                                                    </span>
                                                    <span className="font-mono text-white">{item.energy}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                                                    <div
                                                        className="h-full bg-white transition-all duration-1000 ease-out"
                                                        style={{ width: `${item.energy}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {item.relatedIds.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-white/10">
                                                    <div className="flex items-center mb-3">
                                                        <h4 className="text-xs uppercase tracking-wider font-semibold text-white/50">
                                                            Synergies
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.relatedIds.map((relatedId) => {
                                                            const relatedItem = timelineData.find(
                                                                (i) => i.id === relatedId
                                                            );
                                                            return (
                                                                <Button
                                                                    key={relatedId}
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="flex items-center h-7 px-3 text-xs rounded-full border-white/20 bg-transparent hover:bg-white text-white/80 hover:text-black transition-all"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleItem(relatedId);
                                                                    }}
                                                                >
                                                                    {relatedItem?.title}
                                                                    <ArrowRight
                                                                        size={12}
                                                                        className="ml-1 opacity-70"
                                                                    />
                                                                </Button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
