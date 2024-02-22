import React from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";
import { useForm } from "react-hook-form";

function test() {
  const {
    formState: { isSubmitting, errors },
    register,
    reset,
    getValues,
    resetField,
    handleSubmit,
  } = useForm<{ sei: string }>();
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("sei")}>
        <option value="yo">yoooo</option>
        <option value="mo">mooooo</option>
        <option value="po">pooooo</option>
      </select>
      <button type="submit" className="btn">
        yoyoooooo
      </button>
    </form>
  );
}

export default test;
