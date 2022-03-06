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
    <section className='text-gray-700 body-font my-2'>
      <div className='container px-5 mx-auto'>
        <div className='flex flex-wrap -m-4 text-center'>
          {indicators.map((indicator, index) => {
            return (
              <div className='p-4 sm:w-1/6 w-1/2' key={index}>
                <h4
                  className={`title-font text-2xl${
                    indicator.value > 0 ? ' text-green-600' : indicator.value < 0 ? ' text-red-600' : ' text-gray-900'
                  }`}>
                  {indicator.value
                    ? `${new Intl.NumberFormat('en', { style: 'decimal', maximumFractionDigits: 2 }).format(indicator.value)}%`
                    : '-'}
                </h4>
                <p className='leading-relaxed font-medium text-gray-900'>{indicator.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ChangesIndicator, (prevProps, nextProps) => {
  const { indicators: prevIndicators } = prevProps;
  const { indicators: nextIndicators } = nextProps;
  if (prevIndicators.length !== nextIndicators.length) {
    return false;
  }
  for (let i = 0; i < prevIndicators.length; i++) {
    if (prevIndicators[i].label !== nextIndicators[i].label || prevIndicators[i].value !== nextIndicators[i].value) {
      return false;
    }
  }

  return true;
});
