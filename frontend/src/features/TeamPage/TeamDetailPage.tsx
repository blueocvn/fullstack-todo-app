import {
  ListGroup,
  ListGroupItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';
import { E_Task_Status } from '../../types/enums';

const data = [
  { task: 'task 1', assignee: 'Lộc Đào', status: 'pending' },
  { task: 'task 2', assignee: 'Sơn', status: 'doing' },
  { task: 'task 3', assignee: 'hoang', status: 'completed' },
];

export const TeamDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { teamId } = params;

  const naviagteTaskDetail = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-10 gap-5">
      <div className="col-span-7 text-xl flex justify-center gap-3">
        <span>Team:</span>
        <span className="font-bold">{teamId}</span>
      </div>
      <div className="col-span-7 text-xl flex justify-center gap-3">
        <span>Leader:</span>
        <span className="font-bold">Hoàng Phan</span>
      </div>

      <div className="col-span-7">
        <Table>
          <TableHead>
            <TableHeadCell>Todo</TableHeadCell>
            <TableHeadCell>Assignee</TableHeadCell>
            <TableHeadCell>status</TableHeadCell>
          </TableHead>

          <TableBody className="divide-y text-black">
            {data.map((item) => (
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={item.task}>
                <TableCell onClick={() => naviagteTaskDetail(`/teams/task/${item.task}`)}>
                  <p className="cursor-pointer hover:text-blue-500 hover:underline">{item.task}</p>
                </TableCell>
                <TableCell>{item.assignee}</TableCell>
                <TableCell
                  className={
                    item.status === E_Task_Status.DOING
                      ? 'text-blue-500'
                      : item.status === E_Task_Status.COMPLETED
                        ? 'text-green-500'
                        : 'text-gray-500'
                  }
                >
                  {item.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="col-span-3">
        <ListGroup className="w-full col-span-1">
          {[1, 2, 3, 4].map((item) => (
            <ListGroupItem key={item}>
              <p className="w-full flex justify-center gap-5">Hoàng Phan</p>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};
