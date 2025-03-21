import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import BuyTicket from './pages/buyTickets';
import Layout from './components/layout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/buy-ticket" element={<BuyTicket />} />
        </Route>  
      </Routes>
    </Router>
  );
};

export default AppRouter;