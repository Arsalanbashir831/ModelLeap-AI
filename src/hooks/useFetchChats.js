import { useState, useEffect } from "react";
import { BASE_URL } from "../Constants";

const useFetchChats = (botId, apiKey) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/bot/${botId}/chats`, {
          headers: {
            "x-api-key": apiKey,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch chats");
        }

        const data = await response.json();
        setChats(data?.chats || []); 
      } catch (err) {
        setError(err.message);
        console.error("Error fetching chats:", err);
      } finally {
        setLoading(false);
      }
    };

    if (botId && apiKey) {
      fetchChats();
    }
  }, [botId, apiKey]);

  return { chats, loading, error };
};

export default useFetchChats;
