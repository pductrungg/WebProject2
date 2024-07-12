import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Button, Form, Input, Layout} from 'antd';
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import {toast} from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay-nextgen';
import {userLoggedIn} from 'redux/reducers/authSlice';
import {IMAGES} from 'constants/assets';
import 'styles/Login.scss';

const Login = () => {
  const dispatch = useDispatch();
  const statusLoading = useSelector((state) => state.global.status);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const payload = {
        identifier: values.userName,
        password: values.password,
        loginType: 'UserName',
      };

      //   const response = await AuthApi.login(payload);
      let responseTest = {
        user: {
          userName: values.userName,
        },
        accessToken: values.userName + values.password,
        refreshToken: values.userName + values.password,
      };

      //   if (response) {
      dispatch(userLoggedIn(responseTest));
      navigate('/dashboard');
      return;
      //   }

      //   toast.error('Tài khoản hoặc mật khẩu không đúng. Xin vui lòng thử lại');
    } catch (err) {
      console.error(err);
      toast.error('Tài khoản hoặc mật khẩu không đúng. Xin vui lòng thử lại');
    }
  };

  return (
    <LoadingOverlay active={statusLoading} spinner>
      <Layout style={{minHeight: '100vh', border: '1px solid black'}}>
        <>
          <div className="form loginForm">
            <div className="logo">
              <img alt="logo" src={IMAGES.Logo} />
              {/* <span>Hệ thống</span> */}
            </div>
            <Form onFinish={onFinish}>
              <Form.Item
                name="userName"
                rules={[{required: true, message: 'Vui lòng nhập tài khoản!'}]}
                hasFeedback
              >
                <Input placeholder="Tài khoản*" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{required: true, message: 'Vui lòng nhập mật khẩu!'}]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Mật khẩu"
                  iconRender={(visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)}
                />
              </Form.Item>
              <Form.Item>
                <Button className="mt-4" type="primary" htmlType="submit" block>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      </Layout>
    </LoadingOverlay>
  );
};

export default Login;
