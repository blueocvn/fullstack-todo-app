import { Table } from 'flowbite-react';
import { FaRegTrashCan } from 'react-icons/fa6';

import { useGetAllTaskByOwnerQuery } from '../../app/services/api';

export const HomePage = () => {
  const { data: tasks } = useGetAllTaskByOwnerQuery();

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
        </Table.Head>
        <Table.Body className="divide-y">
          {tasks?.map((task) => (
            <Table.Row key={task?.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {task?.title}
              </Table.Cell>
              <Table.Cell
                className={
                  task?.status == 'pending'
                    ? 'text-gray-500'
                    : task?.status == 'doing'
                      ? 'text-blue-500'
                      : 'text-green-500'
                }
              >
                {task?.status}
              </Table.Cell>
              <Table.Cell className="font-medium text-cyan-600 hover:underline cursor-pointer dark:text-cyan-500">
                Edit
              </Table.Cell>
              <Table.Cell>
                <FaRegTrashCan color="red" className="hover:cursor-pointer" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
