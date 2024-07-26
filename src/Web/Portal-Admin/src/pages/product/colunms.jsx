import {Space, Switch} from 'antd';
import {PRODUCT_STATUS_OPTIONS, PRODUCT_TYPE_OPTIONS} from 'constants/application';
import {IMAGES} from 'constants/assets';
import moment from 'moment';
import {Link} from 'react-router-dom';

export const GetColumns = ({
  setRowDelete = () => {},
  setShowDeleteModal = () => {},
  setRowChangeDisplay = () => {},
  setShowChangeDisplayModal = () => {},
}) => {
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'imgUrl',
      key: 'imgUrl',
      width: 80,
      render: (_, row) => (
        <>
          <div className="flex justify-center items-center">
            <img src={row?.imgUrl || IMAGES.ImgPlaceholder} alt="" style={{maxWidth: 37}} />
          </div>
        </>
      ),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: 'productCodeDetail',
      key: 'productCodeDetail',
      width: 100,
    },
    {
      title: 'Mã sản phẩm chung',
      dataIndex: 'productCodeGeneral',
      key: 'productCodeGeneral',
      width: 150,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 150,
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'unit',
      key: 'unit',
      width: 100,
    },
    {
      title: 'Quy cách thùng',
      dataIndex: 'boxSpecification',
      key: 'boxSpecification',
      width: 100,
    },
    {
      title: 'Loại sản phẩm',
      dataIndex: 'productType',
      key: 'productType',
      width: 120,
      render: (_, row) => (
        <>{PRODUCT_TYPE_OPTIONS.find((item) => item.value === row?.productType)?.label || ''}</>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (_, row) => (
        <>{PRODUCT_STATUS_OPTIONS.find((item) => item.value === row?.status)?.label || ''}</>
      ),
    },
    {
      title: 'Hiển thị trên app',
      dataIndex: 'isDisplayOnApp',
      key: 'isDisplayOnApp',
      width: 150,
      align: 'center',
      render: (_, row) => (
        <Switch
          onChange={() => {
            setRowChangeDisplay(row);
            setShowChangeDisplayModal(true);
          }}
          value={row?.isDisplayOnApp}
        />
      ),
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_, row) => (
        <Space>
          <Link to={`/product/detail/${row?.id}`}>
            <i className="fa fa-eye text-green" aria-hidden="true"></i>
          </Link>
          <Link to={`/product/edit/${row?.id}`}>
            <i className="fa fa-pencil text-blue" aria-hidden="true"></i>
          </Link>
          <span
            onClick={() => {
              setRowDelete(row);
              setShowDeleteModal(true);
            }}
            className="cursor-pointer"
          >
            <i className="fa fa-trash text-red" aria-hidden="true"></i>
          </span>
        </Space>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdTime',
      key: 'createdTime',
      render: (_, row) => (
        <>
          {row?.createdTime ? moment.utc(row.createdTime).local().format('DD/MM/YYYY HH:mm') : ''}
        </>
      ),
    },
  ];
  return columns;
};
