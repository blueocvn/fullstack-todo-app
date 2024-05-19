import { LoginForm } from '../../components/form/LoginForm';

export const Login = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="mb-12 text-2xl">Đăng Nhập</h1>
      <LoginForm />
    </div>
  );
};
