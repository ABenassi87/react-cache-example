import React from 'react';
import { MenuItem } from '../../model';
import NavBarItem from "./Navbar-item/NavBarItem";

interface NavBarProps {
  menuItems: MenuItem[];
}

const NavBar: React.FunctionComponent<NavBarProps> = (props: NavBarProps) => {
  const { menuItems } = props;
  return (
    <div className='hidden bg-white md:block md:border-b'>
      <div className='container mx-auto px-4'>
        <div className='md:flex'>{!!menuItems && menuItems.map((item, index) => <NavBarItem key={index} item={item} />)}</div>
      </div>
    </div>
  );
};

export default NavBar;
