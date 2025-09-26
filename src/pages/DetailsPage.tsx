import { useParams } from "react-router-dom";
import { useParkingById } from "../services/api";
import ParkingItem from "../components/ParkingItem";

export default function DetailsPage() {
  const params = useParams();
  const id = params.id ?? "";

  const { data, isLoading, isError, error } = useParkingById(id);

  return (
    <div>
      <h1>DetailsPage {id}</h1>
      {isLoading && <div>Loading…</div>}
      {isError && <div role="alert">{error.message}</div>}
      {data && <ParkingItem itemInfo={data} />}
    </div>
  );
}
