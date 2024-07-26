// import React, { useState } from 'react';
import {useEffect, useState, useCallback, useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link, useParams} from 'react-router-dom';
import {Button, Col, Row, Space, Modal, Flex, message, Form, Input} from 'antd';
import TextArea from 'antd/es/input/TextArea';


// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
// ---COMMON
// import CustomSelect from 'components/common/CustomSelect';

import 'styles/choose_option.scss';
import CustomTreeSelect from 'components/common/CustomTreeSelect';
import {getArrayLabelByValueTreeSelect, getBase64, getPathTreeData} from 'helpers/commonHelper';

import {mockDataCategoryList} from './CategoryList';
// import {getArrayLabelByValueTreeSelect, getBase64, getPathTreeData} from 'helpers/commonHelper';



const EditCategory = () => {
  const params = useParams();
  const [form] = Form.useForm();
  const [formInfo, setFormInfo] = useState('');
  // const navigate = useNavigate();
  const [listCategory, setlistCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState([]);
  


  useEffect(() => {
    const getlistCategory = () => {
      setlistCategory(mockDataCategoryList);
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

    setFormInfo((prev) => ({
      ...prev,
      categoryID: val,
    }));
    setCategorySelected(label);
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

          >
              <Form.Item label="Tên danh mục sản phẩm"
                name="categoryName"
                required={[
                  {required: true, message:'Vui lòng nhập tên danh mục sản phẩm'},
                  // {
                  //   valida
                  // }
                ]}
              >
                  <Input name="categoryName" placeholder="Nhập tên danh mục sản phẩm"
                          className="responsive-input"  
                  ></Input>
              </Form.Item>

              <Form.Item label="Mã danh mục sản phẩm đối tác"
                name="categoryCode"
              >
                  <Input name="categoryCode" placeholder="Nhập mã danh mục sản phẩm"
                          className="responsive-input"  
                  ></Input>
              </Form.Item>

              <Form.Item label="Danh mục cha" name="categoryID">
                  <CustomTreeSelect
                      style={{
                        width:'820px'
                      }}
                      onChange={onSelected}
                      treeData={listCategory}
                      value={formInfo?.categoryID}
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
                            // value={description}
                            className="responsive-input"
                            // onChange={(e) => setDescription(e.target.value)}
                    />
              </Form.Item>

              {/* <Form.Item label="Hiển thị trên app">
                <Switch
                  // onChange={onChangeSwitch('isDisplayOnApp')}
                  // value={formData?.isDisplayOnApp || false}
                />
              </Form.Item> */}

              <Flex wrap gap="small" justify='end'>
                <Button
                  className="w-36"
                >
                  Quay lại
                </Button>
                <Button type="primary" className="w-36" htmlType="submit">
                  Lưu
                </Button>
              </Flex>
          </Form>
      </BodyContentInner>
      {/* <Form
        layout="vertical"
        form={form}
      >
          <Form.Item label="Tên danh mục sản phẩm"
                      name="categoryName"
                      rules={[
                        {
                          required: true,
                          message:'Nhập tên danh mục sản phẩm'
                        },
                      ]}
          >
            <Input name="categoryName" placeholder="Nhập tên danh mục sản phẩm">
            </Input>
          </Form.Item>
      </Form> */}
    </>
  );
};

export default EditCategory;


