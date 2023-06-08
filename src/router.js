import { createBrowserRouter } from 'react-router-dom';
import { Movies, Lists, Details, Tvs } from './pages';

export const router = createBrowserRouter([
  { path: '/', element: <Lists /> },
  { path: '/:detailId', element: <Details /> },
  { path: '/tvs', element: <Tvs /> },
  { path: '/movies', element: <Movies /> },
]);
