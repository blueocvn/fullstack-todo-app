import { Badge, Button, Card, Table } from 'flowbite-react';
import { Link, NavLink } from 'react-router-dom';
import { Task } from '../../interfaces/task';

interface TaskTableProps {
  task: Task;
}

const TaskTable = ({ task }: TaskTableProps) => {
  return (
    <Card>
      <Link to={'/create'}>
        <Button className="w-fit">Tạo task</Button>
      </Link>
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Tên</Table.HeadCell>
          <Table.HeadCell>Mô tả</Table.HeadCell>
          <Table.HeadCell>Ngày</Table.HeadCell>
          <Table.HeadCell>Trạng thái</Table.HeadCell>
          <Table.HeadCell>Thao tác</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">{task.name}</Table.Cell>
            <Table.Cell>{task.description}</Table.Cell>
            <Table.Cell>{task.due_date}</Table.Cell>
            <Table.Cell>
              <Badge color="success">{task.status}</Badge>
            </Table.Cell>
            <Table.Cell className="flex gap-5">
              <NavLink to={`/task/${task.id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                <Button>Sửa</Button>
              </NavLink>
              <Button className="bg-red-500">Xóa</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Card>
  );
};

export default TaskTable;
