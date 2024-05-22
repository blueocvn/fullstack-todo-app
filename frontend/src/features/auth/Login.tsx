import { enqueueSnackbar } from 'notistack';

import { useLoginMutation } from '../../app/services/api';
import { LoginForm } from '../../components/form/LoginForm';
import { LoginModel } from '../../types/Auth';
import { setTokens } from '../../utils/storage';

export const Login = () => {
  const [login] = useLoginMutation();

  async function handleLogin(data: LoginModel) {
    try {
      const token = await login(data).unwrap();

      setTokens(token);
      window.location.reload();
    } catch (error) {
      enqueueSnackbar('Login failed', {
        variant: 'warning',
      });
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="mb-12 text-2xl">Đăng Nhập</h1>
      <LoginForm onLoginFrame={handleLogin} />
    </div>
  );
};
