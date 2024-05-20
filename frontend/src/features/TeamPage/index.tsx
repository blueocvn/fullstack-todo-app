import { Outlet, Route, Routes } from 'react-router-dom';
import { TeamPage } from './TeamPage';
import { TeamDetailPage } from './TeamDetailPage';
import { TaskDetailPage } from './TaskDetailPage';

export const Teams = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<TeamPage />} />
        <Route path=":teamId" element={<TeamDetailPage />} />
        <Route path="/task/:taskId" element={<TaskDetailPage />} />
      </Routes>
      <Outlet />
    </>
  );
};
