import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AppContext/Provider';

export function ProtectedRoute({ children }: any) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Verifique se o usuário está autenticado
    if (!user) {
      // Se não estiver autenticado, redirecione para a página de login
      navigate('/page404');
    }
  }, [user, navigate]);
  return children;
}
