import { useParams } from "react-router-dom";

export default function DetailsPage() {
  const params = useParams();
  const id = params.id ?? "";

  return <div>DetailsPage {id}
    
  </div>;
}
