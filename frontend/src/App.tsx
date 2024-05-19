import { Route, Routes } from 'react-router-dom';
import { Guards } from './features/auth/Guards';
import { Register } from './features/auth/Register';

const Pages = {
  Register: Register,
  Guards: Guards,
};

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Pages.Register />} />
        <Route path="/" element={<Pages.Guards />} />
      </Routes>
    </>
  );
}

export default App;
