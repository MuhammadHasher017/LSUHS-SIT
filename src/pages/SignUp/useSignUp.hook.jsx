import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/slices/authSlice';

const useSignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async (values) => {
    setLoading(true);
    setError(null);
    const { email, password } = values;
    try {
      // Replace with real API call
      await dispatch(signup({ email, password }));
    } catch {
      setError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return { handleSignUp, loading, error };
};

export default useSignUp; 