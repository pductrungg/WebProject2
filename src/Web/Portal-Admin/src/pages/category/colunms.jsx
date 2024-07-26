import {Link} from 'react-router-dom';
import {Space} from 'antd';
import moment from 'moment';

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
      width: '100px',
      render: (_, row) => (
        <Space>
          <Link to={`/category/detail/${row.id}`}>
            <i className="fa fa-eye text-green" aria-hidden="true"></i>
          </Link>
          <Link to={`/category/edit/${row.id}`}>
            <i className="fa fa-pencil text-blue" aria-hidden="true"></i>
          </Link>
          <span className="cursor-pointer">
            <i className="fa fa-trash text-red" aria-hidden="true"></i>
          </span>
        </Space>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: '12%',
      render: (_, row) => (
        <>
          {row?.createdTime ? moment.utc(row.createdTime).local().format('DD/MM/YYYY HH:mm') : ''}
        </>
      ),
    },
  ];
  return columns;
};
