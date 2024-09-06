import React from 'react';

// Define a type for the props, if you have any
interface HomePageProps {
  title?: string;
}

const SimpleHomePage: React.FC<HomePageProps> = ({ title = 'Welcome to My Site' }) => {
  return (
    <div className="home-page">
      <header className="header">
        <h1>{title}</h1>
      </header>
      <main className="main-content">
        <p>Hello! This is a simple home page built with React and TypeScript.</p>
        <p>Feel free to explore and customize it to fit your needs.</p>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} My Site. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SimpleHomePage;