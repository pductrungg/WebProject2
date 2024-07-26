import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link, useParams} from 'react-router-dom';
import {Button, Col, Row, Space, Modal, Flex} from 'antd';
// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
// ---COMMON
import CustomSelect from 'components/common/CustomSelect';
// ---
import {PRODUCT_TYPE_OPTIONS, PRODUCT_STATUS_OPTIONS} from 'constants/application';

const ProductDetail = () => {
  return (
    <>
      <HeaderContentInner>
        <h1>Chi tiết sản phẩm</h1>
      </HeaderContentInner>
    </>
  );
};

export default ProductDetail;
