import {useSelector} from 'react-redux';

const useCheckLoggedIn = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const checkLoggedIn = !!accessToken;

  return checkLoggedIn;
};

export default useCheckLoggedIn;
