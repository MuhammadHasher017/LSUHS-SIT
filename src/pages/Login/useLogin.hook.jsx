import { useLoginMutation } from '@/store/api/authApi';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const result = await login(values).unwrap();
      console.log('Login successful:', result);
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return {
    handleLogin,
    loading: isLoading,
    error: error?.data?.message || null, // API error message
  };
};

export default useLogin;
