import { Sidebar } from 'flowbite-react';
import { AppRoutes } from '../configs/routes';
import { AppRoute } from '../interfaces/route';
import { NavLink } from 'react-router-dom';

const AppSideBar = () => {
  return (
    <>
      <Sidebar>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {AppRoutes.map((sidebar: AppRoute) => {
              return (
                <Sidebar.Item icon={sidebar.icons}>
                  <NavLink to={sidebar.path} className={({ isActive }) => (isActive ? 'bg-blue-500' : '')}>
                    {sidebar.title}
                  </NavLink>
                </Sidebar.Item>
              );
            })}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default AppSideBar;
