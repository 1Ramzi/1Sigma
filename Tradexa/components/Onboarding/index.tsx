"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";

const ONBOARDING_KEY = "tradexa_onboarding_v5";
const TOOLTIP_W = 340;
const TOOLTIP_H_EST = 260;
const EDGE_MARGIN = 16;
const GAP = 14;

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    targetSelector: string;
    icon?: string;
}

const Onboarding = () => {
    const { t } = useLanguage();
    const [active, setActive] = useState(false);
    const [step, setStep] = useState(0);
    const [highlight, setHighlight] = useState<DOMRect | null>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const steps: OnboardingStep[] = [
        {
            id: "welcome",
            title: t.onboardingWelcome,
            description: t.onboardingWelcomeDesc,
            targetSelector: "",
            icon: "star-fill",
        },
        {
            id: "video",
            title: t.onboardingVideo,
            description: t.onboardingVideoDesc,
            targetSelector: "[data-onboarding='video']",
            icon: "play",
        },
        {
            id: "stats",
            title: t.onboardingStats,
            description: t.onboardingStatsDesc,
            targetSelector: "[data-onboarding='stats']",
            icon: "chart",
        },
        {
            id: "broker",
            title: t.onboardingBroker,
            description: t.onboardingBrokerDesc,
            targetSelector: "[data-onboarding='broker']",
            icon: "wallet",
        },
        {
            id: "quickaccess",
            title: t.onboardingQuickAccess,
            description: t.onboardingQuickAccessDesc,
            targetSelector: "[data-onboarding='quickaccess']",
            icon: "zap",
        },
    ];

    useEffect(() => {
        let mounted = true;
        try {
            // Clean old onboarding keys
            ["tradexa_onboarding_done", "tradexa_onboarding_v2", "tradexa_onboarding_v3", "tradexa_onboarding_v4"].forEach(k => {
                try { localStorage.removeItem(k); } catch {}
            });
            const done = localStorage.getItem(ONBOARDING_KEY);
            if (!done) {
                const timer = setTimeout(() => {
                    if (mounted) setActive(true);
                }, 1200);
                return () => { mounted = false; clearTimeout(timer); };
            }
        } catch {
            // localStorage unavailable
        }
        return () => { mounted = false; };
    }, []);

    const updateHighlight = useCallback(() => {
        const currentStep = steps[step];
        if (!currentStep?.targetSelector) {
            setHighlight(null);
            return;
        }
        const el = document.querySelector(currentStep.targetSelector);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            // Small delay to let scroll finish before reading rect
            requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                setHighlight(rect);
            });
        } else {
            setHighlight(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step]);

    useEffect(() => {
        if (!active) return;
        updateHighlight();
        const onLayout = () => {
            const currentStep = steps[step];
            if (!currentStep?.targetSelector) return;
            const el = document.querySelector(currentStep.targetSelector);
            if (el) setHighlight(el.getBoundingClientRect());
        };
        window.addEventListener("resize", onLayout);
        window.addEventListener("scroll", onLayout, true);
        return () => {
            window.removeEventListener("resize", onLayout);
            window.removeEventListener("scroll", onLayout, true);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active, step]);

    const finish = () => {
        setActive(false);
        localStorage.setItem(ONBOARDING_KEY, "true");
    };

    const next = () => {
        if (step < steps.length - 1) setStep(step + 1);
        else finish();
    };

    const prev = () => {
        if (step > 0) setStep(step - 1);
    };

    if (!active) return null;

    const currentStep = steps[step];
    const isCenter = !currentStep.targetSelector;

    // Smart tooltip positioning: always stays within viewport
    const getTooltipStyle = (): React.CSSProperties => {
        if (isCenter || !highlight) {
            return {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: Math.min(420, window.innerWidth - EDGE_MARGIN * 2),
                zIndex: 10002,
            };
        }

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const tw = Math.min(TOOLTIP_W, vw - EDGE_MARGIN * 2);
        const th = tooltipRef.current?.offsetHeight || TOOLTIP_H_EST;

        // Try bottom first
        const bottomSpace = vh - highlight.bottom - GAP;
        const topSpace = highlight.top - GAP;
        const leftSpace = highlight.left - GAP;

        let top: number;
        let left: number;

        if (bottomSpace >= th) {
            // Place below
            top = highlight.bottom + GAP;
            left = highlight.left + highlight.width / 2 - tw / 2;
        } else if (topSpace >= th) {
            // Place above
            top = highlight.top - GAP - th;
            left = highlight.left + highlight.width / 2 - tw / 2;
        } else if (leftSpace >= tw) {
            // Place to the left
            top = highlight.top + highlight.height / 2 - th / 2;
            left = highlight.left - GAP - tw;
        } else {
            // Place to the right
            top = highlight.top + highlight.height / 2 - th / 2;
            left = highlight.right + GAP;
        }

        // Clamp within viewport
        left = Math.max(EDGE_MARGIN, Math.min(left, vw - tw - EDGE_MARGIN));
        top = Math.max(EDGE_MARGIN, Math.min(top, vh - th - EDGE_MARGIN));

        return {
            position: "fixed",
            top,
            left,
            width: tw,
            zIndex: 10002,
        };
    };

    return (
        <AnimatePresence>
            {active && (
                <>
                    {/* Dark overlay with cutout */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[10000]"
                        style={{ pointerEvents: "auto" }}
                    >
                        <svg width="100%" height="100%" className="absolute inset-0">
                            <defs>
                                <mask id="onboarding-mask">
                                    <rect width="100%" height="100%" fill="white" />
                                    {highlight && (
                                        <rect
                                            x={Math.max(0, highlight.left - 8)}
                                            y={Math.max(0, highlight.top - 8)}
                                            width={highlight.width + 16}
                                            height={highlight.height + 16}
                                            rx={16}
                                            fill="black"
                                        />
                                    )}
                                </mask>
                            </defs>
                            <rect
                                width="100%"
                                height="100%"
                                fill="rgba(0,0,0,0.7)"
                                mask="url(#onboarding-mask)"
                            />
                        </svg>

                        {/* Highlighted area ring */}
                        {highlight && (
                            <motion.div
                                layoutId="onboarding-ring"
                                className="absolute rounded-2xl border-2 border-primary-01 pointer-events-none"
                                style={{
                                    left: Math.max(0, highlight.left - 8),
                                    top: Math.max(0, highlight.top - 8),
                                    width: highlight.width + 16,
                                    height: highlight.height + 16,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </motion.div>

                    {/* Tooltip card */}
                    <motion.div
                        ref={tooltipRef}
                        key={currentStep.id}
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        style={getTooltipStyle()}
                    >
                        <div className={`bg-b-surface1 border border-s-border rounded-2xl shadow-depth space-y-3 ${isCenter ? 'p-7' : 'p-5'}`}>
                            {/* Step indicator */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {currentStep.icon && (
                                        <div className="w-8 h-8 rounded-lg bg-primary-01/10 flex items-center justify-center">
                                            <Icon name={currentStep.icon} className="!size-4 fill-primary-01" />
                                        </div>
                                    )}
                                    <span className="text-caption text-t-tertiary font-medium">
                                        {t.onboardingStep} {step + 1}/{steps.length}
                                    </span>
                                </div>
                                <button
                                    onClick={finish}
                                    className="text-caption text-t-tertiary hover:text-t-primary transition-colors"
                                >
                                    {t.onboardingSkip}
                                </button>
                            </div>

                            {/* Progress dots */}
                            <div className="flex gap-1">
                                {steps.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1 rounded-full flex-1 transition-colors ${
                                            i <= step ? "bg-primary-01" : "bg-b-surface2"
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <h3 className="text-h6 font-bold text-t-primary">{currentStep.title}</h3>
                            <p className="text-body-2 text-t-secondary leading-relaxed">{currentStep.description}</p>

                            {/* Actions */}
                            <div className="flex items-center gap-2 pt-1">
                                {step > 0 && (
                                    <button
                                        onClick={prev}
                                        className="h-9 px-4 rounded-xl bg-b-surface2 border border-s-border text-caption font-semibold text-t-secondary hover:text-t-primary transition-colors"
                                    >
                                        {t.onboardingPrev}
                                    </button>
                                )}
                                <button
                                    onClick={next}
                                    className="h-9 px-5 rounded-xl bg-shade-01 dark:bg-shade-07 text-shade-07 dark:text-shade-01 text-caption font-semibold hover:opacity-90 transition-opacity ml-auto"
                                >
                                    {step === steps.length - 1 ? t.onboardingComplete : t.onboardingNext}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Onboarding;
