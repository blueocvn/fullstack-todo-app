import { Outlet } from 'react-router-dom';
import AppSideBar from '../AppSideBar';
import Header from '../header/Header';

const PrivateOutlet = () => {
  return (
    <main>
      <Header />
      <div className="flex">
        <AppSideBar />
        <Outlet />
      </div>
    </main>
  );
};

export default PrivateOutlet;
