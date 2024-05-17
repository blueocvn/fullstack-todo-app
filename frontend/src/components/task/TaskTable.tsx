import { Badge, Button, Card, Table } from 'flowbite-react';
import { NavLink } from 'react-router-dom';

const TaskTable = () => {
  return (
    <Card>
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
            <Table.Cell className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Design giao diện
            </Table.Cell>
            <Table.Cell>Thiết kế ui trang chủ</Table.Cell>
            <Table.Cell>10/07/2024</Table.Cell>
            <Table.Cell>
              <Badge color="success">Hoàn thành</Badge>
            </Table.Cell>
            <Table.Cell className="flex gap-5">
              <NavLink to={'/task'} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
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
