import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../shared/service/auth.service';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here, e.g., clearing auth tokens
    logout();
    // Redirect to home after logout
    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;