import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginFormValues } from '../../interfaces/form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type LoginFormProps = {
    onLogin: () => void
}

const loginSchema = yup
  .object({
    email: yup.string().required('Vui lòng nhập email').email('Vui lòng nhập đúng định dạng email'),
    password: yup.string().required('Vui lòng nhập mật khẩu')
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
  };

    return (
        <div>
            <Card className='w-96'>
                <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <p className='mx-auto font-bold font-sans text-xl'>Đăng nhập</p>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Email" />
                        </div>
                        <TextInput id="email1" type="email" placeholder="Email của bạn" {...register("email")} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Password" />
                        </div>
                        <TextInput id="password1" type="password" placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;' {...register("password")} />
                    </div>
                    
                    <Button className='bg-blue-700 mt-6' type='submit'>Đăng nhập</Button>
                </form>
            </Card>
        </div>
    )
}

export default LoginForm
