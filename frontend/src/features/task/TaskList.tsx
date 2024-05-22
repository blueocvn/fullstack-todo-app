import { toast } from 'react-toastify';
import { useDeleteTaskMutation, useGetTasksQuery } from '../../app/services/task';
import TaskTable from '../../components/task/TaskTable';
import { useEffect } from 'react';

const TaskList = () => {
  const { data: task } = useGetTasksQuery();
  const [deleteTask, { isSuccess, isError }] = useDeleteTaskMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Xóa task thành công!');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.success('Có lỗi xảy ra khi xóa task!');
    }
  }, [isError]);

  const handleDeleteTask = (id: number) => {
    try {
      deleteTask(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="m-4">
      <TaskTable tasks={task?.data} onDeleteTask={handleDeleteTask} />
    </main>
  );
};

export default TaskList;
