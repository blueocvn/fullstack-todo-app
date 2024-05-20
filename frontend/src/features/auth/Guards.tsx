import { HomePage } from '../HomePage';
import { withAppHeader } from '../../components/layouts/hocs';
import { getTokens } from '../../utils/storage';
import { Login } from './Login';

const tokens = getTokens();

const Pages = {
  Home: withAppHeader(HomePage),
  Login: Login,
};

export const Guards = () => {
  if (tokens?.error === 'null') return <Pages.Login />;

  return <Pages.Home />;
};
