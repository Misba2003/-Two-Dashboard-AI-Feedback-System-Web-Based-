import { useState } from 'react';

export default function Home() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAiResponse(null);

    try {
      const response = await fetch(`${apiUrl}/api/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: parseInt(rating),
          review: review.trim(),
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setAiResponse(data.data.ai_response);
      } else {
        setError(data.error || 'Failed to submit review');
      }
    } catch (err) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        }

        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          padding: 40px;
          width: 100%;
          max-width: 600px;
        }

        .title {
          font-size: 28px;
          font-weight: 600;
          color: #1a202c;
          margin: 0 0 30px 0;
          text-align: center;
        }

        .formGroup {
          margin-bottom: 24px;
        }

        .label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 8px;
        }

        .select {
          width: 100%;
          padding: 12px 16px;
          font-size: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #1a202c;
          transition: all 0.2s;
          cursor: pointer;
        }

        .select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .select:hover {
          border-color: #cbd5e0;
        }

        .textarea {
          width: 100%;
          padding: 12px 16px;
          font-size: 16px;
          border: 2px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          color: #1a202c;
          font-family: inherit;
          resize: vertical;
          min-height: 120px;
          transition: all 0.2s;
        }

        .textarea:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .textarea:hover {
          border-color: #cbd5e0;
        }

        .button {
          width: 100%;
          padding: 14px 24px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        .button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(102, 126, 234, 0.5);
        }

        .button:active:not(:disabled) {
          transform: translateY(0);
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .responseCard {
          margin-top: 24px;
          padding: 20px;
          border-radius: 8px;
          background: #f0f9ff;
          border-left: 4px solid #667eea;
        }

        .responseTitle {
          font-size: 18px;
          font-weight: 600;
          color: #1a202c;
          margin: 0 0 12px 0;
        }

        .responseText {
          font-size: 15px;
          color: #4a5568;
          line-height: 1.6;
          margin: 0;
        }

        .errorCard {
          margin-top: 24px;
          padding: 20px;
          border-radius: 8px;
          background: #fef2f2;
          border-left: 4px solid #ef4444;
        }

        .errorTitle {
          font-size: 18px;
          font-weight: 600;
          color: #dc2626;
          margin: 0 0 12px 0;
        }

        .errorText {
          font-size: 15px;
          color: #991b1b;
          line-height: 1.6;
          margin: 0;
        }
      `}} />

      <div className="container">
        <div className="card">
          <h1 className="title">User Dashboard - Submit Review</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="rating" className="label">Rating:</label>
              <select
                id="rating"
                className="select"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="formGroup">
              <label htmlFor="review" className="label">Review:</label>
              <textarea
                id="review"
                className="textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows="5"
                required
              />
            </div>

            <button type="submit" className="button" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>

          {aiResponse && (
            <div className="responseCard">
              <h2 className="responseTitle">AI Response:</h2>
              <p className="responseText">{aiResponse}</p>
            </div>
          )}

          {error && (
            <div className="errorCard">
              <h2 className="errorTitle">Error:</h2>
              <p className="errorText">{error}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

