import { useParams, useNavigate } from "react-router-dom";
import { useParkingById } from "../services/api";
import ParkingItem from "../components/ParkingItem";

export default function DetailsPage() {
  const params = useParams();
  const id = params.id ?? "";
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useParkingById(id);
  const slug = params.id;
  if (data) {
    data.id = slug ?? "";
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-semibold text-gray-900">Details {id}</h1>
      {isLoading && <div>Loading…</div>}
      {isError && <div role="alert">{error.message}</div>}
      {data && <ParkingItem itemInfo={data} />}
    </div>
  );
}
