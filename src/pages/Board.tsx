import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  useGetBoardsQuery,
  useGetCardsByBoardIdQuery,
} from "../store/api/apiSlice";
import Column from "../components/UI/Column";
import CardItem from "../components/CardItem";
import AddCardItem from "../components/AddCardItem";
import Loader from "../components/Loader";
import SearchInput from "../components/SearchInput";
import { PROGRESS_TYPE } from "../types";

const Board = () => {
  const { boardId } = useParams();
  const { data, isLoading } = useGetCardsByBoardIdQuery(boardId!);
  const { data: boards } = useGetBoardsQuery("board");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SearchInput data={boards} />
      <div className="m-4 p-4 border rounded-md bg-slate-50 border-slate-400 relative">
        <div className="absolute top-6 left-7 hover:left-5 transition-all duration-200 w-6 hover:w-8">
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>

        <div className="text-center text-2xl font-bold mb-4">Workspace</div>
        <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start">
          <Column title="Todo" columnName={PROGRESS_TYPE.TODO}>
            {data
              ?.filter((card) => card.status === PROGRESS_TYPE.TODO)
              .map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
            <AddCardItem boardId={boardId} />
          </Column>
          <Column title="In progress" columnName={PROGRESS_TYPE.IN_PROGRESS}>
            {data
              ?.filter((card) => card.status === PROGRESS_TYPE.IN_PROGRESS)
              .map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
          </Column>
          <Column title="Done" columnName={PROGRESS_TYPE.DONE}>
            {data
              ?.filter((card) => card.status === PROGRESS_TYPE.DONE)
              .map((card) => (
                <CardItem key={card.id} card={card} />
              ))}
          </Column>
        </div>
      </div>
    </>
  );
};

export default Board;
