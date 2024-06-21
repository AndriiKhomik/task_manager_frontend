import React, { FC } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} from "../store/api/apiSlice";
import Input from "./UI/Input";
import { Board } from "../types";

interface BoardCardProps {
  board: Board;
}

const BoardCard: FC<BoardCardProps> = ({ board }) => {
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const handleRemove = () => {
    deleteBoard(board.id)
      .then(() => toast.success("Board removed"))
      .catch(() => toast.error("Something went wrong"));
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: board.title,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    if (values.title === board.title) {
      return;
    }

    updateBoard({ title: values.title, id: board.id })
      .then((data: any) => {
        if (data.error) {
          toast.error(data.error.data.message);
          reset();
        } else {
          toast.success("Board updated");
        }
      })
      .catch(() => toast.error("Something went wrong"));
  };

  return (
    <div className="bg-slate-200 border rounded-md border-slate-400 p-5 text-center min-h-44 flex flex-col justify-between">
      <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
        <Input
          id="title"
          register={register}
          errors={errors}
          classNames="text-center text-3xl font-bold border-none cursor-pointer"
        />
      </form>
      <div className="text-right flex justify-end items-center">
        <button
          type="button"
          className="text-sm text-white bg-red-400 rounded-md px-3 py-1 hover:bg-red-500 transition mr-2"
          onClick={handleRemove}
        >
          Remove
        </button>
        <Link to={`board/${board.id}`}>
          <div className=" bg-black rounded-md  text-white px-3 py-[6px] hover:text-slate-200 transition">
            <FaLongArrowAltRight />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BoardCard;
