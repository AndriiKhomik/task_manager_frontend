import { FC } from "react";
import toast from "react-hot-toast";
import { PiEquals } from "react-icons/pi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from "../store/api/apiSlice";
import Input from "./UI/Input";
import Textarea from "./UI/Textarea";
import { Card } from "../types";

interface CardItemProps {
  card: Card;
}

const CardItem: FC<CardItemProps> = ({ card }) => {
  const [deleteCard] = useDeleteCardMutation();
  const [updateCard] = useUpdateCardMutation();

  const dragStartHandler = (e: React.DragEvent, card: Card) => {
    e.dataTransfer.setData("text/plain", card.id);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: card.title,
      description: card.description,
    },
  });

  const handleRemove = () => {
    deleteCard(card.id)
      .then(() => toast.success("Board removed"))
      .catch((e) => toast.error("Something went wrong"));
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.title !== card.title || data.description !== card.description) {
      updateCard({ ...data, id: card.id, status: card.status })
        .then((data: any) => {
          if (data.error) {
            toast.error(data.error.data.message);
            reset();
          } else {
            toast.success("Card updated");
          }
        })
        .catch((e) => toast.error("Something went wrong"));
    }
  };

  return (
    <div
      className="border border-slate-200 rounded-md p-2 mb-4"
      onDragStart={(e) => dragStartHandler(e, card)}
      draggable={true}
    >
      <div className="flex justify-center cursor-grab">
        <PiEquals />
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
          <Input
            id="title"
            register={register}
            errors={errors}
            classNames="border-none bg-slate-100 cursor-pointer"
          />
          <Textarea
            id="description"
            register={register}
            errors={errors}
            placeholder="Description..."
            classNames="border-none placeholder:italic resize-none min-h-20 bg-slate-100 cursor-pointer"
          />
        </form>
      </div>
      <div className="text-right">
        <button
          onClick={handleRemove}
          className="text-sm text-white bg-red-400 rounded-md px-2 py-1 hover:bg-red-500 transition mt-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CardItem;
