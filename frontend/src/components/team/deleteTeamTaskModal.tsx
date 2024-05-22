import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useDeleteTaskMutation, useGetTasksByTeamQuery } from '../../app/services/api';
import { enqueueSnackbar } from 'notistack';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaRegTrashCan } from 'react-icons/fa6';

export default function DeleteTeamTaskModal({ task_id, team_id }: { task_id: string; team_id: string }) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { refetch } = useGetTasksByTeamQuery(team_id || '');
  const [deleteTask] = useDeleteTaskMutation();

  const handleDelete = async () => {
    try {
      await deleteTask(task_id).unwrap();
      setOpenModal(false);
      refetch();
      enqueueSnackbar('Team has been deleted successfully!', {
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
      <FaRegTrashCan color="red" className="hover:cursor-pointer" onClick={() => setOpenModal(true)} />
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
