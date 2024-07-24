export const GetColumns = () => {
  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      render: () => (
        <div>
            <a style={{marginRight:'6px'}}> Delete </a>
            <a>Chinh sua</a>
        </div>
      )
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
  ];

  return columns;
};
