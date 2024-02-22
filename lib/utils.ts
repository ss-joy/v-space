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
