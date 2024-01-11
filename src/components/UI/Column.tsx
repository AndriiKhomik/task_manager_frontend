import toast from "react-hot-toast";
import { useUpdateCardStatusMutation } from "../../store/api/apiSlice";

const Column = ({
  children,
  title,
  columnName,
}: {
  children: React.ReactNode;
  title: string;
  columnName: string;
}) => {
  const [updateCard] = useUpdateCardStatusMutation();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const cardId = e.dataTransfer.getData("text/plain");
    updateCard({ id: cardId, status: columnName })
      .then((data: any) => {
        if (data.error) {
          toast.error(data.error.data.message);
        } else {
          toast.success("Card updated");
        }
      })
      .catch((e) => toast.error("Something went wrong"));
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="rounded-md  p-2 bg-white w-72 mb-4 md:mr-4"
    >
      <div className="font-bold text-center mb-2 border-b pb-2">{title}</div>
      {children}
    </div>
  );
};

export default Column;
