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
type EventItemProp = {
  eventItem: EventType & { date: number };
};
function EventItem({
  eventItem: { date, description,, image, time, title, visibility },
}: EventItemProp) {
  console.log(date);
  return (
    <li className="shadow shadow-black rounded-md p-3 m-3">
      <article>
        <img src={image} alt={title} className="w-full" />
        <h2 className="text-purple-600 font-bold text-3xl border-y-2">
          {title}
        </h2>
        <p className="flex justify-between my-3">
          <span className="bg-purple-800 text-white rounded-md p-2 font-bold">
            {new Date(date * 1000).toLocaleDateString()}
          </span>
          <span className="bg-purple-800 text-white rounded-lg p-2 font-bold">
            {time}
          </span>
        </p>
        <div>
          <Button>See details</Button>
          <Popover>
            <PopoverTrigger>
              <Share2Icon className="w-7 h-7 text-slate-500 rounded md:mx-4" />
            </PopoverTrigger>
            <PopoverContent
              onClick={() => copyText()}
              className="flex items-center justify-between w-[140px] hover:border-blue-300 hover:border-2 "
            >
              Copy Link
              <CopyIcon />
            </PopoverContent>
          </Popover>
        </div>
      </article>
    </li>
  );
}

export default EventItem;
