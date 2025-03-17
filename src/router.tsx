import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import BuyTicket from './pages/buyTickets';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buy-ticket" element={<BuyTicket />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;