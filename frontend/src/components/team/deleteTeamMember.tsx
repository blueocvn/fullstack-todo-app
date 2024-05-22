import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import { useGetMembersByTeamQuery, useRemoveMemberMutation } from '../../app/services/api';
import { enqueueSnackbar } from 'notistack';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { CiCircleMinus } from 'react-icons/ci';

export default function DeleteTeamMemberModal({ team_id, member_id }: { team_id: string; member_id: string }) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { refetch } = useGetMembersByTeamQuery(team_id || '');
  const [removeMember] = useRemoveMemberMutation();

  const handleDelete = async () => {
    try {
      await removeMember({
        team_id,
        body: {
          member_id,
        },
      }).unwrap();
      setOpenModal(false);
      refetch();
      enqueueSnackbar('Team has been deleted successfully!', {
        variant: 'success',
      });
    } catch (error: any) {
      console.log(error);

      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
  };

  return (
    <>
      <CiCircleMinus color="red" className="hover:cursor-pointer" onClick={() => setOpenModal(true)} />
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure to remove this member from team?
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
