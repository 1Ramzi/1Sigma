"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@/components/Icon";
import { useLanguage } from "@/context/LanguageContext";

const ONBOARDING_KEY = "samy_onboarding_done";

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    targetSelector: string;
    position: "bottom" | "top" | "left" | "right";
    icon?: string;
    action?: { label: string; onClick?: () => void };
}

const Onboarding = () => {
    const { t } = useLanguage();
    const [active, setActive] = useState(false);
    const [step, setStep] = useState(0);
    const [highlight, setHighlight] = useState<DOMRect | null>(null);

    const steps: OnboardingStep[] = [
        {
            id: "welcome",
            title: t.onboardingWelcome,
            description: t.onboardingWelcomeDesc,
            targetSelector: "",
            position: "bottom",
            icon: "star-fill",
        },
        {
            id: "video",
            title: t.onboardingVideo,
            description: t.onboardingVideoDesc,
            targetSelector: "[data-onboarding='video']",
            position: "bottom",
            icon: "play",
            action: { label: t.watchVideo },
        },
        {
            id: "stats",
            title: t.onboardingStats,
            description: t.onboardingStatsDesc,
            targetSelector: "[data-onboarding='stats']",
            position: "bottom",
            icon: "chart",
        },
        {
            id: "broker",
            title: t.onboardingBroker,
            description: t.onboardingBrokerDesc,
            targetSelector: "[data-onboarding='broker']",
            position: "left",
            icon: "wallet",
        },
        {
            id: "quickaccess",
            title: t.onboardingQuickAccess,
            description: t.onboardingQuickAccessDesc,
            targetSelector: "[data-onboarding='quickaccess']",
            position: "left",
            icon: "zap",
        },
    ];

    useEffect(() => {
        const done = localStorage.getItem(ONBOARDING_KEY);
        if (!done) {
            const timer = setTimeout(() => setActive(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const updateHighlight = useCallback(() => {
        const currentStep = steps[step];
        if (!currentStep?.targetSelector) {
            setHighlight(null);
            return;
        }
        const el = document.querySelector(currentStep.targetSelector);
        if (el) {
            const rect = el.getBoundingClientRect();
            setHighlight(rect);
        } else {
            setHighlight(null);
        }
    }, [step, steps]);

    useEffect(() => {
        if (!active) return;
        updateHighlight();
        window.addEventListener("resize", updateHighlight);
        window.addEventListener("scroll", updateHighlight, true);
        return () => {
            window.removeEventListener("resize", updateHighlight);
            window.removeEventListener("scroll", updateHighlight, true);
        };
    }, [active, step, updateHighlight]);

    const finish = () => {
        setActive(false);
        localStorage.setItem(ONBOARDING_KEY, "true");
    };

    const next = () => {
        if (step < steps.length - 1) {
            setStep(step + 1);
        } else {
            finish();
        }
    };

    const prev = () => {
        if (step > 0) setStep(step - 1);
    };

    if (!active) return null;

    const currentStep = steps[step];
    const isCenter = !currentStep.targetSelector;
    const pad = 12;

    // Tooltip position calculation
    const getTooltipStyle = (): React.CSSProperties => {
        if (isCenter || !highlight) {
            return {
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10002,
            };
        }
        const pos = currentStep.position;
        const style: React.CSSProperties = { position: "fixed", zIndex: 10002 };
        if (pos === "bottom") {
            style.top = highlight.bottom + pad;
            style.left = highlight.left + highlight.width / 2;
            style.transform = "translateX(-50%)";
        } else if (pos === "top") {
            style.bottom = window.innerHeight - highlight.top + pad;
            style.left = highlight.left + highlight.width / 2;
            style.transform = "translateX(-50%)";
        } else if (pos === "left") {
            style.top = highlight.top + highlight.height / 2;
            style.right = window.innerWidth - highlight.left + pad;
            style.transform = "translateY(-50%)";
        } else if (pos === "right") {
            style.top = highlight.top + highlight.height / 2;
            style.left = highlight.right + pad;
            style.transform = "translateY(-50%)";
        }
        return style;
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
                                            x={highlight.left - 8}
                                            y={highlight.top - 8}
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
                                    left: highlight.left - 8,
                                    top: highlight.top - 8,
                                    width: highlight.width + 16,
                                    height: highlight.height + 16,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </motion.div>

                    {/* Tooltip card */}
                    <motion.div
                        key={currentStep.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.25 }}
                        style={getTooltipStyle()}
                        className="w-[340px] max-w-[90vw]"
                    >
                        <div className="bg-b-surface1 border border-s-border rounded-2xl shadow-depth p-5 space-y-3">
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
