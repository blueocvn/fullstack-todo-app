import { Button, Label, ListGroup, ListGroupItem, Modal, TextInput } from 'flowbite-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateNewTeamMutation, useGetAllTeamByUserQuery } from '../../app/services/api';
import { enqueueSnackbar } from 'notistack';

export const TeamPage = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [createNewTeam] = useCreateNewTeamMutation();
  const { data: teams, refetch } = useGetAllTeamByUserQuery();

  const navigateTeamDetail = (path: string) => {
    navigate(path);
  };

  const handleSubmitCreateTeam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const teamName = formData.get('name') as string;

    try {
      await createNewTeam({ name: teamName }).unwrap();
      refetch();
      setOpenModal(false);
      enqueueSnackbar('team has been created successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
    }
  };

  return (
    <div className="grid grid-cols-1">
      <div className="grid-cols-1 mb-5">
        <Button className="w-1/4 float-right" onClick={() => setOpenModal(true)}>
          Create your new team
        </Button>
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Create new Team</Modal.Header>
          <Modal.Body>
            <div className="w-full flex justify-center">
              <form className="w-full flex max-w-md flex-col gap-4" onSubmit={handleSubmitCreateTeam}>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Team's name" />
                  </div>
                  <TextInput id="name" name="name" type="text" placeholder="Team ABC" required />
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
      </div>

      <ListGroup className="w-full col-span-1">
        {teams?.map((team) => (
          <ListGroupItem key={team.id} onClick={() => navigateTeamDetail(`/teams/${team.id}`)}>
            <div className="w-full flex justify-center gap-5">
              <span>{team.name}</span>
              <span>-</span>
              <span>{team.leader_name}</span>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};
