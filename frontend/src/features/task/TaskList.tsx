import { useGetTasksQuery } from '../../app/services/task';
import TaskTable from '../../components/task/TaskTable';

const TaskList = () => {
  const { data: task } = useGetTasksQuery();
  console.log(task);

  return (
    <main className="m-4">
      <TaskTable tasks={task?.data} />
    </main>
  );
};

export default TaskList;
