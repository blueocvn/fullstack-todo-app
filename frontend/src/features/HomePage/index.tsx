import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Modal, Table, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaRegTrashCan } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoIosAddCircle } from 'react-icons/io';
import { RiEdit2Line } from 'react-icons/ri';
import * as Yup from 'yup';

import { enqueueSnackbar } from 'notistack';
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAllTaskByOwnerQuery,
  useUpdateStatusTaskMutation,
  useUpdateTitleTaskMutation,
} from '../../app/services/api';
import { TaskModel } from '../../types/Task';

const newCreateTaskSchema = Yup.object().shape({
  title: Yup.string().required('please enter title'),
});

const newEditTaskSchema = Yup.object().shape({
  title: Yup.string().required('please enter new title'),
});

export const HomePage = () => {
  const { data: tasks, refetch } = useGetAllTaskByOwnerQuery();
  const [createTask] = useCreateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTitleTaskMutation();
  const [updateStatus] = useUpdateStatusTaskMutation();
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalStatus, setOpenModalStatus] = useState(false);
  const [idTask, setIdTask] = useState('');
  const [titleTask, setTitleTask] = useState('');
  const [status, setStatus] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TaskModel>({
    resolver: yupResolver(newCreateTaskSchema),
  });

  const {
    handleSubmit: handleSubmitEditTask,
    control: controlEditTask,
    reset: resetEditTask,
    formState: { errors: errorEditTask },
  } = useForm<TaskModel>({
    resolver: yupResolver(newEditTaskSchema),
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

  async function handleDeleteTask(id: string) {
    try {
      await deleteTask(id);
      refetch();
      setOpenModalDelete(false);
      enqueueSnackbar('Delete success !', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Delete fail !', {
        variant: 'warning',
      });
    }
  }

  async function handleUpdateTask(data: TaskModel) {
    try {
      await updateTask({ id: idTask, title: data.title });
      refetch();
      setOpenModalEdit(false);
      resetEditTask();
      enqueueSnackbar('Update success !', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Update fail !', {
        variant: 'warning',
      });
    }
  }

  async function handleUpdateStatus() {
    try {
      await updateStatus({ id: idTask, status: newStatus });
      refetch();
      setOpenModalStatus(false);
      enqueueSnackbar('Update success !', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Update fail !', {
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
              <Table.Cell className="relative">
                <p
                  className={
                    task?.status == 'pending'
                      ? 'text-gray-500'
                      : task?.status == 'doing'
                        ? 'text-blue-500'
                        : 'text-green-500'
                  }
                >
                  {task?.status}
                </p>
                <RiEdit2Line
                  className="absolute bottom-4 right-24 hover:cursor-pointer"
                  onClick={() => (setStatus(task?.status), setOpenModalStatus(true), setIdTask(task?.id))}
                />
              </Table.Cell>
              <Table.Cell
                className="font-medium text-cyan-600 hover:underline cursor-pointer dark:text-cyan-500"
                onClick={() => (setOpenModalEdit(true), setTitleTask(task?.title), setIdTask(task?.id))}
              >
                Edit
              </Table.Cell>
              <Table.Cell>
                <FaRegTrashCan
                  color="red"
                  className="hover:cursor-pointer"
                  onClick={() => (setOpenModalDelete(true), setIdTask(task?.id))}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      {/* MODAL CREATE TASK */}
      <Modal show={openModal} onClose={() => (setOpenModal(false), reset())}>
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
                <Button className="w-1/2" color="blue" onClick={() => (setOpenModal(false), reset())}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/*  */}

      {/* MODAL DELETE TASK */}
      <Modal show={openModalDelete} size="md" onClose={() => setOpenModalDelete(false)} popup>
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
              <Button color="gray" onClick={() => setOpenModalDelete(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*  */}

      {/* MODAL EDIT TASK */}
      <Modal show={openModalEdit} onClose={() => (setOpenModalEdit(false), resetEditTask())}>
        <Modal.Header>Edit this task</Modal.Header>
        <Modal.Body>
          <div className="w-full flex justify-center">
            <form className="w-full flex max-w-md flex-col gap-4" onSubmit={handleSubmitEditTask(handleUpdateTask)}>
              <div>
                <div className="mb-2 flex items-center">
                  <Label htmlFor="title" value="Title's this task : " />
                  <p className="ml-2">{titleTask}</p>
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="New title" />
                  <Controller
                    control={controlEditTask}
                    name="title"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        value={value || ''}
                        onChange={(item) => onChange(item.target.value)}
                        color={errorEditTask?.title ? 'failure' : ''}
                        helperText={errorEditTask.title ? errorEditTask?.title?.message : <></>}
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <Button
                  className="w-1/2"
                  type="submit"
                  disabled={errorEditTask?.title ? true : false}
                  onClick={() => handleSubmitEditTask(handleUpdateTask)}
                >
                  Submit
                </Button>
                <Button className="w-1/2" color="blue" onClick={() => (setOpenModalEdit(false), resetEditTask())}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      {/*  */}

      {/* MODAL CHANGE STATUS */}
      <Modal show={openModalStatus} onClose={() => setOpenModalStatus(false)}>
        <Modal.Header>Change status'task</Modal.Header>
        <Modal.Body>
          <div className="w-full flex justify-center">
            <div className="w-full flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 flex items-center">
                  <Label htmlFor="title" value="Status's task : " className="mr-2" />
                  <p
                    className={
                      status == 'pending' ? 'text-gray-500' : status == 'doing' ? 'text-blue-500' : 'text-green-500'
                    }
                  >
                    {status}
                  </p>
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="New status :" className="mr-2" />
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="bg-gray-50 border-none text-gray-900 text-sm rounded-lg"
                  >
                    <option value="pending">pending</option>
                    <option value="doing">doing</option>
                    <option value="completed">complete</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between gap-5">
                <Button className="w-1/2" onClick={handleUpdateStatus}>
                  Submit
                </Button>
                <Button className="w-1/2" color="blue" onClick={() => setOpenModalStatus(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/*  */}
    </div>
  );
};
