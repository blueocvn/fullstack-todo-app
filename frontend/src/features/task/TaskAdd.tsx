import { toast } from 'react-toastify';
import { useCreateTaskMutation } from '../../app/services/task';
import TaskAddForm from '../../components/form/TaskAddForm';
import { TaskAddFormValues } from '../../interfaces/form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskAdd = () => {
  const [createTask, { isLoading, isSuccess, isError }] = useCreateTaskMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Tạo task thành công!');
      navigate('/task');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error('Có lỗi xảy ra khi tạo task!');
    }
  }, [isError]);

  const handleCreateTask = async (data: TaskAddFormValues) => {
    try {
      createTask(data).unwrap();
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tạo task');
    }
  };

  return (
    <>
      <TaskAddForm onCreateTask={handleCreateTask} loading={isLoading} />
    </>
  );
};

export default TaskAdd;
