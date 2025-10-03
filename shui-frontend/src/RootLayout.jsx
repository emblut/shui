import { Outlet } from 'react-router-dom';
import Logo from './components/Logo/Logo.jsx';

import { UsernameProvider } from './context/UsernameContext.jsx';

export default function RootLayout() {
  return (
    <UsernameProvider>
      <div className='app-layout'>
        <Logo />
        <main>
          <Outlet />
        </main>
      </div>
    </UsernameProvider>
  );
}
