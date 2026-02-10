"use client";

import HeroSection from "@/components/landing/HomeOne/heroSection";
import SectionOne from "@/components/landing/HomeOne/sectionOne";
import SectionTwo from "@/components/landing/HomeOne/sectionTwo";
import SectionThree from "@/components/landing/HomeOne/sectionThree";
import SectionFour from "@/components/landing/HomeOne/sectionFour";
import CtaSection from "@/components/landing/HomeOne/ctaSection";
import CardSliderOne from "@/components/landing/common/sliders/Card/CardSliderOne";
import TextSliderOne from "@/components/landing/common/sliders/Text/TextSliderOne";
import CounterOne from "@/components/landing/common/Counter/CounterOne";
import HeaderHomeOne from "@/components/landing/layout/Header/HeaderHomeOne";
import FooterHomeOne from "@/components/landing/layout/Footer/footerHomeOne";
import ScrollTop from "@/components/landing/common/ScrollTop";
import Preloader from "@/components/landing/common/Preloader";

export default function LandingPage() {
    return (
        <>
            <HeaderHomeOne />
            <main>
                <HeroSection />
                <CounterOne light={false} />
                <SectionOne />
                <SectionTwo />
                <SectionThree />
                <TextSliderOne />
                <CardSliderOne />
                <SectionFour />
                <CtaSection />
            </main>
            <FooterHomeOne />
            <ScrollTop />
            <Preloader />
        </>
    );
}
