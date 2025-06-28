import React from 'react';
import SteamLogoSVG from '../../assets/steam-logo.svg';
import MetacriticLogoSVG from '../../assets/metacritic-logo.svg';

interface DealCardProps {
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

const DealCard: React.FC<DealCardProps> = ({
  title,
  salePrice,
  normalPrice,
  savings,
  thumb,
  metacriticScore,
  metacriticLink,
  steamRatingText,
  steamAppID,
  dealRating,
}) => {
  // Button styling following App.css design system
  const buttonBaseStyle: React.CSSProperties = {
    borderRadius: '8px',
    border: '1px solid transparent',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '500',
    fontFamily: 'Orbitron, system-ui, Avenir, Helvetica, Arial, sans-serif',
    cursor: 'pointer',
    transition: 'all 0.25s',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    margin: '4px 2px',
    minWidth: '130px',
    justifyContent: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  };

  const steamButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: '#1b2838',
    color: '#ffffff',
    border: '1px solid #2a475e',
  };

  const steamButtonHoverStyle: React.CSSProperties = {
    backgroundColor: '#2a475e',
    borderColor: '#66c0f4',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  };

  const metacriticButtonStyle: React.CSSProperties = {
    ...buttonBaseStyle,
    backgroundColor: '#ffcc33',
    color: '#000000',
    border: '1px solid #e6b800',
  };

  const metacriticButtonHoverStyle: React.CSSProperties = {
    backgroundColor: '#e6b800',
    borderColor: '#cc9900',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
  };

  const logoStyle: React.CSSProperties = {
    width: '18px',
    height: '18px',
    flexShrink: 0,
  };

  return (
    <div className="deal-card">
      <img src={thumb} alt={title} className="deal-image" />
      <h3>{title}</h3>
      <p>Sale Price: ${salePrice}</p>
      <p>Normal Price: ${normalPrice}</p>
      <p>You Save: {savings}%</p>
      <p>Steam Rating: {steamRatingText}</p>
      <p>Deal Rating: {dealRating}/10</p>

      {/* Enhanced Metacritic Button */}
      <div style={{ margin: '8px 0' }}>
        <a
          href={`https://www.metacritic.com${metacriticLink}`}
          target="_blank"
          rel="noopener noreferrer"
          style={metacriticButtonStyle}
          title={`View on Metacritic - Score: ${metacriticScore}`}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, metacriticButtonHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, metacriticButtonStyle);
          }}
        >
          <img src={MetacriticLogoSVG} alt="Metacritic" style={logoStyle} />
          <span>Metacritic {metacriticScore}</span>
        </a>
      </div>

      {/* Enhanced Steam Button */}
      <div style={{ margin: '8px 0' }}>
        <a
          href={`https://store.steampowered.com/app/${steamAppID}`}
          target="_blank"
          rel="noopener noreferrer"
          style={steamButtonStyle}
          title="View on Steam Store"
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, steamButtonHoverStyle);
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, steamButtonStyle);
          }}
        >
          <img src={SteamLogoSVG} alt="Steam" style={logoStyle} />
          <span>View on Steam</span>
        </a>
      </div>
    </div>
  );
};

export default DealCard;
