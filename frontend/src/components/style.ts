import styled from 'styled-components';

// Container for the entire page
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

// Header style
export const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
`;

// Style for each card
export const Card = styled.div<{ isOpen: boolean }>`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${props => (props.isOpen ? '#e0e0e0' : '#fff')};
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

// Style for content within each card
export const CardContent = styled.div<{ isOpen: boolean }>`
  display: ${props => (props.isOpen ? 'block' : 'none')};
  margin-top: 10px;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

// Error message styling
export const Error = styled.p`
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;