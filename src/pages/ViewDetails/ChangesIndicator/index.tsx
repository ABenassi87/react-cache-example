import React from 'react';
export interface Indicator {
  label: string;
  value: number;
}

interface Props {
  indicators: Indicator[];
}

const ChangesIndicator: React.FunctionComponent<Props> = (props) => {
  const { indicators } = props;
  return (
    <section className='text-gray-700 body-font'>
      <div className='container px-5 mx-auto'>
        <div className='flex flex-wrap -m-4 text-center'>
          {indicators.map((indicator, index) => {
            return (
              <div className='p-4 sm:w-1/6 w-1/2' key={index}>
                <h2 className='title-font font-medium sm:text-4xl text-3xl text-gray-900'>
                  {indicator.value ? `${new Intl.NumberFormat('en', { style: 'decimal' }).format(indicator.value)}%` : '-'}
                </h2>
                <p className='leading-relaxed'>{indicator.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ChangesIndicator;
