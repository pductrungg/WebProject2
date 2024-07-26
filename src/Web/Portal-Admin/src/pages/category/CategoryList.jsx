import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {Button, Col, Row, Space, Flex} from 'antd';
// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
// ---COMMON
import SearchText from 'components/common/SearchText';
import {
  CreateBtn,
  AuditLogBtn,
  SearchBtn,
  DataImportBtn,
  ImportHistoryBtn,
  DataExportBtn,
} from 'components/common/button';
// ---
import {GetColumns} from './colunms';
import DataTable from 'components/common/DataTable';

const CategoryList = () => {
  const [categoriesData, setCategoriesData] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [textSearch, setTextSearch] = useState('');
  const [searchFlag, setSearchFlag] = useState(0);

  useEffect(() => {
    getListCategoriesData();
  }, [searchFlag]);

  const getListCategoriesData = () => {
    setCategoriesData(mockDataCategoryList);
    setTotalRecords(mockDataCategoryList?.length);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setSearchFlag((prev) => prev + 1);
  };

  const handleResetFilter = () => {
    setTextSearch('');
    setSearchFlag((prev) => prev + 1);
  };

  return (
    <>
      <HeaderContentInner className="flex flex-col xl:flex-row gap-2 justify-between items-start xl:items-center">
        <h1>Danh mục sản phẩm</h1>
        <Flex wrap gap="small">
          <AuditLogBtn />
          <DataImportBtn />
          <ImportHistoryBtn />
          <DataExportBtn />
          <Link to={'/category/add'}>
            <CreateBtn />
          </Link>
        </Flex>
      </HeaderContentInner>
      <BodyContentInner>
        <form onSubmit={handleSubmitSearch}>
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
                <SearchBtn htmlType="submit" />
                <Button onClick={handleResetFilter} danger>
                  Xoá bộ lọc
                </Button>
              </Space>
            </Col>
          </Row>
        </form>

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
            rowExpandable
          />
        </div>
      </BodyContentInner>
    </>
  );
};

export default CategoryList;

export const mockDataCategoryList = [
  {
    key: '111111a',
    id: '111111a',
    name: 'Tên danh mục cấp 1',
    age: 60,
    address: 'New York No. 1 Lake Park',
    createdTime: '2024-07-16T07:28:52.024Z',
    children: [
      {
        key: '22222aaaaa',
        id: '22222aaaaa',
        name: 'Tên danh mục cấp 2',
        age: 42,
        address: 'New York No. 2 Lake Park',
        createdTime: '2024-07-16T07:28:52.024Z',
      },
      {
        key: '22222aaaaab',
        id: '22222aaaaab',
        name: 'Tên danh mục cấp 2',
        age: 30,
        address: 'New York No. 3 Lake Park',
        createdTime: '2024-07-16T07:28:52.024Z',
        children: [
          {
            key: '333333bbbba',
            id: '333333bbbba',
            name: 'Tên danh mục cấp 3',
            age: 16,
            address: 'New York No. 3 Lake Park',
            createdTime: '2024-07-17T07:28:52.024Z',
          },
        ],
      },
      {
        key: '22222c',
        id: '22222c',
        name: 'Tên danh mục cấp 2',
        age: 72,
        address: 'London No. 1 Lake Park',
        createdTime: '2024-07-16T07:28:52.024Z',
        children: [
          {
            key: '333333ccccca',
            id: '333333ccccca',
            name: 'Tên danh mục cấp 3',
            age: 42,
            address: 'London No. 2 Lake Park',
            createdTime: '2024-07-16T07:28:52.024Z',
            children: [
              {
                key: '44444ccccca',
                id: '44444ccccca',
                name: 'Tên danh mục cấp 4',
                age: 25,
                address: 'London No. 3 Lake Park',
                createdTime: '2024-07-16T07:28:52.024Z',
              },
              {
                key: '44444cccccbbbb',
                id: '44444cccccbbbb',
                name: 'Tên danh mục cấp 4',
                age: 18,
                address: 'London No. 4 Lake Park',
                createdTime: '2024-07-17T07:28:52.024Z',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '111111b',
    id: '111111b',
    name: 'Tên danh mục cấp 1',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    createdTime: '2024-07-17T07:28:52.024Z',
  },
];
