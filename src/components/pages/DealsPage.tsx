import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../../services/DealService';
import DealCard from '../molecules/DealCard';
import SearchBar from '../molecules/SearchBar'; // New import for SearchBar
import RangeFilterDual from '../molecules/RangeFilterDual'; // Corrected import statement

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
  const [metacriticScoreFilter, setMetacriticScoreFilter] = useState<[number, number]>([0, 100]);
  const [salePriceRange, setSalePriceRange] = useState<[number, number]>([0, 10]);
  const [savingsFilter, setSavingsFilter] = useState<[number, number]>([0, 100]);

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

  const filteredDeals = deals
    .filter(deal => Number(deal.metacriticScore) >= metacriticScoreFilter[0] && Number(deal.metacriticScore) <= metacriticScoreFilter[1])
    .filter(deal => Number(deal.salePrice) >= salePriceRange[0] && Number(deal.salePrice) <= salePriceRange[1])
    .filter(deal => Number(deal.savings) >= savingsFilter[0] && Number(deal.savings) <= savingsFilter[1]);

  return (
    <div>
      <div className="deals-grid">
        {filteredDeals.length > 0 ? (
          filteredDeals.map((deal) => (
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
          ))
        ) : (
          <div className="empty-state">No deals match your filters.</div>
        )}
      </div>
      <div className="filters-sidebar">
        <SearchBar onSearch={(query) => console.log(query)} />
        <RangeFilterDual
          label="Metacritic Score"
          min={0} 
          max={100}
          step={10}
          value={metacriticScoreFilter}
          onChange={setMetacriticScoreFilter}
        />
        <RangeFilterDual
          label="Sale Price"
          min={0}
          max={100} 
          step={10}
          value={salePriceRange}
          onChange={setSalePriceRange}
        />
        <RangeFilterDual
          label="Savings"
          min={0}
          max={100}
          step={10}
          value={savingsFilter}
          onChange={setSavingsFilter}
        />
        {/* Additional filters can be placed here */}
      </div>
    </div>
  );
};

export default DealsPage;
