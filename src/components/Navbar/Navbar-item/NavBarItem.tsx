import React from 'react';
import { MenuItem } from '../../../model';

interface NavBarItemProps {
  item: MenuItem;
}

const NavBarItem: React.FunctionComponent<NavBarItemProps> = (props: NavBarItemProps) => {
  const { item } = props;
  return (
    <div className='flex -mb-px mr-8'>
      <a href={item.link} className='no-underline text-blue-900 md:text-blue-900 flex items-center py-4 border-b border-blue-900'>
        {item.label}
      </a>
    </div>
  );
};

export default NavBarItem;
