import React, { useState, useEffect } from 'react';
import { fetchDeals } from '../../services/DealService';
import DealsGrid from '../organisms/DealsGrid';
import FiltersSidebar from '../organisms/FiltersSidebar';

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
  dealRating: string;
}

const DealsPage: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [metacriticScoreFilter, setMetacriticScoreFilter] = useState<
    [number, number]
  >([0, 100]);
  const [salePriceRange, setSalePriceRange] = useState<[number, number]>([
    0, 10,
  ]);
  const [savingsFilter, setSavingsFilter] = useState<[number, number]>([
    0, 100,
  ]);
  const [dealRatingFilter, setDealRatingFilter] = useState<[number, number]>([
    0, 10,
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchDeals(currentPage)
      .then(({ deals, totalPageCount }) => {
        const sortedDeals = deals.sort(
          (a: Deal, b: Deal) =>
            Number(b.metacriticScore) - Number(a.metacriticScore)
        );
        setDeals(sortedDeals);
        setTotalPages(totalPageCount ? parseInt(totalPageCount, 10) : 0);
      })
      .catch((error: Error) => {
        console.error('Failed to fetch deals:', error);
      });
  }, [currentPage]);

  const filteredDeals = deals
    .filter(
      (deal) =>
        Number(deal.metacriticScore) >= metacriticScoreFilter[0] &&
        Number(deal.metacriticScore) <= metacriticScoreFilter[1]
    )
    .filter(
      (deal) =>
        Number(deal.salePrice) >= salePriceRange[0] &&
        Number(deal.salePrice) <= salePriceRange[1]
    )
    .filter(
      (deal) =>
        Number(deal.savings) >= savingsFilter[0] &&
        Number(deal.savings) <= savingsFilter[1]
    )
    .filter(
      (deal) =>
        Number(deal.dealRating) >= dealRatingFilter[0] &&
        Number(deal.dealRating) <= dealRatingFilter[1]
    );

  return (
    <div>
      <DealsGrid deals={filteredDeals} />
      <FiltersSidebar
        metacriticScoreFilter={metacriticScoreFilter}
        setMetacriticScoreFilter={setMetacriticScoreFilter}
        salePriceRange={salePriceRange}
        setSalePriceRange={setSalePriceRange}
        savingsFilter={savingsFilter}
        setSavingsFilter={setSavingsFilter}
        dealRatingFilter={dealRatingFilter}
        setDealRatingFilter={setDealRatingFilter}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default DealsPage;
