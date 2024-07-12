import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {Button, Col, Row, Space} from 'antd';
// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
// ---COMMON
import SearchText from 'components/common/SearchText';
// ---
import {GetColumns} from './colunms';
import DataTable from 'components/common/DataTable';
import AddCategory from './add.jsx';


const CategoryList = () => {
  const [textSearch, setTextSearch] = useState('');
  const [categoriesData, setCategoriesData] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    getListCategoriesData();
  }, []);

  const getListCategoriesData = () => {
    setCategoriesData(mockDataCategoryList);
    setTotalRecords(mockDataCategoryList?.length);
  };

  return (
    <>
      <HeaderContentInner className="flex justify-between items-center">
        <h1>Danh mục sản phẩm</h1>
        <Link to={'/category/add'}>
          <Button type="primary" className="w-fit md:w-32">
            Tạo mới
          </Button>
        </Link>
      </HeaderContentInner>
      <BodyContentInner>
        <Row gutter={16}>
          <Col xs={24} sm={12} lg={6}>
            <SearchText
              value={textSearch}
              setValue={setTextSearch}
              placeholder="Tìm kiếm tên danh mục"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Space size={'middle'}>
              <Button>Tìm</Button>
              <Button danger>Xoá bộ lọc</Button>
            </Space>
          </Col>
        </Row>

        <div className="mt-4 lg:mt-6">
          <DataTable
            columns={GetColumns()}
            dataSource={categoriesData}
            total={totalRecords}
            pageSize={pageSize}
            onChange={(page, pageSize) => {
              setPageNumber(page);
              setPageSize(pageSize);
            }}
          />
        </div>
      </BodyContentInner>
    </>
  );
};

export default CategoryList;

const mockDataCategoryList = [
  {
    key: '111111a',
    name: 'Tên danh mục cấp 1',
    age: 60,
    address: 'New York No. 1 Lake Park',
    children: [
      {
        key: '22222aaaaa',
        name: 'Tên danh mục cấp 2',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        key: '22222aaaaab',
        name: 'Tên danh mục cấp 2',
        age: 30,
        address: 'New York No. 3 Lake Park',
        children: [
          {
            key: '333333bbbba',
            name: 'Tên danh mục cấp 3',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        key: '22222c',
        name: 'Tên danh mục cấp 2',
        age: 72,
        address: 'London No. 1 Lake Park',
        children: [
          {
            key: '333333ccccca',
            name: 'Tên danh mục cấp 3',
            age: 42,
            address: 'London No. 2 Lake Park',
            children: [
              {
                key: '44444ccccca',
                name: 'Tên danh mục cấp 4',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                key: '44444cccccbbbb',
                name: 'Tên danh mục cấp 4',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '111111b',
    name: 'Tên danh mục cấp 1',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
];
