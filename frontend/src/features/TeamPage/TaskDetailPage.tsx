import { Dropdown, Table, TableBody, TableCell, TableRow } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { E_Task_Status } from '../../types/enums';
import { useEffect, useMemo, useState } from 'react';
import { useAssignTaskMutation, useGetMembersByLeaderQuery, useGetTaskDetailQuery } from '../../app/services/api';
import { getTokens } from '../../utils/storage';

export const TaskDetailPage = () => {
  const params = useParams();

  const [status, setStatus] = useState<string>(E_Task_Status.PENDING);
  const [assignee, setAssignee] = useState<string>('');
  const [isAssignee, setIsAssignee] = useState<boolean>(false);
  const [isLeader, setIsLeader] = useState<boolean>(false);

  const token = useMemo(() => {
    return getTokens();
  }, []);

  const { taskId } = params;
  const { data: task } = useGetTaskDetailQuery(taskId || '');
  const { data: members } = useGetMembersByLeaderQuery(token?.id || '');
  const [assigntask] = useAssignTaskMutation();

  useEffect(() => {
    setStatus(task?.status);
    setAssignee(task?.assignee_name);

    if (token?.id === String(task?.assignee_id)) {
      setIsAssignee(true);
    }

    if (token?.id === String(task?.owner_id)) {
      setIsLeader(true);
    }
  }, [task]);

  const changeStatus = (status: string) => {
    setStatus(status);
  };

  const handleChangeAssignee = async (name: string, id: string) => {
    setAssignee(name);
    try {
      await assigntask({ task_id: String(taskId), body: { member_id: id } }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p className="text-center font-bold text-xl mb-5">Task detail</p>

      <Table className="">
        <TableBody className="divide-y text-black">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Todo</TableCell>
            <TableCell>{task?.title}</TableCell>
          </TableRow>

          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Team</TableCell>
            <TableCell>{task?.team_name}</TableCell>
          </TableRow>

          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Leader</TableCell>
            <TableCell>{task?.leader_name}</TableCell>
          </TableRow>

          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Assignee</TableCell>
            <TableCell className="flex justify-between items-center ">
              <p>{assignee}</p>
              {isLeader && (
                <Dropdown label="chage assignee">
                  {members?.map((member) => (
                    <Dropdown.Item key={member?.id} onClick={() => handleChangeAssignee(member?.username, member?.id)}>
                      {member?.username}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              )}
            </TableCell>
          </TableRow>

          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Status</TableCell>
            <TableCell className="flex justify-between items-center ">
              <p
                className={
                  status === E_Task_Status.DOING
                    ? 'text-blue-500'
                    : status === E_Task_Status.COMPLETED
                      ? 'text-green-500'
                      : 'text-gray-500'
                }
              >
                {status}
              </p>

              {isAssignee && (
                <Dropdown label="chage status">
                  <Dropdown.Item onClick={() => changeStatus(E_Task_Status.PENDING)}>
                    {E_Task_Status.PENDING}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeStatus(E_Task_Status.DOING)}>{E_Task_Status.DOING}</Dropdown.Item>
                  <Dropdown.Item onClick={() => changeStatus(E_Task_Status.COMPLETED)}>
                    {E_Task_Status.COMPLETED}
                  </Dropdown.Item>
                </Dropdown>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
