import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <p className="not-found-code">404</p>
      <h2>Route not found</h2>
      <p>There's nothing here.</p>
      <Link to="/" className="back-link">← Back to list</Link>
    </div>
  );
}

export default NotFoundPage;
