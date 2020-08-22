import React from 'react';
import { CoinMarket } from '../../../model';
import { Link } from '@reach/router';

interface MarketTableProps {
  coins: CoinMarket[];
  responseTime: number;
}

const MarketTable: React.FunctionComponent<MarketTableProps> = (props: MarketTableProps) => {
  let { coins, responseTime } = props;
  return (
    <React.Fragment>
      <table className='table-auto mx-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2'>Coin</th>
            <th className='px-4 py-2'>Symbol</th>
            <th className='px-4 py-2'>Price</th>
            <th className='px-4 py-2'>1h</th>
            <th className='px-4 py-2'>24h</th>
            <th className='px-4 py-2'>7d</th>
            <th className='px-4 py-2'>30d</th>
            <th className='px-4 py-2'>24h Volume</th>
            <th className='px-4 py-2'>Quantity</th>
            <th className='px-4 py-2'>Total Quantity</th>
            <th className='px-4 py-2'>Market Capital</th>
          </tr>
        </thead>
        <tbody>
          {coins &&
            coins.map((coin, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`crypto/${coin.id}`}>
                      <img className='float-left' alt={coin.name} src={coin.image} width={24} /> {coin.name}
                    </Link>
                  </td>
                  <td className='px-4 py-2'>{coin.symbol}</td>
                  <td className='px-4 py-2'>
                    {new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(coin.current_price)}
                  </td>
                  <td className='px-4 py-2'>
                    {coin.price_change_percentage_1h_in_currency
                      ? `${new Intl.NumberFormat('en', { style: 'decimal' }).format(coin.price_change_percentage_1h_in_currency)}%`
                      : '-'}
                  </td>
                  <td className='px-4 py-2'>
                    {coin.price_change_percentage_24h_in_currency
                      ? `${new Intl.NumberFormat('en', { style: 'decimal' }).format(coin.price_change_percentage_24h_in_currency)}%`
                      : '-'}
                  </td>
                  <td className='px-4 py-2'>
                    {coin.price_change_percentage_7d_in_currency
                      ? `${new Intl.NumberFormat('en', { style: 'decimal' }).format(coin.price_change_percentage_7d_in_currency)}%`
                      : '-'}
                  </td>
                  <td className='px-4 py-2'>
                    {coin.price_change_percentage_30d_in_currency
                      ? `${new Intl.NumberFormat('en', { style: 'decimal' }).format(coin.price_change_percentage_30d_in_currency)}%`
                      : '-'}
                  </td>
                  <td className='px-4 py-2'>
                    {new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(coin.total_volume)}
                  </td>
                  <td className='px-4 py-2'>{new Intl.NumberFormat().format(coin.circulating_supply)}</td>
                  <td className='px-4 py-2'>{coin.total_supply ? new Intl.NumberFormat().format(coin.total_supply) : '-'}</td>
                  <td className='px-4 py-2'>
                    {new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(coin.market_cap)}
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={11}>Response Time {responseTime} ms.</td>
          </tr>
        </tfoot>
      </table>
    </React.Fragment>
  );
};

export default MarketTable;
