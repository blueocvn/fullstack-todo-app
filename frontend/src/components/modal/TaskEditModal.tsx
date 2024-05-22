import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const taskEditSchema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    due_date: yup.string().required('Vui lòng chọn chọn ngày hết hạn'),
    status: yup.boolean().required('Vui lòng chọn trạng thái'),
  })
  .required();

const TaskEditModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskEditSchema),
  });
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = () => {};

  return (
    <>
      <Button color="blue" onClick={() => setOpenModal(true)}>
        Sửa
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sửa Task</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="task" value="Tên" />
                </div>
                <TextInput
                  placeholder="Tên task"
                  {...register('name')}
                  color={errors.name ? 'failure' : 'gray'}
                  helperText={<span className="text-red-500">{errors.name?.message}</span>}
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="description" value="Mô tả" />
                </div>
                <TextInput
                  type="text"
                  {...register('description')}
                  color={errors.description ? 'failure' : 'gray'}
                  helperText={<span className="text-red-500">{errors.description?.message}</span>}
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label htmlFor="description" value="Mô tả" />
                </div>
                <TextInput
                  type="text"
                  {...register('description')}
                  color={errors.description ? 'failure' : 'gray'}
                  helperText={<span className="text-red-500">{errors.description?.message}</span>}
                />
              </div>
              <div className="w-full">
                <Button color="blue" type="submit">
                  Sửa
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      ;
    </>
  );
};

export default TaskEditModal;
