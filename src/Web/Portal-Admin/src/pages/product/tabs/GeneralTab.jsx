import {useEffect, useMemo, useState, useCallback} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, Col, Flex, Form, Input, InputNumber, Row, Switch, Modal} from 'antd';
// ---LAYOUT
import BodyContentInner from 'components/layout/BodyContentInner';
import HeaderContentInner from 'components/layout/HeaderContentInner';
// --- COMMON
import CustomEditor from 'components/common/CustomEditor';
import CustomSelect from 'components/common/CustomSelect';
import CustomTreeSelect from 'components/common/CustomTreeSelect';
import {InputImage, PreviewImage} from 'components/common/input/InputImage';
// ---
import {
  PRODUCT_SHELF_LIFE_TYPE_OPTIONS,
  PRODUCT_TYPE_OPTIONS,
  PRODUCT_VOLUME_TYPE_OPTIONS,
  PRODUCT_WEIGHT_TYPE_OPTIONS,
} from 'constants/application';
import {getArrayLabelByValueTreeSelect, getBase64, getPathTreeData} from 'helpers/commonHelper';
import {getFieldValueGeneralTab} from '../getFieldValue';
import {ProductStatus} from 'enums/product.status';

const GeneralTab = ({setHasGeneralInfo = () => {}}) => {
  const params = useParams();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    images: [],
  });

  const navigate = useNavigate();
  const [listCategoryData, setListCategoryData] = useState([]);
  const [labelSelectedCategory, setLabelSelectedCategory] = useState([]);
  const [listUnitData, setListUnitData] = useState([]);
  const [initEditorState, setInitEditorState] = useState({description: '', useDescription: ''});

  // confirm save product modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // useEffect(() => {
  //   console.log('params GeneralTab', params);
  // }, []);

  useEffect(() => {
    const getListCategoryData = () => {
      setListCategoryData(treeData);
    };

    const getListUnitData = () => {
      setListUnitData(mockDataListUnit);
    };

    const getDetailProductData = () => {
      if (params.id) {
        // setInitEditorState({...initEditorState, description: mockDescription});
      }
    };

    getListCategoryData();
    getListUnitData();
    getDetailProductData();
  }, []);

  // useEffect(() => {
  //   console.log('formData', formData);
  // }, [formData]);

  const onChangeTreeSelect = (newValue) => {
    let arrValue = getPathTreeData(listCategoryData)(newValue);
    let arrLabel = getArrayLabelByValueTreeSelect(arrValue, listCategoryData);

    setFormData((prev) => ({
      ...prev,
      categoryId: newValue,
    }));
    setLabelSelectedCategory(arrLabel);
  };

  const validateFields = useMemo(
    () => ({
      name: (_, value) => {
        if (value && /^ *$/.test(value)) {
          return Promise.reject(new Error('Vui lòng nhập tên sản phẩm'));
        }
        return Promise.resolve();
      },
      code: (_, value) => {
        if (value && /^ *$/.test(value)) {
          return Promise.reject(new Error('Vui lòng nhập mã sản phẩm'));
        }
        return Promise.resolve();
      },
      images: (_, value) => {
        if (typeof value === 'string') return Promise.resolve();
        if (value?.length > 0) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('Vui lòng chọn hình ảnh'));
      },
      specifications: ({getFieldValue}) => ({
        validator(_, value) {
          let valueUnit = getFieldValue('specificationsUnitId');
          let valueQuantity = getFieldValue('specificationsQuantity');
          if (!valueUnit || !valueQuantity) {
            return Promise.reject(new Error('Vui lòng nhập đầy đủ thông tin quy cách'));
          }
          return Promise.resolve();
        },
      }),
      shelfLifeConfig: ({getFieldValue}) => ({
        validator(_, value) {
          let valueShelfLife = getFieldValue('shelfLife');
          let valueShelfLifeType = getFieldValue('shelfLifeType');
          if (!valueShelfLife || (!valueShelfLifeType && valueShelfLifeType !== 0)) {
            return Promise.reject(new Error('Vui lòng nhập đầy đủ thông tin hạn sử dụng'));
          }
          return Promise.resolve();
        },
      }),
    }),
    []
  );

  const onChangeInput = (event) => {
    const {name, value} = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onChangeInputNumber = (name) => (value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = (formData) => {
    // console.log('handleSave values form', values);
    console.log('handleSave formData', formData);
    setHasGeneralInfo(true);
  };

  const handleUploadImage = (event, name) => {
    const {files: eventFiles} = event.target;
    for (let i = 0; i < eventFiles?.length; i++) {
      let file = eventFiles[i];
      getBase64(
        file,
        (url, file) => {
          setFormData((prev) => ({...prev, [name]: [...prev[name], url]}));
        },
        {
          allowType: ['image/jpeg', 'image/png', 'image/gif'],
          errorMessage: 'Vui lòng chọn file hình ảnh',
        }
      );
    }
  };

  const handleRemoveImage = (index) => {
    let cloneListImages = [...formData.images];
    cloneListImages.splice(index, 1);
    setFormData({...formData, images: cloneListImages});
  };

  const handleChangeSelect = (name) => (value) => {
    setFormData({...formData, [name]: value});
  };

  const handleEditorChange = useCallback(
    (name) => (content) => {
      setFormData((prev) => ({
        ...prev,
        [name]: content,
      }));
    },
    []
  );

  const onChangeSwitch = (name) => (value) => {
    switch (name) {
      case 'status': {
        setFormData({...formData, [name]: value ? ProductStatus.ACTIVE : ProductStatus.INACTIVE});
        break;
      }

      default:
        setFormData({...formData, [name]: value});
        break;
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmSaveData = () => {
    handleCloseConfirmModal();
    handleSave(formData);
  };

  // const [showConfirmModal, setShowConfirmModal] = useState(false);

  return (
    <div className="bg-white border border-gray-light-2">
      <HeaderContentInner>
        <h1>Thông tin chung</h1>
      </HeaderContentInner>
      <BodyContentInner>
        <Form
          layout="vertical"
          // onFinish={handleSave}
          onFinish={() => setShowConfirmModal(true)}
          form={form}
          fields={getFieldValueGeneralTab(formData)}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="name"
            rules={[
              {required: true, message: 'Vui lòng nhập tên sản phẩm'},
              {
                validator: validateFields.name,
              },
            ]}
          >
            <Input name="name" placeholder="Nhập tên sản phẩm" onChange={onChangeInput} />
          </Form.Item>
          <Form.Item
            label="Mã sản phẩm"
            name="code"
            rules={[
              {required: true, message: 'Vui lòng nhập mã sản phẩm'},
              {
                validator: validateFields.code,
              },
            ]}
          >
            <Input name="code" placeholder="Nhập mã sản phẩm" onChange={onChangeInput} />
          </Form.Item>
          <Form.Item label="Mã sản phẩm chung" name="commonCode">
            <Input
              name="commonCode"
              placeholder="Nhập mã sản phẩm chung"
              onChange={onChangeInput}
            />
          </Form.Item>
          <Form.Item
            label="Hình ảnh (tỉ lệ 1:1, min width = 80px)"
            name="images"
            rules={[
              {
                validator: validateFields.images,
              },
            ]}
          >
            <Flex wrap gap="middle" className="mt-2">
              {formData?.images?.map((imgSrc, index) => (
                <div key={index}>
                  <PreviewImage src={imgSrc} handleRemove={() => handleRemoveImage(index)} />
                </div>
              ))}
              <InputImage
                onChange={(e) => {
                  handleUploadImage(e, 'images');
                }}
                multiple="multiple"
              />
            </Flex>
          </Form.Item>
          <Form.Item label="Link video sản phẩm" name="videoLink">
            <Input
              name="videoLink"
              placeholder="Nhập link video sản phẩm"
              onChange={onChangeInput}
            />
          </Form.Item>
          <Form.Item
            label="Danh mục sản phẩm"
            name="categoryId"
            rules={[{required: true, message: 'Vui lòng chọn danh mục sản phẩm'}]}
          >
            <CustomTreeSelect
              treeData={listCategoryData}
              onChange={onChangeTreeSelect}
              value={formData?.categoryId}
              placeholder="Chọn danh mục sản phẩm"
              labelSelected={labelSelectedCategory}
            />
          </Form.Item>
          <Form.Item
            label="Loại sản phẩm"
            name="productType"
            rules={[{required: true, message: 'Vui lòng chọn loại sản phẩm'}]}
          >
            <CustomSelect
              allowClear
              showSearch={false}
              placeholder="Chọn loại sản phẩm"
              value={formData?.productType}
              onChange={handleChangeSelect('productType')}
              options={PRODUCT_TYPE_OPTIONS}
            />
          </Form.Item>
          <Form.Item
            label="Đơn vị cơ sở"
            name="unitId"
            rules={[{required: true, message: 'Vui lòng chọn đơn vị tính'}]}
          >
            <CustomSelect
              allowClear
              showSearch={false}
              placeholder="Chọn đơn vị tính"
              value={formData?.unitId}
              onChange={handleChangeSelect('unitId')}
              options={listUnitData}
            />
          </Form.Item>
          <Form.Item
            label="Quy cách"
            name="specifications"
            rules={[validateFields.specifications]}
            required
          >
            <Row className="border border-stroke">
              <Col xs={12}>
                <div className="bg-gray-light-4 px-4 py-2">Đơn vị quy đổi</div>
                <div className="px-4 py-2">
                  <CustomSelect
                    allowClear
                    showSearch={false}
                    placeholder="Chọn đơn vị quy đổi"
                    value={formData?.specificationsUnitId}
                    onChange={handleChangeSelect('specificationsUnitId')}
                    options={listUnitData}
                  />
                </div>
              </Col>
              <Col xs={12}>
                <div className="bg-gray-light-4 px-4 py-2">Số lượng</div>
                <div className="px-4 py-2">
                  <InputNumber
                    min={1}
                    value={formData?.specificationsQuantity}
                    name="specificationsQuantity"
                    placeholder="Nhập số lượng quy đổi"
                    className="w-full"
                    onChange={onChangeInputNumber('specificationsQuantity')}
                  />
                </div>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="Hạn sử dụng"
            name="shelfLifeConfig"
            rules={[validateFields.shelfLifeConfig]}
            required
          >
            <Row gutter={32}>
              <Col xs={12}>
                <InputNumber
                  min={1}
                  value={formData?.shelfLife}
                  name="shelfLife"
                  placeholder="Nhập giá trị"
                  className="w-full"
                  onChange={onChangeInputNumber('shelfLife')}
                />
              </Col>
              <Col xs={12}>
                <CustomSelect
                  allowClear
                  showSearch={false}
                  placeholder="Chọn đơn vị thời gian"
                  value={formData?.shelfLifeType}
                  onChange={handleChangeSelect('shelfLifeType')}
                  options={PRODUCT_SHELF_LIFE_TYPE_OPTIONS}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="Trọng lượng"
            name="weightConfig"
            // rules={[validateFields.weightConfig]}
          >
            <Row gutter={32}>
              <Col xs={12}>
                <InputNumber
                  min={1}
                  value={formData?.weight}
                  name="weight"
                  placeholder="Nhập giá trị"
                  className="w-full"
                  onChange={onChangeInputNumber('weight')}
                />
              </Col>
              <Col xs={12}>
                <CustomSelect
                  allowClear
                  showSearch={false}
                  placeholder="Chọn đơn vị tính"
                  value={formData?.weightType}
                  onChange={handleChangeSelect('weightType')}
                  options={PRODUCT_WEIGHT_TYPE_OPTIONS}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="Thể tích"
            name="volumeConfig"
            // rules={[validateFields.volumeConfig]}
          >
            <Row gutter={32}>
              <Col xs={12}>
                <InputNumber
                  min={1}
                  value={formData?.volume}
                  name="volume"
                  placeholder="Nhập giá trị"
                  className="w-full"
                  onChange={onChangeInputNumber('volume')}
                />
              </Col>
              <Col xs={12}>
                <CustomSelect
                  allowClear
                  showSearch={false}
                  placeholder="Chọn đơn vị tính"
                  value={formData?.volumeType}
                  onChange={handleChangeSelect('volumeType')}
                  options={PRODUCT_VOLUME_TYPE_OPTIONS}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="Mô tả sản phẩm" name="description">
            <CustomEditor
              initEditorState={initEditorState?.description}
              callback={handleEditorChange('description')}
            />
          </Form.Item>
          <Form.Item label="Hướng dẫn sử dụng" name="useDescription">
            <CustomEditor
              initEditorState={initEditorState?.useDescription}
              callback={handleEditorChange('useDescription')}
            />
          </Form.Item>
          <Form.Item label="Trạng thái hoạt động" name="status">
            <Switch
              onChange={onChangeSwitch('status')}
              value={formData?.status === ProductStatus.ACTIVE || false}
            />
          </Form.Item>
          <Form.Item label="Hiển thị trên app" name="isDisplayOnApp">
            <Switch
              onChange={onChangeSwitch('isDisplayOnApp')}
              value={formData?.isDisplayOnApp || false}
            />
          </Form.Item>

          <Flex wrap gap="small" justify="end">
            <Button
              className="w-36"
              onClick={() => {
                navigate(-1);
              }}
            >
              Quay lại
            </Button>
            <Button type="primary" className="w-36" htmlType="submit">
              Lưu
            </Button>
          </Flex>
        </Form>
      </BodyContentInner>
      <Modal
        title="Xác nhận lưu dữ liệu"
        open={showConfirmModal}
        onOk={handleConfirmSaveData}
        onCancel={handleCloseConfirmModal}
        okText="Xác nhận"
        cancelText="Đóng"
        centered
        width={400}
      ></Modal>
    </div>
  );
};

export default GeneralTab;

const mockDataForm = {
  // name: 'test',
  // code: '123',
  // commonCode: '123141231',
  // isTest: true,
};

const treeData = [
  {
    value: 'parent 1-value',
    label: 'parent 1',
    children: [
      {
        value: 'parent 1-0-value',
        label: 'parent 1-0',
        children: [
          {
            value: 'leaf1-value',
            label: 'leaf1',
          },
          {
            value: 'leaf2-value',
            label: 'leaf2',
          },
          {
            value: 'leaf3-value',
            label: 'leaf3',
          },
        ],
      },
      {
        value: 'parent 1-1-value',
        label: 'parent 1-1',
        children: [
          {
            value: 'leaf11-value',
            label: 'leaf11',
          },
        ],
      },
    ],
  },
];

const mockDataListUnit = [
  {
    label: 'kg',
    value: 'asdasda',
  },
  {
    label: 'cái',
    value: 'dadasd11',
  },
  {
    label: 'hộp',
    value: 'faasd343',
  },
];

const mockDescription =
  '<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias, labore.</p>\n';
