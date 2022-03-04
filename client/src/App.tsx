import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameAddForm } from "./components/GameAddForm";
import { GameDetail } from "./components/GameDetail";
import { Games } from "./components/Games";
import { Landing } from "./components/Landing";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Layout />}>
          <Route path="/games" element={<Games />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="/games/add" element={<GameAddForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
