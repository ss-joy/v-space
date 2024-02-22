import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { CreateEventType } from "@/schemas/events";
import EventItem from "@/components/events/EventItem";

export type EventType = CreateEventType & { creatorId: string; image: string };

export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snaps) => {
      const eventsList = snaps.docs.map((snap) => {
        console.log(snap.data());
        return snap.data() as EventType;
      });

      setEvents(eventsList);
    });

    return () => {
      unsubscribe();
    };
  }, []);
  if (events.length === 0) {
    return <p>No events have been created yet.!!</p>;
  }
  return (
    <ul>
      {events.map((e) => (
        <EventItem eventItem={e} />
      ))}
    </ul>
  );
}
