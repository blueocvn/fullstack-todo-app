import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FormEvent, useEffect, useState } from 'react';
import { useGetAllTaskByOwnerQuery, useUpdateTaskMutation } from '../../app/services/api';
import { enqueueSnackbar } from 'notistack';

export default function EditModal({ task }: { task: any }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const [updateTask] = useUpdateTaskMutation();
  const { refetch } = useGetAllTaskByOwnerQuery();

  useEffect(() => {
    setTitle(task?.title);
  }, [task]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await updateTask({ task_id: task?.id, body: { title: title } }).unwrap();
      refetch();
      setOpenModal(false);
      enqueueSnackbar('task has been updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <p
        className="font-medium text-cyan-600 hover:underline cursor-pointer dark:text-cyan-500"
        onClick={() => setOpenModal(true)}
      >
        edit
      </p>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit task</Modal.Header>
        <Modal.Body>
          <div className="w-full flex justify-center">
            <form className="w-full flex max-w-md flex-col gap-4" onSubmit={handleUpdate}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Task's title" />
                </div>
                <TextInput
                  id="title"
                  type="text"
                  placeholder="nguyen@gmail.com"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="flex justify-between gap-5">
                <Button className="w-1/2" type="submit">
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
    </>
  );
}
