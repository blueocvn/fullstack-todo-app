import { Route, Routes } from 'react-router-dom';
import { Guards } from './features/auth/Guards';
import { Register } from './features/auth/Register';
import { ResetPassword } from './features/auth/ResetPassword';

const Pages = {
  Register: Register,
  Guards: Guards,
  ResetPassword: ResetPassword,
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Pages.Register />} />
        <Route path="/" element={<Pages.Guards />} />
        <Route path="/reset-password" element={<Pages.ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
