import { Routes, Route } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailsPage";

function App() {
  return (
    <div className="container-page">
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path=":id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
