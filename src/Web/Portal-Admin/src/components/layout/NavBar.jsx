import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {Layout, Breadcrumb, Dropdown, Popover} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import ROUTES from 'routes/routes';
import {userLoggedOut} from 'redux/reducers/authSlice';
import 'styles/NavBar.scss';
import {ICONS} from 'constants/assets';

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const collapsed = useSelector((state) => state.global.collapsed);
  const user = useSelector((state) => state.auth.user);

  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);

    return currentRoute
      ? {routeName: currentRoute.title, parentTitle: currentRoute.parentTitle}
      : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const {routeName, parentTitle} = getRouteName(currentPathname, ROUTES);
      if (parentTitle) {
        breadcrumbs.push({
          title: parentTitle,
        });
      }
      if (routeName) {
        breadcrumbs.push({
          pathname: currentPathname,
          title: currentPathname ? (
            <Link
              to={currentPathname}
              className={`${index + 1 === array.length ? 'font-bold' : ''}`}
            >
              {routeName}
            </Link>
          ) : (
            routeName
          ),
          active: index + 1 === array.length ? true : false,
        });
      }

      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  const onSignOut = async () => {
    // const logoutResult = await AuthApi.logout();
    // if (logoutResult && logoutResult.succeeded) {
    console.log('onSignOut');
    navigate('/login');
    dispatch(userLoggedOut());
    // }
  };

  const ProfileMenuItems = [
    {
      key: 'Profile',
      label: <Link to={'/profile'}>Hồ sơ</Link>,
    },
    {key: 'ChangePassword', label: 'Đổi mật khẩu'},
    {
      key: 'SignOut',
      label: <div onClick={onSignOut}>Đăng xuất</div>,
    },
  ];

  //   const handleClickMenu = (e) => {
  //     e.key === 'SignOut' && onSignOut();
  //   };

  return (
    <Layout.Header className={`navbarLayout ${collapsed ? 'collapsed' : ''}`} id="layoutHeader">
      <div className="flex justify-between items-center w-full">
        <div className="flex-1">
          <div className="hidden md:block">
            <Breadcrumb items={breadcrumbs} />
          </div>
          <div className="block md:hidden">
            <Popover content={<Breadcrumb items={breadcrumbs} />}>
              <EllipsisOutlined className="p-3" />
            </Popover>
          </div>
        </div>
        <div className="ml-auto">
          <Dropdown
            menu={{
              items: ProfileMenuItems,
            }}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold">{user?.fullName || 'ADMIN'}</span>
              <span className="flex-shrink-0">
                <img src={ICONS.IconAvatars} alt="" style={{width: 32}} />
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
    </Layout.Header>
  );
};

export default NavBar;
