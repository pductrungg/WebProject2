// import React, { useState } from 'react';
import {useEffect, useState, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link, useParams} from 'react-router-dom';
import {Button, Col, Row, Space, Modal, Flex, message, Form, Input, Switch} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {toast} from 'react-toastify';

// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
// ---COMMON
// import CustomSelect from 'components/common/CustomSelect';

import 'styles/choose_option.scss';
import CustomTreeSelect from 'components/common/CustomTreeSelect';
import {getArrayLabelByValueTreeSelect, getPathTreeData} from 'helpers/commonHelper';


const CategoryList = [
  {
    key: '111111a',
    id: '111111a',
    name: 'Tên danh mục cấp 1',
    label: 'Tên danh mục cấp 1',
    value: 'Danhmuccap1-val',
    age: 60,
    address: 'New York No. 1 Lake Park',
    createdTime: '2024-07-16T07:28:52.024Z',
    children: [
      {
        key: '22222aaaaa',
        id: '22222aaaaa',
        name: 'Tên danh mục cấp 2',
        label: 'Tên danh mục cấp 2',
        value: 'Danhmuccap2-val',
        age: 42,
        address: 'New York No. 2 Lake Park',
        createdTime: '2024-07-16T07:28:52.024Z',
      },
      {
        key: '22222aaaaab',
        id: '22222aaaaab',
        name: 'Tên danh mục cấp 2',
        label: 'Tên danh mục cấp 2',
        value: 'Danhmuccap2-2-val',
        age: 30,
        address: 'New York No. 3 Lake Park',
        createdTime: '2024-07-16T07:28:52.024Z',
        children: [
          {
            key: '333333bbbba',
            id: '333333bbbba',
            name: 'Tên danh mục cấp 3',
            label: 'Tên danh mục cấp 3',
            value: 'Danhmuccap33-val',
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
        label: 'Tên danh mục cấp 2',
        value: 'Danhmuccap2-3-val',
        age: 72,
        address: 'London No. 1 Lake Park',
        createdTime: '2024-07-16T07:28:52.024Z',
        children: [
          {
            key: '333333ccccca',
            id: '333333ccccca',
            name: 'Tên danh mục cấp 3',
            label: 'Tên danh mục cấp 3',
            value: 'Danhmuccap3-2-val',
            age: 42,
            address: 'London No. 2 Lake Park',
            createdTime: '2024-07-16T07:28:52.024Z',
            children: [
              {
                key: '44444ccccca',
                id: '44444ccccca',
                name: 'Tên danh mục cấp 4',
                label: 'Tên danh mục cấp 4',
                value: 'Danhmuccap4-val',
                age: 25,
                address: 'London No. 3 Lake Park',
                createdTime: '2024-07-16T07:28:52.024Z',
              },
              {
                key: '44444cccccbbbb',
                id: '44444cccccbbbb',
                name: 'Tên danh mục cấp 4',
                label: 'Tên danh mục cấp 4',
                value: 'Danhmuccap4-1-val',
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
    label: 'Tên danh mục cấp 1',
    value: 'Danhmuccap1-2-val',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    createdTime: '2024-07-17T07:28:52.024Z',
  },
];


const EditCategory = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const [listCategory, setlistCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  useEffect(() => {
    const getlistCategory = () => {
      setlistCategory(CategoryList);
    };

    const getCategoryID = () => {
      if(params.id){

      }
    };

    getlistCategory();
    getCategoryID();
  }, []);

  const onSelected = (val) => {
    let value = getPathTreeData(listCategory)(val);
    let label = getArrayLabelByValueTreeSelect(value, listCategory);

    setFormData((prev) => ({
      ...prev,
      categoryID: val,
    }));
    setCategorySelected(label);
  };

  const onChangeInput = (e) => {
    const {name, val} = e.target;
    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSwitch = (name) => (val) => {
      switch(name){
        case 'status':{
          setFormData({...formData, [name]:val ? 1 : 0});
          break;
        }

        default:
          setFormData({...formData,[name]:val});
          break;
      }
  };

  const handleSaveForm = (formData) => {
    console.log('Success: ', formData );
    toast.success('Chỉnh sửa thành công', {
      autoClose: 2000,
      position:'top-center',
    });
    setTimeout(() => {
      navigate('/category');
  }, 2000);
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  const handleConfirm = () => {
    // handleClose();
    handleSaveForm(formData);
    setShowConfirmModal(false);
  };

  return (
    <>
      <HeaderContentInner>
        <h1>Chỉnh sửa danh mục sản phẩm</h1>
      </HeaderContentInner>

      <BodyContentInner>
          <Form
            layout='vertical'
            form={form}
            onFinish={() => setShowConfirmModal(true)}
          >
              <Form.Item label="Tên danh mục sản phẩm"
                name="categoryName"
                rules={[
                  {required: true, message: 'Vui lòng nhập tên danh mục sản phẩm'},
                ]}
              >
                  <Input name="categoryName" placeholder="Nhập tên danh mục sản phẩm"
                          className="responsive-input"  onChange={onChangeInput}
                  ></Input>
              </Form.Item>

              <Form.Item label="Mã danh mục sản phẩm đối tác"
                name="categoryCode"
              >
                  <Input name="categoryCode" placeholder="Nhập mã danh mục sản phẩm"
                          className="responsive-input"  onChange={onChangeInput}
                  ></Input>
              </Form.Item>

              <Form.Item label="Danh mục cha" name="categoryID">
                  <CustomTreeSelect
                      style={{
                        width:'820px'
                      }}
                      onChange={onSelected}
                      treeData={listCategory}
                      value={formData?.categoryID}
                      placeholder="Chọn danh mục cha"
                      labelSelected={categorySelected}
                  >

                  </CustomTreeSelect>
              </Form.Item>

              <Form.Item label="Mô tả" name="Description">
                    <TextArea
                            style={{
                              height:'95px',
                              resize:'vertical',
                            }}
                            className="responsive-input"
                    />
              </Form.Item>


              <Form.Item
                label="Hiển thị trên app"
                name="isDisplayed"
              >
                  <Switch 
                    value={formData?.isDisplay || false}
                    onChange={handleSwitch('isDisplay')}
                  >

                  </Switch>
              </Form.Item>

              <Flex wrap gap="small" justify='end'>
                <Link to={'/category'}>
                  <Button
                    className="w-36"
                  >
                    Quay lại
                  </Button>
                </Link>
                <Button type="primary" className="w-36" htmlType="submit">
                  Lưu
                </Button>
              </Flex>
          </Form>
      </BodyContentInner>

      <Modal
        title="Xác nhận chỉnh sửa"
        open={showConfirmModal}
        onOk={handleConfirm}
        onCancel={handleClose}
        okText="Xác nhận"
        cancelText="Đóng"
        centered
        width={400}
      ></Modal>

                
    </>
  );
};

export default EditCategory;




