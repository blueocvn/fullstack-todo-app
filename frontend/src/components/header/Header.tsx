import { Avatar, Navbar } from 'flowbite-react';
import { NavLink } from 'react-router-dom';
import logo from './../../assets/Logo.png';
import axios from 'axios'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react';

const Header = () => {
    const token = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const [data, setData] = useState();

    async function getUserData(){
        await axios.get('/accounts/me',config)
        .then((res) => {
            setData(res.data);
        })        
    }
    
    useEffect(() => {
        getUserData();
    }, [])

    return (
        <header>
            <Navbar fluid rounded className="border-b shadow-sm">
                <Navbar.Brand as={NavLink}>
                    <img src={logo} className="h-6 mr-3 sm:h-9" alt="Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Todo Task</span>
                </Navbar.Brand>
                <div className="flex items-center gap-4">
                    <Avatar rounded />
                    <p>{data && data['user']['name']}</p>
                </div>
            </Navbar>
        </header>
    );
};

export default Header;
