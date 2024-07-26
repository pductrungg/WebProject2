import ProductList from './ProductList';
import ProductAction from './ProductAction';
import ProductDetail from './ProductDetail';

const PRODUCT_ROUTES = [
  {
    path: '/product',
    title: 'Danh sách sản phẩm',
    element: ProductList,
    parentTitle: 'Quản lý sản phẩm',
  },
  {
    path: '/product/add',
    navPath: '/product/add',
    title: 'Thêm mới sản phẩm',
    element: ProductAction,
  },
  {
    path: '/product/edit/:id',
    navPath: '/product/edit',
    title: 'Chỉnh sửa sản phẩm',
    element: ProductAction,
  },
  {
    path: '/product/detail/:id',
    navPath: '/product/detail',
    title: 'Chi tiết sản phẩm',
    element: ProductDetail,
  },
];

export default PRODUCT_ROUTES;
