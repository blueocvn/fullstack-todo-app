import { useGetTasksQuery } from '../../app/services/task';
import TaskTable from '../../components/task/TaskTable';

const TaskList = () => {
  const { data } = useGetTasksQuery();
  console.log(data);

  return (
    <main className="m-4">
      <TaskTable />
    </main>
  );
};

export default TaskList;
