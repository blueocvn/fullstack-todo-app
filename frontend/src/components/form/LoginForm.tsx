import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { LoginModel } from '../../types/Auth';

const newRegisterSchema = Yup.object().shape({
  email: Yup.string().email().required('please enter email').max(30),
  password: Yup.string().required('please enter password'),
});

interface Props {
  onLoginFrame?: (data: LoginModel) => void;
}

export const LoginForm = (props: Props) => {
  const { onLoginFrame = () => {} } = props;
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };

  const handleNavigateRegister = useCallback(() => {
    navigate(`/register`);
  }, [navigate]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<LoginModel>({
    resolver: yupResolver(newRegisterSchema),
  });

  const handleChangeData = useCallback(
    (data: LoginModel) => {
      onLoginFrame({
        ...data,
      });
    },
    [reset],
  );

  return (
    <Card className="min-w-80">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleChangeData)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <div>
                <TextInput
                  value={value || ''}
                  onChange={(e) => onChange(e.target.value)}
                  color={errors?.email ? 'failure' : ''}
                  helperText={errors.email ? errors?.email?.message : <></>}
                />
              </div>
            )}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <div className="relative mb-3">
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <div>
                  <TextInput
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    color={errors?.password ? 'failure' : ''}
                    type={showPassword ? 'text' : 'password'}
                    helperText={errors.password ? errors?.password?.message : <></>}
                  />
                </div>
              )}
            />
            {showPassword ? (
              <FaRegEyeSlash
                onClick={handleTogglePasswordVisiblity}
                className="absolute right-3 top-3 hover:cursor-pointer"
              />
            ) : (
              <FaRegEye
                onClick={handleTogglePasswordVisiblity}
                className="absolute right-3 top-3 hover:cursor-pointer"
              />
            )}
          </div>
        </div>
        <Button
          type="submit"
          onClick={handleSubmit(handleChangeData)}
          disabled={errors?.email || errors?.password ? true : false}
        >
          Login
        </Button>
        <div className="text-xs flex justify-center">
          <p className="mr-1">Do not have an account?</p>
          <p
            className="underline decoration-green-900 text-green-900 hover:cursor-pointer"
            onClick={handleNavigateRegister}
          >
            Register
          </p>
        </div>
      </form>
    </Card>
  );
};
