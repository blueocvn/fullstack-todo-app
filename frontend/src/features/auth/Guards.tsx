import { withAppHeader } from '../../components/layouts/hocs';
import { getTokens } from '../../utils/storage';
import { Login } from './Login';
import { HomePage } from '../../components/HomePage';

const tokens = getTokens();

const Pages = {
  Home: withAppHeader(HomePage),
  Login: Login,
};

export const Guards = () => {
  if (tokens?.error === 'null') return <Pages.Login />;

  return <Pages.Home />;
};
