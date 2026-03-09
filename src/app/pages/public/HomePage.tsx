import React from "react";
import { HeroSection } from "../../components/home/HeroSection";
import { StatsSection } from "../../components/home/StatsSection";
import { VisiMisiSection } from "../../components/home/VisiMisiSection";
import { ProgramsSection } from "../../components/home/ProgramsSection";
import { NewsSection } from "../../components/home/NewsSection";
import { EventsSection } from "../../components/home/EventsSection";
import { CTASection } from "../../components/home/CTASection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <VisiMisiSection />
      <ProgramsSection />
      <NewsSection />
      <EventsSection />
      <CTASection />
    </>
  );
}
