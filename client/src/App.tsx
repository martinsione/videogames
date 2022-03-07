import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./components/About";
import { Form } from "./components/Form";
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
          <Route path="/games/add" element={<Form />} />
          <Route path="/games/edit/:id" element={<Form />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
