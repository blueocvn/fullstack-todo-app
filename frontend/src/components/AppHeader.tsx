import { Avatar, MegaMenu } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useCallback } from 'react';
import Logo from '../assets/react.svg';
import { getTokens, removeItemFromStorage } from '../utils/storage';

export const AppHeader = () => {
  const { username, email } = getTokens();
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateResetPassword = useCallback(() => {
    navigate(`/reset-password`);
  }, [navigate]);

  const handleLogout = useCallback(() => {
    removeItemFromStorage('tokens');
    window.location.href = '/';
  }, []);

  return (
    <div className="flex justify-between items-center px-44 h-14 shadow">
      <img src={Logo} />
      <div className="flex justify-between w-60">
        <Link to="/" className={location.pathname == '/' ? 'text-blue-600' : ''}>
          Home
        </Link>
        <Link to="/teams" className={location.pathname.includes('/teams') ? 'text-blue-600' : ''}>
          Team
        </Link>
      </div>
      <div className="flex items-center justify-between gap-3 relative">
        <MegaMenu.Dropdown toggle={<Avatar rounded className="ml-3 hover:cursor-pointer" />}>
          <div className="w-52 shadow-md z-50">
            <div className="border-b-2 border-b-border w-full flex flex-col items-center py-1">
              <Avatar rounded />
              <p>{username}</p>
              <p>{email}</p>
            </div>
            <div className="hover:bg-gray-200 cursor-pointer py-1 px-2" onClick={handleNavigateResetPassword}>
              <p>Reset Password</p>
            </div>
            <div className="hover:bg-gray-200 cursor-pointer py-1 px-2" onClick={handleLogout}>
              <p>Log out</p>
            </div>
          </div>
        </MegaMenu.Dropdown>
      </div>
    </div>
  );
};
