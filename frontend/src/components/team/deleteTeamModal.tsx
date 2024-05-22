import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useDeleteTeamMutation, useGetAllTeamByUserQuery } from '../../app/services/api';
import { enqueueSnackbar } from 'notistack';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function DeleteTeamModal({ team_id }: { team_id: string }) {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { refetch } = useGetAllTeamByUserQuery();
  const [deleteTeam] = useDeleteTeamMutation();

  const handleDelete = async () => {
    try {
      await deleteTeam(team_id).unwrap();
      setOpenModal(false);
      refetch();
      navigate(-1);
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
      <Button color="failure" onClick={() => setOpenModal(true)}>
        Delete team
      </Button>
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
