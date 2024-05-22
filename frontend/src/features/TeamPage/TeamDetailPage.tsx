import {
  Button,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { E_Task_Status } from '../../types/enums';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  useAddNewMemberMutation,
  useGetMembersByTeamQuery,
  useGetTasksByTeamQuery,
  useGetTeamDetailQuery,
  useLazySearchUsersByEmailQuery,
} from '../../app/services/api';
import { getTokens } from '../../utils/storage';
import { enqueueSnackbar } from 'notistack';
import AddTaskModal from '../../components/team/AddTaskModal';
import DeleteTeamModal from '../../components/team/deleteTeamModal';
import { FaRegTrashCan } from 'react-icons/fa6';

import DeleteTeamTaskModal from '../../components/team/deleteTeamTaskModal';
import DeleteTeamMemberModal from '../../components/team/deleteTeamMember';

export const TeamDetailPage = () => {
  const params = useParams<{ teamId: string }>();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLeader, setIsLeader] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [searchUsers, setSearchUsers] = useState<any[]>([]);

  const { teamId } = params;
  const { data: team } = useGetTeamDetailQuery(teamId || '');
  const { data: tasks } = useGetTasksByTeamQuery(teamId || '');
  const { data: members, refetch } = useGetMembersByTeamQuery(teamId || '');
  const [trigger, { data: users }] = useLazySearchUsersByEmailQuery();
  const [addNewMember] = useAddNewMemberMutation();

  useEffect(() => {
    const token = getTokens();

    if (token?.id == team?.leader_id) {
      setIsLeader(true);
    }
  }, [team]);

  useEffect(() => {
    setSearchUsers(users as any[]);
  }, [users]);

  const naviagteTaskDetail = (path: string) => {
    navigate(path);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value) {
      trigger(e.target.value);
    }
  };

  const handleChooseUser = (email: string) => {
    setEmail(email);
    setSearchUsers([]);
  };

  const handleAddMember = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addNewMember({ team_id: String(teamId), body: { email } }).unwrap();
      refetch();
      setOpenModal(false);
      enqueueSnackbar('Add new member successfully', {
        variant: 'success',
      });
      setEmail('');
    } catch (error: any) {
      enqueueSnackbar(error?.data, {
        variant: 'error',
      });
      setEmail('');
    }
  };

  return (
    <div className="grid grid-cols-10 gap-5">
      <div className="col-span-7 text-xl flex justify-center gap-3">
        <span>Team:</span>
        <span className="font-bold">{team?.name}</span>
      </div>
      <div className="col-span-3 text-xl text-center">{isLeader && <AddTaskModal team_id={String(teamId)} />}</div>
      <div className="col-span-7 text-xl flex justify-center gap-3">
        <span>Leader:</span>
        <span className="font-bold">{team?.leader_name}</span>
      </div>
      <div className="col-span-3 text-xl text-center">
        {isLeader && (
          <Button className="w-full" onClick={() => setOpenModal(true)}>
            Add member
          </Button>
        )}

        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>Add new team's member</Modal.Header>
          <Modal.Body>
            <div className="w-full flex justify-center">
              <form className="w-full flex max-w-md flex-col gap-4" onSubmit={handleAddMember}>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="member" value="Team's member" />
                  </div>
                  <TextInput
                    id="member"
                    type="text"
                    placeholder="nguyen@gmail.com"
                    required
                    value={email}
                    onChange={(e) => handleChangeEmail(e)}
                  />
                  <ListGroup>
                    {searchUsers?.map((user) => (
                      <ListGroup.Item key={user?.id} onClick={() => handleChooseUser(user?.email)}>
                        {user?.email}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
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

      <div className="col-span-7">
        <Table>
          <TableHead>
            <TableHeadCell>Todo</TableHeadCell>
            <TableHeadCell>Assignee</TableHeadCell>
            <TableHeadCell>status</TableHeadCell>
            {isLeader && <TableHeadCell></TableHeadCell>}
          </TableHead>

          <TableBody className="divide-y text-black">
            {tasks?.map((task) => (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={task?.id}>
                <TableCell
                  onClick={() => naviagteTaskDetail(`/teams/task/${task?.id}`)}
                  className={task?.status == E_Task_Status.COMPLETED ? 'line-through' : ''}
                >
                  <p className="cursor-pointer hover:text-blue-500 hover:underline">{task?.title}</p>
                </TableCell>
                <TableCell>{task?.assignee_name}</TableCell>
                <TableCell
                  className={
                    task?.status === E_Task_Status.DOING
                      ? 'text-blue-500'
                      : task?.status === E_Task_Status.COMPLETED
                        ? 'text-green-500'
                        : 'text-gray-500'
                  }
                >
                  {task?.status}
                </TableCell>
                {isLeader && (
                  <Table.Cell>
                    <DeleteTeamTaskModal task_id={task?.id} team_id={String(teamId)} />
                  </Table.Cell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="col-span-3">
        <Table>
          <TableBody className="divide-y text-black">
            {members?.map((member) => (
              <TableRow key={member?.id}>
                <TableCell align={!isLeader ? 'center' : 'left'}>{member?.username}</TableCell>
                {isLeader && (
                  <TableCell align="right">
                    <DeleteTeamMemberModal team_id={String(teamId)} member_id={member?.id} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="col-span-7">{isLeader && <DeleteTeamModal team_id={team?.id as string} />}</div>
    </div>
  );
};
