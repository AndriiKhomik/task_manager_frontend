import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import Input from "./UI/Input";
import Loader from "./Loader";
import { useCreateBoardMutation } from "../store/api/apiSlice";
import { ResponseData } from "../types";

const AddBoardCard = () => {
  const [createBoard, { isLoading }] = useCreateBoardMutation();
  const [disabled, setDisabled] = useState<boolean>(true);
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
    },
  });

  const title = useWatch({ control, name: "title" });

  useEffect(() => {
    if (title) {
      setDisabled(false);
    }
  }, [title]);

  const onSubmit: SubmitHandler<FieldValues> = (inputValues) => {
    createBoard(inputValues.title)
      .then((data: ResponseData) => {
        setDisabled(true);
        if (data.error) {
          toast.error(data.error.data.message);
        } else {
          reset();
          toast.success("Board created");
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-slate-200 border rounded-md border-slate-400 p-5 text-center min-h-44 flex items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <Input
          id="title"
          label="Board title"
          register={register}
          errors={errors}
          classNames="bg-slate-300"
        />
        <div className="text-right mt-2">
          <button
            disabled={disabled}
            type="submit"
            className="border rounded-md border-slate-400 px-3 py-1 hover:bg-green-700 hover:text-white transition"
          >
            Add board
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBoardCard;
