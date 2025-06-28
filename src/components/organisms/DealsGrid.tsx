import React, { useEffect, useRef } from 'react';
import DealCard from '../molecules/DealCard';
import { scrollDealsGridToTop } from '../../utils/scrollUtils';

interface Deal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  thumb: string;
  metacriticScore: string;
  metacriticLink: string;
  steamRatingText: string | null;
  steamAppID: string;
  dealRating: string;
}

interface DealsGridProps {
  deals: Deal[];
}

const DealsGrid: React.FC<DealsGridProps> = ({ deals }) => {
  const previousFirstDealId = useRef<string>('');

  useEffect(() => {
    const currentFirstDealId = deals.length > 0 ? deals[0].dealID : 'No deals';
    const previousId = previousFirstDealId.current;

    // Only scroll if the content actually changed (different first deal)
    if (deals.length > 0 && currentFirstDealId !== previousId) {
      scrollDealsGridToTop();
      previousFirstDealId.current = currentFirstDealId;
    } else if (deals.length === 0) {
      previousFirstDealId.current = 'No deals';
    }
  }, [deals]);

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
          metacriticScore={deal.metacriticScore}
          metacriticLink={deal.metacriticLink}
          steamRatingText={deal.steamRatingText}
          steamAppID={deal.steamAppID}
          dealRating={deal.dealRating}
        />
      ))}
    </div>
  );
};

export default DealsGrid;
