import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../configs/routes';
import logo from './../../assets/Logo.png';

const authHeaderLinks = [
  {
    id: 1,
    label: 'Đăng ký',
    path: ROUTE.AUTH.REGISTER,
  },
  {
    id: 2,
    label: 'Đăng nhập',
    path: ROUTE.AUTH.LOGIN,
  },
];

const AuthHeader = () => {
  return (
    <header className="fixed top-0 left-0 py-4 border-b shadow-sm w-full">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="logo" />
            <span className="text-lg font-semibold">Todo task</span>
          </div>
          <div className="flex items-center gap-5">
            {authHeaderLinks.map((link: { id: number; path: string; label: string }) => {
              return (
                <NavLink
                  to={link.path}
                  key={link.id}
                  className={({ isActive }) =>
                    isActive ? 'bg-blue-500 text-white p-2 px-3 rounded-md font-semibold' : ''
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
