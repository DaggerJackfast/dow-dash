import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex flex-1 py-4 border-t justify-center align-center">
      <div className="flex justify-center align-center grow">
        Dow Dash {year}
      </div>
    </footer>
  );
};

export default Footer;
