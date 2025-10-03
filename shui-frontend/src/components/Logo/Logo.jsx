import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './Logo.css';
import useUsername from '../../hooks/useUsername.js';

function Logo() {
  const { setUsername } = useUsername();
  const handleClick = () => {
    setUsername('');
  };

  return (
    <Link className='logo-wrapper-link' onClick={handleClick} to='/'>
      <img className='logo' src={logo} alt='Company logo' />
    </Link>
  );
}

export default Logo;
