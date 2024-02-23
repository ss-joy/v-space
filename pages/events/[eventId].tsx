import { db } from "@/lib/firebase/init";
import { Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { EventType } from ".";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { convertTo12Hour, cutOutFirst100Words } from "@/lib/utils";
import Link from "next/link";

export default function SingleEventDetailsPage(): JSX.Element {
  const router = useRouter();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showFullText, setShowFullText] = useState<boolean>(false);

  useEffect(() => {
    let unsub: Unsubscribe = () => {};
    if (router.query.eventId) {
      unsub = onSnapshot(
        doc(db, "events", router.query.eventId as string),
        (doc) => {
          console.log(doc.data());
          setEvent(doc.data() as EventType);
          setLoading(false);
        }
      );
    }

    return () => {
      unsub();
    };
  }, [router.query.eventId]);

  if (!event && loading) {
    return (
      <p className="text-slate-500 font-bold text-5xl mt-4 p-3 mx-auto w-[300px] sm:w-auto text-center">
        getting event details....
      </p>
    );
  }
  return (
    <main className="flex flex-col lg:w-[1400px] lg:mt-10 lg:flex-row lg:justify-between lg:items-start mx-auto">
      <article className="mt-6 p-2 max-w-[900px]">
        <Image
          src={event?.image as string}
          alt={event?.title as string}
          width={900}
          height={500}
          className="block mx-auto w-full rounded"
        />
        <h1 className="mt-4 p-2  lg:px-6 font-bold text-4xl text-slate-700">
          {event?.title}
        </h1>
        <p className="mt-4 p-2 text-slate-800 lg:px-6">
          {showFullText
            ? event?.description
            : cutOutFirst100Words(event?.description as string)}
        </p>
        <Button
          onClick={() => {
            setShowFullText((prev) => {
              return !prev;
            });
          }}
          className="bg-slate-300 rounded text-slate-700 px-2 lg:px-10 font-bold block ml-auto"
        >
          {showFullText ? "Show less" : "Show more"}
        </Button>
      </article>
      <div className="max-w-[300px] shadow-md lg:m-7 p-3">
        <div className="bg-purple-100 p-3 rounded-lg">
          <p className="flex justify-between mb-2 text-violet-800 font-bold lg:text-3xl">
            <span>On</span>
            <span>{new Date(Number(event?.date)).toLocaleDateString()}</span>
          </p>
          <p className="text-violet-800 font-bold lg:text-3xl">
            @{convertTo12Hour(event?.time as string)}
          </p>
        </div>
        <p className="text-violet-800 my-4">
          Wanna find out what others are thinking?
        </p>
        <Link
          className="bg-violet-100 font-bold text-center block p-3 rounded hover:bg-purple-300 hover:text-white"
          href={`/events/messages/${router.query.eventId}`}
        >
          Join rooms!
        </Link>
      </div>
    </main>
  );
}
