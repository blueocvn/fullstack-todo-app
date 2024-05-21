import Tippy from '@tippyjs/react/headless';
import { Avatar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useCallback } from 'react';
import Logo from '../assets/react.svg';
import { getTokens, removeItemFromStorage } from '../utils/storage';

const menuList = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/teams',
    name: 'Team',
  },
];

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
        {menuList.map((menuItem) => (
          <Link
            to={menuItem.path}
            key={menuItem.name}
            className={location.pathname === menuItem.path ? 'text-blue-600' : ''}
          >
            <p>{menuItem.name}</p>
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        <p>{username}</p>
        <Tippy
          appendTo={document.body}
          trigger={'click'}
          placement={'bottom-end'}
          interactive={true}
          render={(attrs: any) => (
            <div tabIndex={-1} {...attrs} className="w-52 h-36 shadow-md ">
              <div className="border-b-2 border-b-border w-full flex flex-col items-center py-1">
                <Avatar rounded />
                <p>{email}</p>
              </div>
              <div className="hover:bg-gray-200 cursor-pointer py-1 px-2" onClick={handleNavigateResetPassword}>
                <p>Reset Password</p>
              </div>
              <div className="hover:bg-gray-200 cursor-pointer py-1 px-2" onClick={handleLogout}>
                <p>Log out</p>
              </div>
            </div>
          )}
        >
          <div>
            <Avatar rounded className="ml-3 hover:cursor-pointer" />
          </div>
        </Tippy>
      </div>
    </div>
  );
};
