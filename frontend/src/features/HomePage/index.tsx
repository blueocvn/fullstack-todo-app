import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegTrashCan } from 'react-icons/fa6';
import { IoIosAddCircle } from 'react-icons/io';
import * as Yup from 'yup';

import { enqueueSnackbar } from 'notistack';
import { useCreateTaskMutation, useGetAllTaskByOwnerQuery } from '../../app/services/api';
import { TaskModel } from '../../types/Task';

const newCreateTaskSchema = Yup.object().shape({
  title: Yup.string().required('please enter title'),
});

export const HomePage = () => {
  const { data: tasks, refetch } = useGetAllTaskByOwnerQuery();
  const [openModal, setOpenModal] = useState(false);
  const [createTask] = useCreateTaskMutation();

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
                <FaRegTrashCan color="red" className="hover:cursor-pointer" />
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
    </div>
  );
};
