import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import Explore from './pages/Explore';
import Offers from './pages/Offers';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import Listing from './pages/Listing';

function App() {
  return (
    <>
      <Router>
          <Routes>
              <Route path='/' element={<Explore />} />
              <Route path='/offers' element={<Offers />} />
              <Route path='/category/:categoryName' element={<Category />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/create-listing' element={<CreateListing />} />
              <Route path='/category/:categoryName/:listingId' element={<Listing />} />
              <Route path='/profile' element={<PrivateRoute />}>
                  <Route path='/profile' element={<Profile />} />
              </Route>
          </Routes>
          <Navbar />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
