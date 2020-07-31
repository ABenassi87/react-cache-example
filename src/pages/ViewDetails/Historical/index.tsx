import React from 'react';
import moment from 'moment';
import Chart from '../Chart';

interface Props {
  data: number[][];
}

const Historical: React.FunctionComponent<Props> = (props) => {
  const { data } = props;
  const chartData: { name: string; price: number }[] = data.reduce((dataTemp: any[], d) => {
    const [timestamp, price] = d;
    dataTemp.push({ name: moment(timestamp).format('MM/DD/yyyy'), price });
    return dataTemp;
  }, []);
  return <Chart data={chartData} />;
};

export default Historical;
