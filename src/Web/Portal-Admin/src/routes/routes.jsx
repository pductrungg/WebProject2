import Dashboard from 'pages/dashboard/Dashboard';
import CategoryList from 'pages/category/CategoryList';
import CategoryAction from 'pages/category/CategoryAction';
import AddCategory from 'pages/category/add';

const ROUTES = [
  {path: '/dashboard', title: 'Trang chủ', element: Dashboard},
  {
    path: '/category',
    title: 'Danh mục sản phẩm',
    element: CategoryList,
    parentTitle: 'Quản lý sản phẩm',
  },
  {
    path: '/category/add',
    title: 'Thêm mới danh mục sản phẩm',
    element: AddCategory,
  },
  {
    path: '/category/:id',
    title: 'Chỉnh sửa danh mục sản phẩm',
    element: CategoryAction,
  },
];

export default ROUTES;
