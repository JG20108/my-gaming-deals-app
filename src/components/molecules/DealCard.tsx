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
  steamRatingText: string | null;
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
  // Function to get Steam rating color based on rating text
  const getSteamRatingColor = (ratingText: string | null): string => {
    // Handle null or empty rating text
    if (!ratingText) {
      return 'rgba(255, 255, 255, 0.7)'; // Default gray for missing ratings
    }

    const rating = ratingText.toLowerCase();

    // Steam rating color mapping - order matters for specificity
    const ratingColorMap = [
      { keyword: 'overwhelmingly positive', color: '#22c55e' }, // Bright Green
      { keyword: 'overwhelmingly negative', color: '#991b1b' }, // Very Dark Red
      { keyword: 'very positive', color: '#16a34a' }, // Green
      { keyword: 'very negative', color: '#b91c1c' }, // Dark Red
      { keyword: 'mostly positive', color: '#84cc16' }, // Yellow-Green
      { keyword: 'mostly negative', color: '#ea580c' }, // Orange-Red
      { keyword: 'positive', color: '#65a30d' }, // Light Green
      { keyword: 'negative', color: '#dc2626' }, // Red
      { keyword: 'mixed', color: '#f59e0b' }, // Orange
    ];

    const matchedRating = ratingColorMap.find(({ keyword }) =>
      rating.includes(keyword)
    );
    return matchedRating?.color ?? 'rgba(255, 255, 255, 0.7)'; // Default gray
  };

  // Format savings to 2 decimal places
  const formatSavings = (savingsValue: string): string => {
    const numericValue = parseFloat(savingsValue);
    return isNaN(numericValue) ? savingsValue : numericValue.toFixed(2);
  };

  // Enhanced title styling with even more distinction
  const titleStyle: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: '700',
    fontFamily:
      'Orbitron, "Press Start 2P", system-ui, Avenir, Helvetica, Arial, sans-serif',
    color: '#646cff',
    margin: '12px 0 16px 0',
    lineHeight: '1.3',
    textAlign: 'center',
    textShadow: '0 0 8px rgba(100, 108, 255, 0.4), 0 2px 4px rgba(0,0,0,0.5)',
    letterSpacing: '0.8px',
    minHeight: '2.6rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px',
    borderBottom: '3px solid rgba(100, 108, 255, 0.3)',
    paddingBottom: '10px',
    marginBottom: '18px',
    transition: 'all 0.3s ease',
    background:
      'linear-gradient(135deg, rgba(100, 108, 255, 0.1) 0%, rgba(100, 108, 255, 0.05) 100%)',
    borderRadius: '8px 8px 0 0',
    position: 'relative',
    overflow: 'hidden',
  };

  const titleHoverStyle: React.CSSProperties = {
    color: '#ffffff',
    textShadow:
      '0 0 12px rgba(255, 255, 255, 0.6), 0 0 6px rgba(100, 108, 255, 0.8), 0 2px 4px rgba(0,0,0,0.5)',
    transform: 'scale(1.02)',
    background:
      'linear-gradient(135deg, rgba(100, 108, 255, 0.2) 0%, rgba(100, 108, 255, 0.1) 100%)',
  };

  // Info text styling for better hierarchy
  const infoTextStyle: React.CSSProperties = {
    fontSize: '0.85rem',
    margin: '6px 0',
    fontFamily: 'Orbitron, system-ui, Avenir, Helvetica, Arial, sans-serif',
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: '1.4',
  };

  const priceTextStyle: React.CSSProperties = {
    ...infoTextStyle,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  };

  const savingsTextStyle: React.CSSProperties = {
    ...infoTextStyle,
    fontWeight: '600',
    color: '#4ade80', // Green color for savings
    fontSize: '0.9rem',
  };

  const ratingTextStyle: React.CSSProperties = {
    ...infoTextStyle,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.8rem',
  };

  // Dynamic Steam rating text style
  const steamRatingTextStyle: React.CSSProperties = {
    ...ratingTextStyle,
    color: getSteamRatingColor(steamRatingText),
    fontWeight: '600',
    textShadow: `0 1px 2px rgba(0,0,0,0.3)`,
  };

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

      {/* Enhanced Game Title with Maximum Distinction */}
      <h3
        style={titleStyle}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, {
            ...titleStyle,
            ...titleHoverStyle,
          });
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, titleStyle);
        }}
        title={title}
      >
        {title}
      </h3>

      {/* Deal Information with Improved Typography */}
      <p style={priceTextStyle}>
        <strong>Sale Price:</strong> ${salePrice}
      </p>
      <p style={priceTextStyle}>
        <strong>Normal Price:</strong> ${normalPrice}
      </p>
      <p style={savingsTextStyle}>
        <strong>You Save:</strong> {formatSavings(savings)}%
      </p>
      <p style={ratingTextStyle}>
        <strong>Steam Rating:</strong>{' '}
        <span style={steamRatingTextStyle}>
          {steamRatingText || 'Not Available'}
        </span>
      </p>
      <p style={ratingTextStyle}>
        <strong>Deal Rating:</strong> {dealRating}/10
      </p>

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
