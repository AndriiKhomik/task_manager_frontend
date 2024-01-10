import AddBoardCard from "../components/AddBoardCard";
import BoardCard from "../components/BoardCard";
import Loader from "../components/Loader";

import { useGetBoardsQuery } from "../store/board/apiSlice";

const HomePage = () => {
  const { data, isLoading } = useGetBoardsQuery("board");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="m-4 p-4 border rounded-md bg-slate-50 border-slate-400">
        <div className="text-4xl font-bold text-center pb-4">Boards</div>
        {data?.length === 0 && (
          <div className="text-center text-xl pb-4">
            Please create your first board
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.map((board) => (
            <BoardCard key={board.id} board={board} />
          ))}
          <AddBoardCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
