import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../store/slices/authSlice';

const useLogin = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (values) => {
    setLoading(true);
    setError(null);
    const { email, password } = values;
    try {
      // Replace with real API call
      await dispatch(login({ email, password }));
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
};

export default useLogin; 