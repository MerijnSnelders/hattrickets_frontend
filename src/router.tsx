import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./pages/Home";
import BuyTicket from './pages/buyTickets';
import Layout from './components/layout';
import StadiumPage  from './pages/Stadium';
import TeamPage from './pages/Team';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/buy-ticket" element={<BuyTicket />} />
          <Route path="/stadiums" element={<StadiumPage />} />
          <Route path="/teams" element={<TeamPage />} />
        </Route>  
      </Routes>
    </Router>
  );
};

export default AppRouter;