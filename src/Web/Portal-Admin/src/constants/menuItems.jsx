import {DashboardOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import IconBox from 'assets/icon-box';

const MENU_ITEMS = [
  {
    icon: <DashboardOutlined />,
    key: 'dashboard',
    label: <Link to="/dashboard">Trang chủ</Link>,
  },

  //sản phẩm
  {
    icon: <IconBox key="groupproduct" />,
    key: 'groupproduct',
    label: 'Quản lý sản phẩm',
    children: [
      {
        key: 'category',
        label: <Link to="/category">Danh mục sản phẩm</Link>,
      },
      {
        key: 'productgroup',
        label: <Link to="/productgroup">Nhóm sản phẩm</Link>,
      },
    ],
  },
];

export default MENU_ITEMS;
