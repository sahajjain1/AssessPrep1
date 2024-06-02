import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import { ClipLoader } from 'react-spinners';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const BooksPage = lazy(() => import('../pages/BooksPage'));

const AppRoutes = () => (
  <Router>
    <Suspense fallback={ClipLoader}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/books" element={<BooksPage />} />
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRoutes;

///implemented lazy loading at route level, could have implemented at component level also but it dont give much differance