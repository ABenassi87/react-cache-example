import React from 'react';
import { CoinMarket } from '../../../model';

interface ShowListingsProps {
  markets: CoinMarket[];
}

const ShowListings: React.FunctionComponent<ShowListingsProps> = (props) => {
  return (
    <div>
      <h1>This is the ShowListings component.</h1>
      {props.markets
        ? props.markets.map((coin, index) => (
            <div key={index}>
              <h1>{coin.name}</h1>
              <div>id: {coin.id}</div>
              <div>symbol: {coin.symbol}</div>
              <div>-----------</div>
            </div>
          ))
        : 'no data...'}
    </div>
  );
};

export default ShowListings;
