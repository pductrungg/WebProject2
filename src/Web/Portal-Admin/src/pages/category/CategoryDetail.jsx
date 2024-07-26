import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link, useParams} from 'react-router-dom';
import {Button, Col, Row, Space, Modal, Flex} from 'antd';
// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
// ---COMMON
import CustomSelect from 'components/common/CustomSelect';

const CategoryDetail = () => {
  return (
    <>
      <HeaderContentInner>
        <h1>Chi tiết danh mục sản phẩm</h1>
      </HeaderContentInner>
    </>
  );
};

export default CategoryDetail;
