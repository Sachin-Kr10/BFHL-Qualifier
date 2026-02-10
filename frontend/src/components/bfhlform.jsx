import { useState } from "react";
import { postBfhl } from "../api/bfhl.api";

export default function BfhlForm() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setResult(null);

    let payload;

    try {
      payload = JSON.parse(input);
    } catch {
      setError("Invalid JSON format");
      return;
    }

    setLoading(true);

    try {
      const res = await postBfhl(payload);
      setResult(res.data);
    } catch (err) {
      if (!err.response) {
        setError("Server not reachable. Please try again.");
      } else if (err.response.status === 400) {
        setError(err.response.data?.error || "Bad request");
      } else if (err.response.status === 429) {
        setError("AI rate limit exceeded. Try again later.");
      } else if (err.response.status === 500) {
        setError("Internal server error");
      } else {
        setError("Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>BFHL API Tester</h2>

      <textarea
        placeholder='{"prime":[2,4,7,9,11]}'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      ></textarea>

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Submit"}
      </button>

      {error && <p className="error">{error}</p>}

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}
