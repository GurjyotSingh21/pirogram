import LandingPage from "@/components/landingPage/LandingPage";
import CardsPage from "@/components/cardsPage/CardsPage";

import { getEvents } from "@/lib/actions/event.actions"

export default async function Home() {

  const events = await getEvents()
  return (
    <main>
      <LandingPage />
      <CardsPage
        events={events}
      />

    </main>
  );
}
