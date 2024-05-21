import { Button, Card, TextInput } from 'flowbite-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormValues } from '../../interfaces/form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  onLogin: (data: LoginFormValues) => void;
}

const loginSchema = yup
  .object({
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
  })
  .required();

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    onLogin(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-96">
        <form className="flex flex-col max-w-md gap-4" onSubmit={handleSubmit(onSubmit)}>
          <p className="mx-auto mb-4 font-sans text-xl font-bold">Đăng nhập</p>
          <div>
            <TextInput id="email1" type="email" placeholder="Email của bạn" {...register('email')} />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div>
            <TextInput id="password1" type="password" placeholder="Mật khẩu" {...register('password')} />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <Link className="text-xs text-end" to={'/forgot-password'}>
            Quên mật khẩu
          </Link>
          <Button className="bg-blue-700 " type="submit">
            Đăng nhập
          </Button>
        </form>
        <div className="text-xs text-center text-dark">
          <span>Bạn chưa có tài khoản?</span>
          <Link to={'/register'} className="text-blue-500">
            Đăng ký
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
