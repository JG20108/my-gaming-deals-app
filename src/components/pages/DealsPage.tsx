import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../../services/DealService';
import SearchBar from '../molecules/SearchBar';
import RangeFilterDual from '../molecules/RangeFilterDual';
import DealsGrid from '../organisms/DealsGrid';

interface Deal {
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  thumb: string;
  metacriticScore: string;
  metacriticLink: string;
  steamRatingText: string;
  steamAppID: string;
}

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [metacriticScoreFilter, setMetacriticScoreFilter] = useState<[number, number]>([0, 100]);
  const [salePriceRange, setSalePriceRange] = useState<[number, number]>([0, 10]);
  const [savingsFilter, setSavingsFilter] = useState<[number, number]>([0, 100]);

  useEffect(() => {
    fetchDeals()
      .then((deals: Deal[]) => {
        const sortedDeals = deals.sort((a: Deal, b: Deal) => Number(b.metacriticScore) - Number(a.metacriticScore));
        console.log(sortedDeals); 
        setDeals(sortedDeals);
      })
      .catch((error: Error) => {
        console.error('Failed to fetch deals:', error);
      });
  }, []);

  const filteredDeals = deals
    .filter(deal => Number(deal.metacriticScore) >= metacriticScoreFilter[0] && Number(deal.metacriticScore) <= metacriticScoreFilter[1])
    .filter(deal => Number(deal.salePrice) >= salePriceRange[0] && Number(deal.salePrice) <= salePriceRange[1])
    .filter(deal => Number(deal.savings) >= savingsFilter[0] && Number(deal.savings) <= savingsFilter[1]);

  return (
    <div>
      <DealsGrid deals={filteredDeals} />
      <div className="filters-sidebar">
        <SearchBar onSearch={(query) => console.log(query)} />
        <RangeFilterDual
          label="Metacritic Score"
          min={0} 
          max={100}
          step={10}
          value={metacriticScoreFilter}
          onChange={(value: number[]) => setMetacriticScoreFilter([value[0], value[1]])}
        />
        <RangeFilterDual
          label="Sale Price"
          min={0}
          max={100} 
          step={10}
          value={salePriceRange}
          onChange={(value: number[]) => setSalePriceRange([value[0], value[1]])}
        />
        <RangeFilterDual
          label="Savings"
          min={0}
          max={100}
          step={10}
          value={savingsFilter}
          onChange={(value: number[]) => setSavingsFilter([value[0], value[1]])}
        />
        {/* Additional filters can be placed here */}
      </div>
    </div>
  );
};

export default DealsPage;
