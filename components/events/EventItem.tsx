import { EventType } from "@/pages/events";
import React from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CopyIcon, Share2Icon } from "lucide-react";
import { copyText } from "@/lib/utils";
import { Toaster } from "sonner";

type EventItemProp = {
  eventItem: EventType;
};

function EventItem({
  eventItem: { date, image, time, title, visibility, eventId },
}: EventItemProp) {
  console.log(date);
  return (
    <li className="items-center shadow shadow-slate-400 hover:shadow-md max-w-[382px] rounded-md p-3 m-3">
      <article>
        <img src={image} alt={title} className="w-full" />
        <h2 className="text-slate-700 font-bold text-3xl border-y-2">
          {title}
        </h2>
        <p className="flex justify-between my-3">
          <span className="text-purple-900 rounded-md p-2 font-bold">
            {new Date(Number(date) * 1000).toLocaleDateString()}
          </span>
          <span className="text-purple-800 bg-purple-200 rounded-lg p-2 font-bold">
            {time}
          </span>
        </p>
        <div className="flex justify-between">
          <Button className="bg-purple-200 text-purple-800 hover:bg-purple-400 hover:text-white">
            See details
          </Button>
          <Popover>
            <PopoverTrigger>
              <Share2Icon className="w-7 h-7 text-purple-900 rounded md:mx-4" />
            </PopoverTrigger>
            <PopoverContent
              onClick={() => copyText(eventId)}
              className="flex items-center justify-between w-[140px] hover:border-blue-300 hover:border-2 hover:cursor-pointer"
            >
              Copy Link
              <CopyIcon />
            </PopoverContent>
          </Popover>
        </div>
      </article>
      <Toaster richColors closeButton theme="light" />
    </li>
  );
}

export default EventItem;
