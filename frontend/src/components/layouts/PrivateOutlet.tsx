import { Outlet } from 'react-router-dom';
import AppSideBar from '../AppSideBar';
import Header from '../header/Header';

const PrivateOutlet = () => {
  return (
    <main>
      <Header />
      <div className="flex gap-5">
        <AppSideBar />
        <div className="flex-1 pt-5">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default PrivateOutlet;
