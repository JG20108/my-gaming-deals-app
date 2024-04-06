import React from 'react';

interface DealCardProps {
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

const DealCard: React.FC<DealCardProps> = ({
  title,
  salePrice,
  normalPrice,
  savings,
  thumb,
  metacriticScore,
  metacriticLink,
  steamRatingText,
  steamAppID, // New
}) => (
  <div className="deal-card">
    <img src={thumb} alt={title} className="deal-image" />
    <h3>{title}</h3>
    <p>Sale Price: ${salePrice}</p>
    <p>Normal Price: ${normalPrice}</p>
    <p>You Save: {savings}%</p>
    <p>Steam Rating: {steamRatingText}</p>
    <p title={`Metacritic Score: ${metacriticScore}`}>Metacritic: <a href={`https://www.metacritic.com${metacriticLink}`} target="_blank" rel="noopener noreferrer">{metacriticScore}</a></p>
    <a href={`https://store.steampowered.com/app/${steamAppID}`} target="_blank" rel="noopener noreferrer">View on Steam</a>
  </div>
);

export default DealCard;