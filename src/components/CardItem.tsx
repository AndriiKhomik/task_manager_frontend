import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import {
  useDeleteCardMutation,
  useUpdateCardMutation,
} from "../store/api/apiSlice";
import Input from "./UI/Input";
import Textarea from "./UI/Textarea";
import { Card } from "../types";

const CardItem = ({ card }: { card: Card }) => {
  const [deleteCard] = useDeleteCardMutation();
  const [updateCard] = useUpdateCardMutation();

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
  };

  return (
    <div className="border border-slate-200 rounded-md p-2 mb-4">
      <form onSubmit={handleSubmit(onSubmit)} onBlur={handleSubmit(onSubmit)}>
        <Input
          id="title"
          register={register}
          errors={errors}
          classNames="border-none cursor-pointer"
        />
        <Textarea
          id="description"
          register={register}
          errors={errors}
          placeholder="Description..."
          classNames="border-none cursor-pointer placeholder:italic"
        />
      </form>
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
