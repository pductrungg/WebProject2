import CategoryList from 'pages/category/CategoryList';
import CategoryAction from 'pages/category/CategoryAction';
import CategoryDetail from './CategoryDetail';
import AddCategory  from 'pages/category/add';
import EditCategory from './EditCategory';

const CATEGORY_ROUTES = [
  {
    path: '/category',
    title: 'Danh mục sản phẩm',
    element: CategoryList,
    parentTitle: 'Quản lý sản phẩm',
  },
  {
    path: '/category/add',
    navPath: '/category/add',
    title: 'Thêm mới danh mục sản phẩm',
    element: AddCategory,
  },
  {
    path: '/category/edit/:id',
    navPath: '/category/edit',
    title: 'Chỉnh sửa danh mục sản phẩm',
    element: EditCategory,
  },
  {
    path: '/category/detail/:id',
    navPath: '/category/detail',
    title: 'Chi tiết danh mục sản phẩm',
    element: CategoryDetail,
  },
];

export default CATEGORY_ROUTES;
