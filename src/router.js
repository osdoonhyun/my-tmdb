import { createBrowserRouter } from 'react-router-dom';
import { Movies, Lists, Details, Tvs, Login, Signup } from './pages';

export const router = createBrowserRouter([
  { path: '/', element: <Lists /> },
  { path: '/:pathname/:detailId', element: <Details /> },
  { path: '/tvs', element: <Tvs /> },
  { path: '/movies', element: <Movies /> },
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
]);
