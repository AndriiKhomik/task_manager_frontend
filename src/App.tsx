import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Board from "./pages/Board";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/board/:boardId" element={<Board />} />
    </Routes>
  );
}

export default App;
