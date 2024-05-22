import { Dropdown } from 'flowbite-react';
import { User } from '../../interfaces/user';
import { DropdownLink } from '../../interfaces/route';
import { Link } from 'react-router-dom';

interface UserDropdown {
  user: User;
}

const userDropdownLinks = [
  {
    id: 1,
    label: 'Xem thông tin',
    path: `/profile`,
  },
  {
    id: 2,
    label: 'Đổi mật khẩu',
    path: `/changepassword`
  },
  {
    id: 3,
    label: 'Đăng xuất',
  },
];

const UserDropdown = () => {
  return (
    <div>
      <Dropdown label="Lê Minh Khang" inline>
        {userDropdownLinks.map((link: DropdownLink) => {
          return link.path ? (
            <Link to={link.path}>
              <Dropdown.Item key={link.id}>{link.label}</Dropdown.Item>
            </Link>
          ) : (
            <Dropdown.Item key={link.id}>{link.label}</Dropdown.Item>
          );
        })}
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
