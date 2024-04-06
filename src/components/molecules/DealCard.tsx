import React from 'react';

interface DealCardProps {
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  thumb: string;
}

const DealCard: React.FC<DealCardProps> = ({ title, salePrice, normalPrice, savings, thumb }) => (
  <div className="deal-card">
    <img src={thumb} alt={title} className="deal-image" />
    <h3>{title}</h3>
    <p>Sale Price: ${salePrice}</p>
    <p>Normal Price: ${normalPrice}</p>
    <p>You Save: {savings}%</p>
  </div>
);

export default DealCard;