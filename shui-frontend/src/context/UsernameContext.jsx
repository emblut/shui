import { createContext, useState } from 'react';

const UsernameContext = createContext();

export function UsernameProvider({ children }) {
  const [username, setUsername] = useState('');

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

export default UsernameContext;
