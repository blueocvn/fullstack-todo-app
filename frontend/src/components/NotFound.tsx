import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="text-center">
          <h1 className="mb-4 font-extrabold tracking-tight text-blue-600 text-7xl lg:text-9xl dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-blue-900 md:text-4xl dark:text-white">Not found</p>
          <p className="mb-4 text-lg font-light text-blue-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the home page.{' '}
          </p>
          <Link to={'/'} className="flex items-center justify-center">
            <Button className="bg-blue-500">Về trang chủ</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
