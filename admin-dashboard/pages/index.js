import { useState, useEffect } from 'react';

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/reviews`);
      const data = await response.json();

      if (data.status === 'success') {
        setReviews(data.data);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchReviews();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard - Reviews</h1>

      {error && (
        <div>
          <p>Error: {error}</p>
        </div>
      )}

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Rating</th>
            <th>Review</th>
            <th>AI Summary</th>
            <th>AI Action</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length === 0 ? (
            <tr>
              <td colSpan="5">No reviews found</td>
            </tr>
          ) : (
            reviews.map((review) => (
              <tr key={review.id}>
                <td>{review.rating}</td>
                <td>{review.review}</td>
                <td>{review.ai_summary || 'N/A'}</td>
                <td>{review.ai_action || 'N/A'}</td>
                <td>{formatDate(review.created_at)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

