import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Games } from "./components/Games";
import { Landing } from "./components/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/games" element={<Games />} />
      </Routes>
    </BrowserRouter>
  );
}
