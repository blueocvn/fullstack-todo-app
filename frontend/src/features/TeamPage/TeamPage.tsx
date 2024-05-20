import { ListGroup, ListGroupItem } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

export const TeamPage = () => {
  const navigate = useNavigate();

  const navigateTeamDetail = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-1">
      <p className="col-span-1 text-center mb-5 font-bold text-xl">List of Teams</p>

      <ListGroup className="w-full col-span-1">
        {[1, 2, 3, 4].map((item) => (
          <ListGroupItem key={item} onClick={() => navigateTeamDetail(`/teams/${item}`)}>
            <div className="w-full flex justify-center gap-5">
              <span>Team {item}</span>
              <span>-</span>
              <span>Hoàng Phan</span>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};
