import React from 'react';
import { SortOption } from '../molecules/SortControls';
import {
  generateFilterDescription,
  generateSortDescription,
} from '../../utils/filterDisplayUtils';
import Logo from '../../assets/Logo.png';

interface DealsHeaderProps {
  metacriticScoreFilter: [number, number];
  salePriceRange: [number, number];
  savingsFilter: [number, number];
  dealRatingFilter: [number, number];
  sortOption: SortOption;
}

const DealsHeader: React.FC<DealsHeaderProps> = ({
  metacriticScoreFilter,
  salePriceRange,
  savingsFilter,
  dealRatingFilter,
  sortOption,
}) => {
  const filterDescription = generateFilterDescription(
    metacriticScoreFilter,
    salePriceRange,
    savingsFilter,
    dealRatingFilter
  );

  const sortDescription = generateSortDescription(sortOption);

  const headerStyles: React.CSSProperties = {
    backgroundColor: '#242424',
    borderBottom: '2px solid #646cff',
    padding: '20px 0',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.87)',
  };

  const containerStyles: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const titleContainerStyles: React.CSSProperties = {
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const appTitleStyles: React.CSSProperties = {
    fontSize: '3.2em',
    lineHeight: '1.1',
    fontWeight: '400',
    margin: '0 0 15px 15px',
    color: 'rgba(255, 255, 255, 0.87)',
    fontFamily:
      'Orbitron, "Press Start 2P", system-ui, Avenir, Helvetica, Arial, sans-serif',
    textAlign: 'center',
  };

  const clickableTitleStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'color 0.25s',
    cursor: 'pointer',
  };

  const logoStyles: React.CSSProperties = {
    width: '35px',
    height: '35px',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  };

  const nameStyles: React.CSSProperties = {
    fontSize: '1.2rem',
    fontWeight: '400',
    margin: '0',
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Orbitron, system-ui, Avenir, Helvetica, Arial, sans-serif',
  };

  const subtitleContainerStyles: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: '15px 20px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '800px',
    margin: '0 auto',
    backdropFilter: 'blur(10px)',
  };

  const subtitleStyles: React.CSSProperties = {
    fontSize: '1.1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: '0',
    lineHeight: '1.6',
    fontFamily: 'Orbitron, system-ui, Avenir, Helvetica, Arial, sans-serif',
  };

  const labelStyles: React.CSSProperties = {
    color: '#646cff',
    fontWeight: '500',
  };

  const valueStyles: React.CSSProperties = {
    color: '#ffffff',
    fontWeight: '600',
    backgroundColor: 'rgba(100, 108, 255, 0.2)',
    padding: '2px 8px',
    borderRadius: '4px',
    border: '1px solid rgba(100, 108, 255, 0.4)',
  };

  return (
    <header style={headerStyles}>
      <div style={containerStyles}>
        <div style={titleContainerStyles}>
          <h1 style={appTitleStyles}>Deals App</h1>

          <a
            href="https://jose-guillen.dev"
            target="_blank"
            rel="noopener noreferrer"
            style={clickableTitleStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#646cff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'inherit';
            }}
          >
            <img src={Logo} alt="Jose Guillen Logo" style={logoStyles} />
            <span style={nameStyles}>by Jose Guillen</span>
          </a>
        </div>

        <div style={subtitleContainerStyles}>
          <p style={subtitleStyles}>
            <span style={labelStyles}>Filtered by:</span>{' '}
            <span style={valueStyles}>{filterDescription}</span>
            {' • '}
            <span style={labelStyles}>Sorted by:</span>{' '}
            <span style={valueStyles}>{sortDescription}</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default DealsHeader;
