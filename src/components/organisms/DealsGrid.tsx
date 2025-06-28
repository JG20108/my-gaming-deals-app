import React from 'react';
import DealCard from '../molecules/DealCard';
import { Deal } from '../../types';

interface DealsGridProps {
  deals: Deal[];
}

const DealsGrid: React.FC<DealsGridProps> = ({ deals }) => {
  return (
    <div
      className={`deals-grid ${deals.length > 0 ? 'has-deals' : 'no-deals'}`}
    >
      {deals.length > 0 ? (
        deals.map((deal) => (
          <DealCard
            key={deal.dealID}
            title={deal.title}
            salePrice={deal.salePrice}
            normalPrice={deal.normalPrice}
            savings={deal.savings}
            thumb={deal.thumb}
            metacriticScore={deal.metacriticScore}
            metacriticLink={deal.metacriticLink}
            steamRatingText={deal.steamRatingText}
            steamAppID={deal.steamAppID}
            dealRating={deal.dealRating}
          />
        ))
      ) : (
        <div className="empty-state">No deals match your filters.</div>
      )}
    </div>
  );
};

export default DealsGrid;
