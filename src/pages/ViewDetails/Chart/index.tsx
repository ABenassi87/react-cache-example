import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

interface Props {
  data: { name: string; price: number }[];
}

const Chart: React.FunctionComponent<Props> = (props) => {
  const { data } = props;
  return (
    <React.Fragment>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='price' stroke='#000000' fill='#222222' />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

export default Chart;
