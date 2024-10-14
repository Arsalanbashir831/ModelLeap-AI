import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../Constants';

const useAuthValidation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Local state for authentication status
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('authToken');
      if (location.pathname === '/' || location.pathname === '/auth') {
        return;
      }

      if (!token) {
         setIsAuthenticated(false);
        navigate('/auth');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/auth/validate-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
            const data = await response.json()
            console.log(data);
          setIsAuthenticated(true); 
        } 
      } catch (error) {
        console.error('Error during token validation:', error);
         setIsAuthenticated(false);
        navigate('/auth');
      } finally{
        console.log("hook call",isAuthenticated)
      }
    };

    validateToken();
  }, [location.pathname, navigate , isAuthenticated]); 

 return { isAuthenticated };
};

export default useAuthValidation;
