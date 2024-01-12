import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Board } from "../types";

const SearchInput = ({ data }: { data: Board[] | undefined }) => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (id: string) => {
    navigate(`/board/${id}`, { replace: true });
    setDropdown(false);
    setSearch("");
  };

  const handleClick = () => {
    setTimeout(() => {
      setDropdown(true);
    }, 1000);
  };

  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="m-4 relative">
      <input
        placeholder="Search board..."
        type="text"
        className="bg-slate-100 border border-slate-400 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-slate-400 focus:outline-none block w-full p-2 placeholder:italic"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={handleClick}
      />
      {dropdown && (
        <ul
          className="list-none absolute top-[42px] left-0 overflow-y-scroll right-0 max-h-[200px] shadow-md bg-white z-10"
          id="list"
        >
          {filteredData?.map((board) => (
            <li
              key={board.id}
              className="py-2 px-4 hover:bg-slate-400 hover:text-white transition-colors cursor-pointer"
              onClick={() => handleNavigate(board.id)}
            >
              {board.title} / {board.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
