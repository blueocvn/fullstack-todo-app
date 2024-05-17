import { Button, Card, Label, TextInput } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePasswordVisiblity = () => {
    setShowPassword(showPassword ? false : true);
  };
  const handleNavigateLogin = useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  return (
    <Card className="min-w-80">
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Your username" />
          </div>
          <TextInput id="username" type="input" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <div className="relative mb-3">
            <TextInput id="password1" type={showPassword ? 'text' : 'password'} required />
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
        <Button type="submit">Register</Button>
        <div className="text-xs flex justify-center">
          <p className="mr-1">Do you already have an account?</p>
          <p
            className="underline decoration-green-900 text-green-900 hover:cursor-pointer"
            onClick={handleNavigateLogin}
          >
            Login
          </p>
        </div>
      </form>
    </Card>
  );
};
