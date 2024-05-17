import { Spinner } from 'flowbite-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner className="text-blue-500" />
    </div>
  );
};

export default Loading;
