import { useRegisterMutation } from '../../app/services/api';
import { RegisterForm } from '../../components/form/RegisterForm';
import { RegisterModel } from '../../types/Auth';

import { enqueueSnackbar } from 'notistack';

export const Register = () => {
  const [register] = useRegisterMutation();

  async function handleRegister(data: RegisterModel) {
    try {
      await register(data).unwrap();
      enqueueSnackbar('Register Success', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Registration failed', {
        variant: 'warning',
      });
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="mb-12 text-2xl">Đăng Kí</h1>
      <RegisterForm onRegisterFrame={handleRegister} />
    </div>
  );
};
