import { Outlet } from 'react-router-dom';
import AuthHeader from '../header/AuthHeader';

const AuthOutlet = () => {
  return (
    <main>
      <AuthHeader />
      <div className="flex items-center justify-center min-h-screen">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthOutlet;
