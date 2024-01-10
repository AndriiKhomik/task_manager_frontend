import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm, useWatch } from "react-hook-form";
import Loader from "./Loader";
import Input from "./UI/Input";
import Textarea from "./UI/Textarea";
import { useCreateCardMutation } from "../store/api/apiSlice";

const AddCardItem = ({ boardId }: { boardId: string | undefined }) => {
  const [createCard, { isLoading }] = useCreateCardMutation();
  const [disabled, setDisabled] = useState(true);
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const title = useWatch({ control, name: "title" });

  useEffect(() => {
    if (title) {
      setDisabled(false);
    }
  }, [title]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    createCard({ ...data, status: "TODO", boardId })
      .then((data: any) => {
        setDisabled(true);
        if (data.error) {
          toast.error(data.error.data.message);
        } else {
          reset();
          toast.success("Card created");
        }
      })
      .catch((e) => toast.error("Something went wrong"));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="border-t mt-4 pt-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input id="title" label="Title" register={register} errors={errors} />
        <Textarea
          id="description"
          label="Description"
          register={register}
          errors={errors}
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

export default AddCardItem;
