import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";
import FormErrorMsg from "@/components/form/FormErrorMsg";
import { Toaster, toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { app, db, storage } from "@/lib/firebase/init";
import { FirebaseError } from "firebase/app";
import { addDoc, collection } from "firebase/firestore";
import { CreateEventSchema, CreateEventType } from "@/schemas/events";
import { Input } from "@/components/ui/input";
import { XIcon } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import useAuth from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
// import { CalendarForm, DatePicker } from "@/components/form/DatePicker";

export default function CreateEventPage(): JSX.Element {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const { userId } = useAuth();

  type FormData = CreateEventType & { image: FileList };
  const {
    formState: { isSubmitting, errors },
    register,
    reset,
    getValues,
    resetField,
    handleSubmit,
  } = useForm<FormData>();
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(data: FormData) {
    console.log({ data });
    data.date = new Date(data.date);
    if (!CreateEventSchema.safeParse(data).success) {
      toast.warning("Failed creating events!", {
        description: "Try again later",
      });
      return;
    }
    if (!data.image || !data.image[0] || data.image.length > 1) {
      toast.warning("Failed creating events!", {
        description: "Try again later",
      });
      return;
    }
    try {
      /**
       * save event image
       */
      const imageRef = ref(storage, `events/${File.name + v4() + Date.now()}`);
      await uploadBytes(imageRef, data.image[0]);
      const imageUrl = await getDownloadURL(imageRef);

      /**
       * Save event
       */

      await addDoc(collection(db, "events"), {
        title: data.title,
        description: data.description,
        date: data.date,
        time: data.time,
        image: imageUrl,
        creatorId: userId,
        privacy: data.visibility,
      });

      setImagePreview("");

      toast.success("Success", {
        description: "Event created Successfully",
      });
      reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.warning("Failed creating events!", {
          description:
            error.message ||
            "Something went wrong. Please check everything carefully and try again",
        });
      }
    }
  }

  return (
    <>
      <Head>
        <title>V-space | Create event</title>
      </Head>
      <h1 className="mt-8 text-slate-500 text-center font-bold text-5xl">
        Create events here
      </h1>
      <form
        className="flex flex-col mt-8 mx-auto p-2 w-11/12 md:w-10/12 lg:w-4/6 xl:w-3/6 2xl:w-2/5 sm:p-8 h-2/3 justify-between border-2 border-red-50 rounded"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <label className="form-label" htmlFor="title">
          Event name
        </label>
        <FormErrorMsg erMsg={errors.title?.message} />

        <input
          className="form-input"
          {...register("title", {
            required: { value: true, message: "Event title is required" },
            minLength: {
              value: 5,
              message: "Title must be at least 5 characters",
            },
          })}
          id="title"
          type="text"
        />

        <label className="form-label" htmlFor="description">
          Event Description
        </label>
        <FormErrorMsg erMsg={errors.description?.message} />
        <Textarea
          id="description"
          {...register("description", {
            required: {
              value: true,
              message: "Description is required",
            },
          })}
        />

        <label className="form-label" htmlFor="date">
          Pick a date
        </label>
        <FormErrorMsg erMsg={errors.date?.message} />
        <input
          className="form-input"
          {...register("date", {
            required: {
              value: true,
              message: "Event date is required",
            },
          })}
          type="date"
          id="date"
        />
        <label className="form-label" htmlFor="time">
          Pick a time
        </label>
        <FormErrorMsg erMsg={errors.time?.message} />

        <input
          className="form-input"
          {...register("time", {
            required: {
              value: true,
              message: "Event time is required",
            },
          })}
          type="time"
          id="time"
        />

        <label htmlFor="visibility" className="form-label">
          Who can know about this event?
        </label>
        <FormErrorMsg erMsg={errors.visibility?.message} />

        <select
          className={cn("form-label", "px-3 py-3 bg-blue-100/75 rounded")}
          {...register("visibility", {
            required: { value: true, message: "Select privacy for your event" },
          })}
        >
          <option value="">Select privacy</option>
          <option value="public">public event</option>
          <option value="private">private event</option>
        </select>

        <label className="form-label" htmlFor="userPwd">
          Choose a profile image
        </label>
        <FormErrorMsg erMsg={errors.image?.message} />

        <Input
          {...register("image", {
            required: {
              value: true,
              message: "Please choose an image for your event",
            },
          })}
          className="my-4 border-2 border-blue-300 rounded p-2"
          onChange={handleFileChange}
          type="file"
        />

        {imagePreview && (
          <div className="relative border-2">
            <img
              className="w-[300px] rounded mb-6 mx-auto"
              src={imagePreview}
            />
            <XIcon
              onClick={() => {
                resetField("image");
                setImagePreview("");
              }}
              className="rounded-full bg-white absolute top-0 right-0 border-violet-600 border-2 w-[30px] h-[30px]"
            />
          </div>
        )}
        <button
          className="btn2 disabled:bg-gray-500 mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing you up.." : "Sign Up"}
        </button>
      </form>
      <Toaster richColors closeButton theme="light" />
    </>
  );
}
