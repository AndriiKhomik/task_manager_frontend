import { useGetBoardsQuery } from "../store/board/boardApi";

const HomePage = () => {
  const { data } = useGetBoardsQuery("board");
  console.log(data);

  return <div>HomePage</div>;
};

export default HomePage;
