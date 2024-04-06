import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../../services/DealService';
import DealCard from '../molecules/DealCard';

interface Deal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  thumb: string;
}

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    fetchDeals()
      .then((deals) => {
        console.log(deals); // Log the fetched deals data
        setDeals(deals);
      })
      .catch((error) => {
        console.error('Failed to fetch deals:', error);
      });
  }, []);

  return (
    <div className="deals-grid">
      {deals.map((deal) => (
        <DealCard
          key={deal.dealID}
          title={deal.title}
          salePrice={deal.salePrice}
          normalPrice={deal.normalPrice}
          savings={deal.savings}
          thumb={deal.thumb}
        />
      ))}
    </div>
  );
};

export default DealsPage;