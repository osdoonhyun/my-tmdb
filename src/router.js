import { createBrowserRouter } from 'react-router-dom';
import Movies from './pages/Movies';
import Details from './pages/Details';

export const router = createBrowserRouter([
  { path: '/', element: <Movies /> },
  { path: '/:detailId', element: <Details /> },
]);
