import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Datepicker, Label, Select, Spinner, TextInput } from 'flowbite-react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { TaskAddFormValues } from '../../interfaces/form';
import dayjs from 'dayjs';

interface TaskAddFormProps {
  onCreateTask: (task: TaskAddFormValues) => void;
  loading: boolean;
}

const taskAddSchema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    dueDate: yup.string().required('Vui lòng chọn chọn ngày hết hạn'),
    status: yup.string().required('Vui lòng chọn trạng thái'),
  })
  .required();

const TaskAddForm = ({ onCreateTask, loading }: TaskAddFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      dueDate: '',
      status: 'pending',
    },
    resolver: yupResolver(taskAddSchema),
  });
  const onSubmit: SubmitHandler<TaskAddFormValues> = (data) => {
    onCreateTask(data);
  };

  return (
    <Card className="flex-1 max-w-5xl">
      <h3 className="text-2xl font-semibold text-center">Tạo task</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="block mb-2">
            <Label htmlFor="name" value="Tên" />
            <TextInput type="text" placeholder="Tên" {...register('name')} color={errors.name ? 'failure' : 'gray'} />
          </div>
          <p className="text-red-500">{errors.name?.message}</p>
        </div>
        <div className="block mb-2">
          <Label value="Mô tả" />
          <TextInput placeholder="Mô tả" {...register('description')} color={errors.description ? 'failure' : 'gray'} />
          <p className="text-red-500">{errors.description?.message}</p>
        </div>
        <div className="block mb-2">
          <Label value="Trạng thái" />
          <Select {...register('status')} color={errors.description ? 'failure' : 'gray'}>
            <option value="Đang xử lý">Đang làm</option>
            <option value="Thành công">Thành công</option>
            <option value="Hủy bỏ">Hủy bỏ</option>
            <option value="Thất bại">Thất bại</option>
          </Select>
        </div>
        <div className="block mb-2">
          <Label value="Ngày hết hạn" />
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <Datepicker
                placeholder="Ngày hết hạn"
                language="vi-VN"
                onSelectedDateChanged={(date) => field.onChange(dayjs(date).format('MM/DD/YYYY'))}
                value={field.value}
              />
            )}
          />
          <p className="text-red-500">{errors.dueDate?.message}</p>
        </div>
        <div className="flex gap-3">
          <Button type="submit" color="blue">
            {loading ? <Spinner /> : 'Tạo task'}
          </Button>
          <Link to={'/'}>
            <Button color="light">Hủy</Button>
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default TaskAddForm;
