import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { CreateEventType } from "@/schemas/events";
import EventItem from "@/components/events/EventItem";

export type EventType = CreateEventType & {
  creatorId: string;
  image: string;
  eventId: string;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snaps) => {
      const eventsList = snaps.docs.map((snap) => {
        console.log(snap.data());
        return { ...snap.data(), eventId: snap.id } as EventType;
      });

      setEvents(eventsList);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  if (events.length === 0 && !loading) {
    return (
      <p className="text-slate-500 font-bold text-5xl mt-4 p-3 mx-auto w-[300px] sm:w-auto text-center">
        No events have been created yet.!!
      </p>
    );
  }
  if (loading) {
    return (
      <p className="text-slate-500 font-bold text-5xl mt-4 p-3 mx-auto w-[300px] sm:w-auto text-center">
        Getting all events...
      </p>
    );
  }
  console.log(events);
  return (
    <ul className="flex flex-col lg:flex-row border-3 mx-auto lg:w-[80%] lg:mt-10">
      {events.map((e) => (
        <EventItem eventItem={e} />
      ))}
    </ul>
  );
}
