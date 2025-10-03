import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FeedPage from './pages/FeedPage/FeedPage.jsx';
import CreateMsgPage from './pages/CreateMsgPage/CreateMsgPage.jsx';
import RootLayout from './RootLayout.jsx';
import './App.css';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        { index: true, element: <FeedPage /> },
        { path: 'create', element: <CreateMsgPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
