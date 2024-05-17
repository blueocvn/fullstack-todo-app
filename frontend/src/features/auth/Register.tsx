import { RegisterForm } from '../../components/RegisterForm';

export const Register = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="mb-12 text-2xl">Đăng Kí</h1>
      <RegisterForm />
    </div>
  );
};
