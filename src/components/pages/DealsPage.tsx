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
  metacriticScore: string; // New
  metacriticLink: string; // New
  steamRatingText: string; // New
  steamAppID: string; // New
}

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    fetchDeals()
      .then((deals) => {
        const sortedDeals = deals.sort((a, b) => Number(b.metacriticScore) - Number(a.metacriticScore));
        console.log(sortedDeals); // Log the fetched and sorted deals data
        setDeals(sortedDeals);
      })
      .catch((error) => {
        console.error('Failed to fetch deals:', error);
      });
  }, []);

  return (
    <div>
      <div className="deals-grid">
        {deals.map((deal) => (
          <DealCard
            key={deal.dealID}
            title={deal.title}
            salePrice={deal.salePrice}
            normalPrice={deal.normalPrice}
            savings={deal.savings}
            thumb={deal.thumb}
            metacriticScore={deal.metacriticScore} // New
            metacriticLink={deal.metacriticLink} // New
            steamRatingText={deal.steamRatingText} // New
            steamAppID={deal.steamAppID} // New
          />
        ))}
      </div>
      <div className="filters-sidebar">
        {/* Place your filters and search bar here */}
      </div>
    </div>
  );
};

export default DealsPage;
