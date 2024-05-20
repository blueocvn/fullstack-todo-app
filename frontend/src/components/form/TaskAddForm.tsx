import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Datepicker, Label, TextInput, ToggleSwitch } from 'flowbite-react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { TaskAddFormValues } from '../../interfaces/form';
import dayjs from 'dayjs';

const taskAddSchema = yup
  .object({
    name: yup.string().required('Vui lòng nhập tên'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    due_date: yup.string().required('Vui lòng chọn chọn ngày hết hạn'),
    status: yup.boolean().required('Vui lòng chọn trạng thái'),
  })
  .required();

const TaskAddForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      due_date: '',
      status: false,
    },
    resolver: yupResolver(taskAddSchema),
  });
  const onSubmit: SubmitHandler<TaskAddFormValues> = (data) => {
    console.log(data);
  };

  return (
    <Card className="flex-1 max-w-5xl">
      <h3 className="text-2xl font-semibold text-center">Tạo task</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="block mb-2">
            <Label htmlFor="name" value="Tên" />
            <TextInput type="text" placeholder="Tên" {...register('name')} color={errors.name ? 'failure' : ''} />
          </div>
          <p className="text-red-500">{errors.name?.message}</p>
        </div>
        <div className="block mb-2">
          <Label value="Mô tả" />
          <TextInput placeholder="Mô tả" {...register('description')} color={errors.description ? 'failure' : ''} />
          <p className="text-red-500">{errors.description?.message}</p>
        </div>
        <div className="block mb-2">
          <Label value="Ngày hết hạn" />
          <Controller
            control={control}
            name="due_date"
            render={({ field }) => (
              <Datepicker
                placeholder="Ngày hết hạn"
                language="vi-VN"
                onSelectedDateChanged={(date) => field.onChange(dayjs(date).format('DD/MM/YYYY'))}
                value={field.value}
              />
            )}
          />
          <p className="text-red-500">{errors.due_date?.message}</p>
        </div>
        <div className="block mb-2">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <ToggleSwitch label="Đã hoàn thành" checked={field.value} onChange={(status) => field.onChange(status)} />
            )}
          />
        </div>
        <div className="flex gap-3">
          <Button type="submit" color="blue">
            Tạo task
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
