import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {Button, Col, Row, Space, Modal, Flex} from 'antd';
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
import CustomSelect from 'components/common/CustomSelect';
// ---
import {GetColumns} from 'pages/product/colunms';
import DataTable from 'components/common/DataTable';
import {PRODUCT_TYPE_OPTIONS, PRODUCT_STATUS_OPTIONS} from 'constants/application';

const ProductList = () => {
  const [productsData, setProductsData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // control search list
  const [textSearch, setTextSearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [searchFlag, setSearchFlag] = useState(0);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

  // control delete product modal
  const [rowDelete, setRowDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // control change display modal
  const [rowChangeDisplay, setRowChangeDisplay] = useState(null);
  const [showChangeDisplayModal, setShowChangeDisplayModal] = useState(false);

  // control selected row
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  useEffect(() => {
    const getListCategoryData = () => {
      setCategoryOptions([]);
    };

    getListCategoryData();
  }, []);

  useEffect(() => {
    getListProductsData();
  }, [searchFlag]);

  const getListProductsData = () => {
    setProductsData(mockDataProductList);
    setTotalRecords(mockDataProductList?.length);
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setSearchFlag((prev) => prev + 1);
  };

  const handleResetFilter = () => {
    setTextSearch('');
    setSelectedCategories([]);
    setSelectedProductTypes([]);
    setSelectedStatuses([]);
    setSearchFlag((prev) => prev + 1);
  };

  const handleChangeSelect = (name) => (value) => {
    switch (name) {
      case 'category':
        setSelectedCategories(value);
        break;

      case 'productType':
        setSelectedProductTypes(value);
        break;

      case 'status':
        setSelectedStatuses(value);
        break;

      default:
        break;
    }
  };

  const handleCloseDeleteModal = () => {
    setRowDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteProduct = () => {
    handleCloseDeleteModal();
  };

  const handleCloseChangeDisplayModal = () => {
    setRowChangeDisplay(null);
    setShowChangeDisplayModal(false);
  };

  const handleChangeDisplayProduct = () => {
    handleCloseChangeDisplayModal();
  };

  const handleSelectRowId = (newIds, items) => {
    setSelectedRowIds(newIds);
  };

  return (
    <>
      <HeaderContentInner className="flex flex-col xl:flex-row gap-2 justify-between items-start xl:items-center">
        <h1>Danh sách sản phẩm</h1>
        <Flex wrap gap="small">
          <AuditLogBtn />
          <DataImportBtn />
          <ImportHistoryBtn />
          <DataExportBtn />
          <Link to="/product/add">
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
            <Col xs={24} sm={12} lg={4}>
              <CustomSelect
                mode="multiple"
                allowClear
                showSearch={false}
                placeholder="Danh mục"
                value={selectedCategories}
                onChange={handleChangeSelect('category')}
                options={categoryOptions}
              />
            </Col>
            <Col xs={24} sm={12} lg={4}>
              <CustomSelect
                mode="multiple"
                allowClear
                showSearch={false}
                placeholder="Loại sản phẩm"
                value={selectedProductTypes}
                onChange={handleChangeSelect('productType')}
                options={PRODUCT_TYPE_OPTIONS}
              />
            </Col>
            <Col xs={24} sm={12} lg={4}>
              <CustomSelect
                mode="multiple"
                allowClear
                showSearch={false}
                placeholder="Trạng thái sản phẩm"
                value={selectedStatuses}
                onChange={handleChangeSelect('status')}
                options={PRODUCT_STATUS_OPTIONS}
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
            columns={GetColumns({
              setRowDelete,
              setShowDeleteModal,
              setRowChangeDisplay,
              setShowChangeDisplayModal,
            })}
            dataSource={productsData}
            total={totalRecords}
            pageSize={pageSize}
            onChange={(page, pageSize) => {
              setPageNumber(page);
              setPageSize(pageSize);
            }}
            rowSelection={{
              selectedRowKeys: selectedRowIds,
              onChange: handleSelectRowId,
            }}
          />
        </div>
      </BodyContentInner>

      <Modal
        title="Xác nhận xóa sản phẩm"
        open={showDeleteModal}
        onOk={handleDeleteProduct}
        onCancel={handleCloseDeleteModal}
        okText="Xác nhận"
        cancelText="Đóng"
        centered
        width={400}
      ></Modal>

      <Modal
        title="Xác nhận thay đổi hiển thị của sản phẩm"
        open={showChangeDisplayModal}
        onOk={handleChangeDisplayProduct}
        onCancel={handleCloseChangeDisplayModal}
        okText="Xác nhận"
        cancelText="Đóng"
        centered
        width={400}
      ></Modal>
    </>
  );
};

export default ProductList;

const mockDataProductList = [
  {
    key: '123',
    id: '123',
    imgUrl: '',
    name: 'Hợp Trí Super Humic gói 1 kg',
    productCodeDetail: 'HT100001-001',
    productCodeGeneral: 'HT100001-001',
    categoryName: 'danh mục 1',
    unit: 'Gói',
    boxSpecification: '20 gói',
    productType: 1,
    status: 1,
    isDisplayOnApp: true,
    createdTime: '2024-07-16T07:28:52.024Z',
  },
  {
    key: '456',
    id: '456',
    imgUrl: '',
    name: 'Hợp Trí Humic Zn Mn 6-4',
    productCodeDetail: 'HT100002-002',
    productCodeGeneral: 'HT100002',
    categoryName: 'danh mục 1',
    unit: 'Chai',
    boxSpecification: '20 chai',
    productType: 0,
    status: 1,
    isDisplayOnApp: true,
    createdTime: '2024-07-16T07:28:52.024Z',
  },
  {
    key: '789',
    id: '789',
    imgUrl: '',
    name: 'Hợp Trí Humic Zn Mn 6-4 dasdadadada dasdadadada ',
    productCodeDetail: 'HT100002-002',
    productCodeGeneral: 'HT100002',
    categoryName: 'danh mục 1',
    unit: 'Chai',
    boxSpecification: '20 chai',
    productType: 1,
    status: 0,
    isDisplayOnApp: false,
    createdTime: '2024-07-16T07:28:52.024Z',
  },
];
