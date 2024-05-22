import { Dropdown } from 'flowbite-react';
import { User } from '../../interfaces/user';
import { DropdownLink } from '../../interfaces/route';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

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
    path: `/changepassword`,
  },
  {
    id: 3,
    label: 'Đăng xuất',
  },
];

const UserDropdown = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const removeToken = () => {
    Cookies.remove('token');
    navigate('/login');
  };
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('/accounts/me', config).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <Dropdown label={data && data['user']['name']} inline>
        {userDropdownLinks.map((link: DropdownLink) => {
          return link.path ? (
            <Link to={link.path}>
              <Dropdown.Item key={link.id}>{link.label}</Dropdown.Item>
            </Link>
          ) : (
            <Dropdown.Item key={link.id} onClick={removeToken}>
              {link.label}
            </Dropdown.Item>
          );
        })}
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
