import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { FormEvent, useState } from 'react';
import { useCreateTaskMutation, useGetTasksByTeamQuery } from '../../app/services/api';
import { enqueueSnackbar } from 'notistack';

export default function AddTaskModal({ team_id }: { team_id: string }) {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');

  const [createTask] = useCreateTaskMutation();
  const { refetch } = useGetTasksByTeamQuery(team_id);

  async function handleCreateTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await createTask({ title, team_id }).unwrap();
      refetch();
      setOpenModal(false);
      enqueueSnackbar('Add new task for team successfully', {
        variant: 'success',
      });
      setTitle('');
    } catch (error: any) {
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
  }

  return (
    <>
      <Button className="w-full" onClick={() => setOpenModal(true)}>
        Add task
      </Button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Add new team's member</Modal.Header>
        <Modal.Body>
          <div className="w-full flex justify-center">
            <form className="w-full flex max-w-md flex-col gap-4" onSubmit={handleCreateTask}>
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
