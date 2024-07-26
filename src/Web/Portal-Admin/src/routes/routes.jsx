import Dashboard from 'pages/dashboard/Dashboard';
import CATEGORY_ROUTES from 'pages/category/routes';
import PRODUCT_ROUTES from 'pages/product/routes';

const ROUTES = [
  {path: '/dashboard', title: 'Trang chủ', element: Dashboard},
  ...CATEGORY_ROUTES,
  ...PRODUCT_ROUTES,
];

export default ROUTES;
