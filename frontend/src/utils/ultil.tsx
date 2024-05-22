export const statusColor = (status: string) => {
  if (status === 'Đang xử lý') {
    return 'gray';
  }

  if (status === 'Hoàn thành') return 'success';

  if (status === 'Hủy bỏ') return 'indigo';

  return 'failure';
};
