import HeroSection from '@/components/home/HeroSection.vue';
import InfoStripSection from '@/components/home/InfoStripSection.vue';
import WhySection from '@/components/home/WhySection.vue';
import TechStackSection from '@/components/home/TechStackSection.vue';
import ThreeJobsTeaser from '@/components/home/ThreeJobsTeaser.vue';

export const sectionRegistry = {
  Hero: HeroSection,
  Disclaimer: InfoStripSection,
  Why: WhySection,
  Technology: TechStackSection,
  AppPlaceholder: ThreeJobsTeaser,
};
