import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegTrashCan } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoIosAddCircle } from 'react-icons/io';
import * as Yup from 'yup';

import { enqueueSnackbar } from 'notistack';
import { useCreateTaskMutation, useDeleteTaskMutation, useGetAllTaskByOwnerQuery } from '../../app/services/api';
import { TaskModel } from '../../types/Task';

const newCreateTaskSchema = Yup.object().shape({
  title: Yup.string().required('please enter title'),
});

export const HomePage = () => {
  const { data: tasks, refetch } = useGetAllTaskByOwnerQuery();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModelDelete] = useState(false);
  const [idTask, setIdTask] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskModel>({
    resolver: yupResolver(newCreateTaskSchema),
  });

  async function handleCreateTask(data: TaskModel) {
    try {
      await createTask(data).unwrap();
      enqueueSnackbar('Create task Success', {
        variant: 'success',
      });
      refetch();
      setOpenModal(false);
      reset();
    } catch (error) {
      enqueueSnackbar('Create task failed', {
        variant: 'warning',
      });
    }
  }

  const handleDeleteTask = useCallback((id: string) => {
    (async () => {
      try {
        deleteTask(id);
        refetch();
        setOpenModelDelete(false);
        enqueueSnackbar('Delete success !', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Delete fail !', {
          variant: 'warning',
        });
      }
    })();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Task</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Delete</span>
          </Table.HeadCell>
          <Table.HeadCell className="flex items-center">
            <Button onClick={() => setOpenModal(true)}>
              <IoIosAddCircle />
            </Button>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {tasks?.map((task) => (
            <Table.Row key={task?.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {task?.title}
              </Table.Cell>
              <Table.Cell
                className={
                  task?.status == 'pending'
                    ? 'text-gray-500'
                    : task?.status == 'doing'
                      ? 'text-blue-500'
                      : 'text-green-500'
                }
              >
                {task?.status}
              </Table.Cell>
              <Table.Cell className="font-medium text-cyan-600 hover:underline cursor-pointer dark:text-cyan-500">
                Edit
              </Table.Cell>
              <Table.Cell>
                <FaRegTrashCan
                  color="red"
                  className="hover:cursor-pointer"
                  onClick={() => (setOpenModelDelete(true), setIdTask(task?.id))}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Create new task</Modal.Header>
        <Modal.Body>
          <div className="w-full flex justify-center">
            <form className="w-full flex max-w-md flex-col gap-4" onSubmit={handleSubmit(handleCreateTask)}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title's task" />
                </div>
                <Controller
                  control={control}
                  name="title"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value || ''}
                      onChange={(item) => onChange(item.target.value)}
                      color={errors?.title ? 'failure' : ''}
                      helperText={errors.title ? errors?.title?.message : <></>}
                    />
                  )}
                />
              </div>
              <div className="flex justify-between gap-5">
                <Button
                  className="w-1/2"
                  type="submit"
                  onClick={handleSubmit(handleCreateTask)}
                  disabled={errors?.title ? true : false}
                >
                  Submit
                </Button>
                <Button className="w-1/2" color="blue" onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={openModalDelete} size="md" onClose={() => setOpenModelDelete(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDeleteTask(idTask)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModelDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
