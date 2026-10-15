import { AvailabilityBar } from "@/components/layout/AvailabilityBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { IntroGate } from "@/components/motion/CinematicIntro";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <IntroGate>
      <SmoothScroll>
        <ScrollProgress />
        <AvailabilityBar />
        <Header />
        <main id="main-content" className="site-main flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
      </SmoothScroll>
    </IntroGate>
  );
}
