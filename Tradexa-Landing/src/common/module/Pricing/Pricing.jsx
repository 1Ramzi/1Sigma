import Button from '@/common/component/element/Button'
import ComponentTransition from '@/common/component/element/ComponentTransition'
import PricingCard from '@/common/component/element/PricingCard'
import SectionHeading from '@/common/component/element/SectionHeading'
import Link from 'next/link'
import React from 'react'
import { AiFillSliders } from 'react-icons/ai'

export default function Pricing() {
  return (
    <div className="h-auto max-w-[1500px]  px-10 xl:px-20 pb-20">
    <ComponentTransition className="flex justify-center py-5">
      <SectionHeading title="Nos Tarifs" icon={<AiFillSliders size={30} />} />
    </ComponentTransition>
    <ComponentTransition
      delay={0.1}
      className="flex justify-center items-center flex-col"
    >
      <h1 className="text-3xl md:text-5xl py-5 text-center bg-clip-text dark:bg-gradient-to-r from-white from-50% to-[#8f8f8f]  bg-text md:w-[50%] text-transparent font-bold">
      Choisissez votre Plan
      </h1>
      <p className="text-base md:text-2xl text-center text-neutral-500 dark:text-neutral-300">
      Sélectionnez l&apos;offre qui correspond à vos objectifs de trading.
      </p>
    </ComponentTransition>

      <PricingCard />

    <ComponentTransition className="w-full md:flex-row flex-col items-center flex justify-center gap-3">
      <a href="https://tradexa-dashboard.vercel.app" target="_blank" rel="noopener noreferrer" className="w-full rounded-full">
        <Button
            title="Commencer maintenant"
          className="hover:!bg-neutral-950 hover:dark:!bg-neutral-100 transition-colors !rounded-full duration-300 overflow-hidden !bg-transparent outline outline-1 dark:outline-white outline-neutral-950 dark:!text-white !text-black w-full py-5"
        />
      </a>
    </ComponentTransition>
  </div>
  )
}
