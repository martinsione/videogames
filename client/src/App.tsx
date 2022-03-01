import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from "./components/Landing";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
