import {Layout} from 'antd';
import LoadingOverlay from 'react-loading-overlay-nextgen';
import {useSelector} from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import ROUTES from 'routes/routes';
import 'styles/Layout.scss';
import NavBar from './NavBar';
import SideBarLeft from './SideBarLeft';

const LayoutDefault = () => {
  const statusLoading = useSelector((state) => state.global.status);
  const collapsed = useSelector((state) => state.global.collapsed);

  return (
    <LoadingOverlay active={statusLoading} spinner>
      <Layout>
        <SideBarLeft />
        <Layout>
          <NavBar />
          <Layout.Content className={collapsed ? 'content-collapsed' : 'content'}>
            <div className="contentInner">
              <Routes>
                {ROUTES.map((route, idx) => {
                  return (
                    route.element && (
                      <Route
                        key={idx}
                        path={route.path}
                        exact={route.exact}
                        name={route.name}
                        element={<route.element />}
                      />
                    )
                  );
                })}
              </Routes>
            </div>
          </Layout.Content>
          {/* <Layout.Footer className="globalFooter">Design Admin ©2022</Layout.Footer> */}
        </Layout>
      </Layout>
    </LoadingOverlay>
  );
};

export default LayoutDefault;
