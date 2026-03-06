import LandingPage from "@/components/landingPage/LandingPage";
import Navbar from "../components/landingPage/Navbar";
import CardsPage from "@/components/cardsPage/CardsPage";

export default function Home() {
  return (
    <main>
      <Navbar />
      <LandingPage />
      <CardsPage />
    </main>
  );
}
