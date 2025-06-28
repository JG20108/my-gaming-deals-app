import React, { useEffect, useRef } from 'react';
import DealCard from '../molecules/DealCard';
import { Deal } from '../../types';
import { scrollDealsGridToTop } from '../../utils/scrollUtils';

interface DealsGridProps {
  deals: Deal[];
}

const DealsGrid: React.FC<DealsGridProps> = ({ deals }) => {
  const previousDealsRef = useRef<Deal[]>([]);
  const previousFirstDealId = useRef<string>('');

  useEffect(() => {
    console.log('🎮 [DealsGrid] useEffect triggered - deals changed');
    console.log('🎮 [DealsGrid] Number of deals:', deals.length);

    const currentFirstDealId = deals.length > 0 ? deals[0].dealID : 'No deals';
    console.log('🎮 [DealsGrid] Current first deal ID:', currentFirstDealId);
    console.log(
      '🎮 [DealsGrid] Previous first deal ID:',
      previousFirstDealId.current
    );

    // Only scroll if the content actually changed (different first deal or length changed significantly)
    const contentChanged =
      currentFirstDealId !== previousFirstDealId.current ||
      Math.abs(deals.length - previousDealsRef.current.length) > 0;

    if (contentChanged && deals.length > 0) {
      console.log(
        '🎮 [DealsGrid] Content actually changed - calling scrollDealsGridToTop...'
      );
      scrollDealsGridToTop();
      console.log('🎮 [DealsGrid] scrollDealsGridToTop called');
    } else {
      console.log(
        '🎮 [DealsGrid] Content unchanged or no deals - skipping scroll'
      );
    }

    // Update refs for next comparison
    previousDealsRef.current = deals;
    previousFirstDealId.current = currentFirstDealId;
  }, [deals]);

  console.log('🎮 [DealsGrid] Component rendering with', deals.length, 'deals');

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
