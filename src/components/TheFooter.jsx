const Footer = () => {

  const date = new Date().getFullYear();
  return (  
    <footer>
      <p>Link Note App | Copyright &copy; {date}</p>
    </footer>
  );
}
export default Footer;