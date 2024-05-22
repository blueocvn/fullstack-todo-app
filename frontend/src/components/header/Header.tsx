import { Avatar, Navbar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/Logo.png';
import UserDropdown from './UserDropdown';

const Header = () => {
  return (
    <header>
      <Navbar fluid rounded className="border-b shadow-sm">
      <Navbar.Brand as={NavLink} to="/task">
        <img src={logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Todo Task</span>
      </Navbar.Brand>
        <div className="flex items-center gap-4">
          <Avatar rounded />
          <UserDropdown />
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
