import {useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Layout, Menu} from 'antd';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import store from 'store';
import MENU_ITEMS from 'constants/menuItems';
import 'styles/SideBarLeft.scss';
import {setCollapsed} from 'redux/reducers/globalSlice';
import {IMAGES} from 'constants/assets';

const SideBarLeft = () => {
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.global.collapsed);
  const selectedKeys = useLocation()
    .pathname.split('/')
    .filter((i) => i);

  const [openKey, setOpenKey] = useState(store.get('openKeys') || []);

  const onOpenChange = (openKeys) => {
    const rootSubmenuKeys = MENU_ITEMS.map((item) => item.id);
    const latestOpenKey = openKeys.find((key) => openKey.indexOf(key) === -1);
    let newOpenKeys = openKeys;
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : [];
    }
    setOpenKey(newOpenKeys);
    store.set('openKeys', newOpenKeys);
  };

  const onCollapseChange = () => {
    dispatch(setCollapsed(!collapsed));
  };

  return (
    <Layout.Sider
      width={256}
      theme="light"
      breakpoint="lg"
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="sider"
      style={{
        position: 'fixed',
      }}
    >
      <div className={`brand pt-4 ${collapsed ? 'px-2' : 'px-4'}`}>
        <div className="logo">
          <Link to={'/dashboard'}>
            <img alt="logo" src={IMAGES.Logo} />
          </Link>
          {/* {!collapsed && <h1>ADMIN</h1>} */}
        </div>
      </div>
      <div className="menuContainer">
        <Menu
          mode="inline"
          theme="light"
          onOpenChange={onOpenChange}
          selectedKeys={selectedKeys}
          openKeys={openKey}
          items={MENU_ITEMS}
        />
      </div>
      <div className={`sideBarFooter ${collapsed ? 'justify-center' : 'justify-end'}`}>
        <div className="collapsedBtn" onClick={onCollapseChange}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
      </div>
    </Layout.Sider>
  );
};

export default SideBarLeft;
