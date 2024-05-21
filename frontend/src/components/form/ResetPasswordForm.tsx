import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { ResetPasswordModel } from '../../types/Auth';

const newResetPasswordSchema = Yup.object().shape({
  old_password: Yup.string().required('please enter old password'),
  new_password: Yup.string().required('please enter new password'),
});

interface Props {
  onResetPasswordFrame?: (data: ResetPasswordModel) => void;
  isLoading: boolean;
}

export const ResetPasswordForm = (props: Props) => {
  const { onResetPasswordFrame = () => {}, isLoading } = props;
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();

  const handleToggleOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleToggleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleNavigateHome = useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordModel>({
    resolver: yupResolver(newResetPasswordSchema),
  });

  const handleChangeData = useCallback(
    (data: ResetPasswordModel) => {
      onResetPasswordFrame({
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
            <Label htmlFor="password1" value="Your old password" />
          </div>
          <div className="relative mb-3">
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange, value } }) => (
                <div>
                  <TextInput
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    color={errors?.old_password ? 'failure' : ''}
                    type={showOldPassword ? 'text' : 'password'}
                    helperText={errors.old_password ? errors?.old_password?.message : <></>}
                  />
                </div>
              )}
            />
            {showOldPassword ? (
              <FaRegEyeSlash
                onClick={handleToggleOldPassword}
                className="absolute right-3 top-3 hover:cursor-pointer"
              />
            ) : (
              <FaRegEye onClick={handleToggleOldPassword} className="absolute right-3 top-3 hover:cursor-pointer" />
            )}
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Your new password" />
          </div>
          <div className="relative mb-3">
            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange, value } }) => (
                <div>
                  <TextInput
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    color={errors?.new_password ? 'failure' : ''}
                    type={showNewPassword ? 'text' : 'password'}
                    helperText={errors.new_password ? errors?.new_password?.message : <></>}
                  />
                </div>
              )}
            />
            {showNewPassword ? (
              <FaRegEyeSlash
                onClick={handleToggleNewPassword}
                className="absolute right-3 top-3 hover:cursor-pointer"
              />
            ) : (
              <FaRegEye onClick={handleToggleNewPassword} className="absolute right-3 top-3 hover:cursor-pointer" />
            )}
          </div>
        </div>
        <Button
          type="submit"
          onClick={handleSubmit(handleChangeData)}
          disabled={errors?.old_password || errors?.new_password ? true : false}
          isProcessing={isLoading}
        >
          Confirm
        </Button>
        <div className="text-xs flex justify-center">
          <p
            className="underline decoration-green-900 text-green-900 hover:cursor-pointer"
            onClick={handleNavigateHome}
          >
            Go back to Home
          </p>
        </div>
      </form>
    </Card>
  );
};
