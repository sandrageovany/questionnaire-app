// client/src/pages/Admin.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [highestScore, setHighestScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHighestScore() {
      try {
        const res = await axios.get("http://localhost:4000/api/scores/highest");
        console.log("Highest Score Data:", res.data); // 👀 Debug log
        if (res.data && res.data.username) {
          setHighestScore(res.data);
        } else {
          setHighestScore(null);
        }
      } catch (err) {
        console.error("Error fetching highest score:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHighestScore();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Panel</h2>
      {highestScore ? (
        <>
          <p><strong>Username:</strong> {highestScore.username}</p>
          <p><strong>Score:</strong> {highestScore.score}</p>
          {/* <p><em>Submitted at:</em> {new Date(highestScore.at).toLocaleString()}</p> */}
        </>
      ) : (
        <p>No score yet</p>
      )}
    </div>
  );
}
