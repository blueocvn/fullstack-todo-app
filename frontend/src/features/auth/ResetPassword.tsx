/* eslint-disable @typescript-eslint/no-explicit-any */
import { enqueueSnackbar } from 'notistack';

import { useResetPasswordMutation } from '../../app/services/api';
import { ResetPasswordForm } from '../../components/form/ResetPasswordForm';
import { ResetPasswordModel } from '../../types/Auth';

export const ResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  async function handleResetPassword(data: ResetPasswordModel) {
    try {
      await resetPassword(data).unwrap();

      enqueueSnackbar('Reset pasword success', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(`${error?.data}`, {
        variant: 'warning',
      });
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="mb-12 text-2xl">Đổi mật khẩu</h1>
      <ResetPasswordForm onResetPasswordFrame={handleResetPassword} isLoading={isLoading} />
    </div>
  );
};
