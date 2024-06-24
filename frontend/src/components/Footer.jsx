const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-r from-goghOne-700 to-goghSeven-700 text-goghFive-500 text-center p-3">
      <p>&copy; {currentYear} Vanity by Reeucq</p>
    </footer>
  );
};

export default Footer;
