import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function copyText(eventId: string) {
  await navigator.clipboard.writeText(
    `http://localhost:3000/events/${eventId}`
  );
  toast.info("Link copied!!!", {
    description: "Keep sharing!",
  });
}
export function cutOutFirst100Words(text: string) {
  const words = text.split(" ");
  const cutWords = words.slice(0, 38);
  return cutWords.join(" ");
}
export function convertTo12Hour(time24: string) {
  let timeSplit = time24.split(":");
  let hours = parseInt(timeSplit[0]);
  let minutes = parseInt(timeSplit[1]);

  const meridiem = hours < 12 ? "AM" : "PM";

  // Convert hours to 12-hour format
  if (hours === 0) {
    hours = 12; // 12 AM
  } else if (hours > 12) {
    hours = hours - 12; // PM hours
  }

  // Add leading zero to minutes if necessary
  minutes = (minutes < 10 ? "0" + minutes : minutes) as number;

  // Concatenate hours, minutes, and AM/PM
  const time12 = hours + ":" + minutes + " " + meridiem;
  return time12;
}
