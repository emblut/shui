import { useContext } from 'react';
import UsernameContext from '../context/UsernameContext';

const useUsername = () => {
  const context = useContext(UsernameContext);

  return context;
};

export default useUsername;
