import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './Component/ScrollToTop';
import React, { Suspense, lazy } from 'react';
import Loading from './Component/Loading';
import CreateAccount from './User/SignUp';
import Userintrest from './User/Userintrest';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from './User/Signin';
import ProtectedRoute from './User/ProtectedRoute';
import PublicRoute from './User/PublicRoute';
import Layout from './User/Layout';
import Userprofile from './User/Userprofile';

const Home = lazy(() => import('./Component/Home'));
const Showdetaills = lazy(() => import('./Component/Showdetailss'));
const SearchPage = lazy(() => import('./Component/SearchPage'));
const LikedMoviesList = lazy(() => import('./Component/LikedMoviesList'));

function App() {
  return (
    <div className="w-screen m-0 overflow-hidden flex">
      <Router>
        <ScrollToTop />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="bg-black text-white dark:bg-green-50 dark:text-black rounded-xl shadow-lg font-bold text-sm md:text-base"
          bodyClassName="flex items-center"
        />
        <Suspense fallback={<Loading />}>
          <Routes>

            <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><CreateAccount /></PublicRoute>} />
            <Route path="/userintrest" element={<PublicRoute><Userintrest /></PublicRoute>} />

            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/" element={<Home />} />
              <Route path="/detaills/:id" element={<Showdetaills />} />
              <Route path="/userprofile" element={<Userprofile />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/likedatas" element={<LikedMoviesList />} />
            </Route>

          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
