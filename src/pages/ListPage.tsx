import { Link } from "react-router-dom";

export default function ListPage() {
  return (
    <div>
      <h1>ListPage</h1>
      <ul>
        <li><Link to="/1">Go to item 1</Link></li>
        <li><Link to="/2">Go to item 2</Link></li>
      </ul>
    </div>
  );
}