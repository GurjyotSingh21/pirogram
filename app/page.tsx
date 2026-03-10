import LandingPage from "@/components/landingPage/LandingPage";
import Navbar from "../components/landingPage/Navbar";
import CardsPage from "@/components/cardsPage/CardsPage";

import { getEvents } from "@/lib/actions/event.actions"

export default async function Home() {

  const events = await getEvents()
  return (
    <main>
      <Navbar />
      <LandingPage />
      <CardsPage
        events={events}
      />

    </main>
  );
}
