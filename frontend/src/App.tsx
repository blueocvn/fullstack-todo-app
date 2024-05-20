import { Route, Routes } from 'react-router-dom';
import { withAppHeader } from './components/layouts/hocs';
import { TeamPage } from './features/TeamPage';
import { Guards } from './features/auth/Guards';
import { Register } from './features/auth/Register';
import { ResetPassword } from './features/auth/ResetPassword';

const Pages = {
  Register: Register,
  Guards: Guards,
  ResetPassword: ResetPassword,
  TeamPage: withAppHeader(TeamPage),
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Pages.Register />} />
        <Route path="/" element={<Pages.Guards />} />
        <Route path="/reset-password" element={<Pages.ResetPassword />} />
        <Route path="/teams" element={<Pages.TeamPage />} />
      </Routes>
    </>
  );
}

export default App;
