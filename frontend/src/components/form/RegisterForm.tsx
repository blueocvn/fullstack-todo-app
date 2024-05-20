import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { RegisterFormValues } from '../../interfaces/form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface RegisterFormProps {
  onRegister: (data: RegisterFormValues) => void;
};

const registerSchema = yup
  .object({
    name: yup.string().required("Vui lòng nhập tên của bạn"),
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
    confirmPassword: yup
      .string()
      .required('Vui lòng xác nhận mật khẩu')
      .oneOf([yup.ref('password')], 'Mật khẩu không trùng khớp'),
  })
  .required();

const RegisterForm = ({ onRegister } : RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    onRegister(data)
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px]">
        <form className="flex flex-col max-w-md gap-4" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl text-center">Đăng ký</h3>
          <div>
            <div className="block mb-2">
              <Label htmlFor="name1" value="Tên của bạn là"/>
            </div>
            <TextInput
              type="text"
              autoComplete="off"
              placeholder="Tên của bạn"
              {...register('name')}
              className={errors.name ? ':ring-red-500' : 'ring-cyan-500'}
            />
            <p className="text-red-500">{errors.name?.message}</p>
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="email1" value="Email">
                Email
              </Label>
            </div>
            <TextInput
              type="text"
              autoComplete="off"
              placeholder="Email"
              {...register('email')}
              color={errors.email ? 'failure' : ''}
            />
            <p className="text-red-500">{errors.email?.message}</p>
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="password" value="Mật khẩu" />
            </div>
            <TextInput
              type="password"
              placeholder="Password"
              {...register('password')}
              color={errors.password ? 'failure' : ''}
            />
            <p className="text-red-500">{errors.password?.message}</p>
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="confirmPassword" value="Nhập lại mật khẩu" />
            </div>
            <TextInput
              type="password"
              placeholder="Nhập lại mật khẩu"
              {...register('confirmPassword')}
              color={errors.confirmPassword ? 'failure' : ''}
            />
            <p className="text-red-500">{errors.confirmPassword?.message}</p>
          </div>
          <Button type="submit" className="bg-blue-500">
            Đăng ký
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RegisterForm;
