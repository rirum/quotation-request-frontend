import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AppContext/Provider';

export function ProtectedRoute({ children }: any) {
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/page404');
    }
  }, [navigate]);
  return children;
}
