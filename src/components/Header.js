// Author: Ibadehin Mojeed
// https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
import Navbar from './Navbar';
// ...
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <Link to="/" className="logo">
          fordnotes
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
