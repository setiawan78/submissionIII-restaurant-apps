import WKHome from '../views/pages/wk-home';
import WKWhistlist from '../views/pages/wk-whistlist';
import WKDetail from '../views/pages/wk-detail';

const routes = {
  '/': WKHome,
  '/home': WKHome,
  '/favorite': WKWhistlist,
  '/waroeng/:id': WKDetail,
};

export default routes;
