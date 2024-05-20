import { Dropdown, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { useParams } from 'react-router-dom';
import { E_Task_Status } from '../../types/enums';
import { useState } from 'react';

export const TaskDetailPage = () => {
  const params = useParams();

  const [status, setStatus] = useState<string>(E_Task_Status.PENDING);

  const { taskId } = params;

  const isMyTask = true;

  const changeStatus = (status: string) => {
    setStatus(status);
  };

  return (
    <>
      <p className="text-center font-bold text-xl mb-5">Task detail</p>

      <Table className="">
        <TableBody className="divide-y text-black">
          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Todo</TableCell>
            <TableCell>task 1</TableCell>
          </TableRow>

          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Team</TableCell>
            <TableCell>team 1</TableCell>
          </TableRow>

          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Leader</TableCell>
            <TableCell>task 1</TableCell>
          </TableRow>

          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Assignee</TableCell>
            <TableCell>task 1</TableCell>
          </TableRow>

          <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <TableCell className="w-1/5 font-bold text-sm">Status</TableCell>
            <TableCell className="flex justify-between items-center gap-5">
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

              {isMyTask && (
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
