import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import BuyTicket from './pages/buyTickets';
import Layout from './components/layout';
import StadiumPage  from './pages/Stadium';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/buy-ticket" element={<BuyTicket />} />
          <Route path="/stadium" element={<StadiumPage />} />
        </Route>  
      </Routes>
    </Router>
  );
};

export default AppRouter;