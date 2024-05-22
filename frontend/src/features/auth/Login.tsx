import LoginForm from '../../components/form/LoginForm';
import axios from 'axios';
import Cookies from 'js-cookie';
import { LoginFormValues } from '../../interfaces/form';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/token',
        new URLSearchParams({
          username: data.email,
          password: data.password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      const { access_token } = response.data;
      Cookies.set('token', access_token);
      console.log('Login successful');

      navigate('/task');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  if (token) {
    return <Navigate to="/" />;
  } else {
    return <LoginForm onLogin={handleLogin} />;
  }
};

export default Login;
