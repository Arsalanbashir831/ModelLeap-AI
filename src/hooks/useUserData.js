import { useState, useEffect } from "react";
import { BASE_URL } from "../Constants";
import { useRecoilState } from "recoil";
import userState from "../atoms/userState";

const useUserData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const [userContext , setUserContext] = useRecoilState(userState)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/auth/get_user_data`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
if (response.ok) {
    const data = await response.json();
    console.log(data);
    setUserData(data); // Store user data in state
    setUserContext(data)
}
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false once request is complete
      }
    };

    fetchUserData();
  }, [  ]);

  return { userData, loading, error  };
};

export default useUserData;
