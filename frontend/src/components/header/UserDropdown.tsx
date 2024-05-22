import { Dropdown } from 'flowbite-react';
import { User } from '../../interfaces/user';
import { DropdownLink } from '../../interfaces/route';
import { Link } from 'react-router-dom';
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
    path: `/user/:id`,
  },
  {
    id: 2,
    label: 'Đăng xuất',
  },
];

const UserDropdown = () => {
    const token = Cookies.get('token');
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
            <Dropdown.Item key={link.id}>{link.label}</Dropdown.Item>
          );
        })}
      </Dropdown>
    </div>
  );
};

export default UserDropdown;
