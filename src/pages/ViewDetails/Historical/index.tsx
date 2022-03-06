import React, { useMemo } from "react";
import dayjs from 'dayjs';
import Chart from '../Chart';

interface Props {
  data: number[][];
}

const Historical: React.FunctionComponent<Props> = (props) => {
  const { data } = props;
  const chartData: { name: string; price: number }[] = useMemo(() => {
    return data.reduce((dataTemp: any[], d) => {
      const [timestamp, price] = d;
      dataTemp.push({ name: dayjs(timestamp).format('MM/DD/yyyy'), price });
      return dataTemp;
    }, []);
  }, [data])
  return (
    <section>
      <Chart data={chartData} />
    </section>
  );
};

export default Historical;
