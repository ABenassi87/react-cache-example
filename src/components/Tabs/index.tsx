import React from 'react';

export interface Tab {
  label: string;
  value: string;
}

interface Props {
  tabItems: Tab[];
  onTabClick: (tab: string) => void;
  activeTab: string;
}

const Tabs: React.FunctionComponent<Props> = (props) => {
  const { tabItems, activeTab, onTabClick } = props;
  return (
    <div className='bg-white'>
      <nav className='flex flex-col sm:flex-row'>
        {tabItems.map((tabItem, index) => (
          <button
            key={index}
            className={`no-underline text-blue-500 md:text-blue-500 flex items-center py-4 px-6 block hover:text-blue-900 focus:outline-none${
              activeTab === tabItem.value ? ' text-blue-900 border-b-2 font-medium border-blue-900' : ''
            }`}
            onClick={() => onTabClick(tabItem.value)}>
            {tabItem.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
