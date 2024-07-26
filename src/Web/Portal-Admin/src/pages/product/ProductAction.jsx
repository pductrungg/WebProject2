import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link, useParams} from 'react-router-dom';
import {Button, Col, Row, Space, Modal, Flex, List} from 'antd';
// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
// ---COMMON
import CustomSelect from 'components/common/CustomSelect';
import CustomListTabs from 'components/common/CustomListTabs';
// ---
import {
  PRODUCT_TYPE_OPTIONS,
  PRODUCT_STATUS_OPTIONS,
  PRODUCT_TAB_KEYS,
  PRODUCT_TAB_ITEMS,
} from 'constants/application';
import GeneralTab from './tabs/GeneralTab';
import PriceTab from './tabs/PriceTab';
import PointTab from './tabs/PointTab';
import OtherInfoTab from './tabs/OtherInfoTab';

const ProductAction = () => {
  const params = useParams();
  const collapsed = useSelector((state) => state.global.collapsed);
  const [selectedTab, setSelectedTab] = useState(PRODUCT_TAB_KEYS.GENERAL);
  const [hasGeneralInfo, setHasGeneralInfo] = useState(true);

  useEffect(() => {
    const getDetailProductData = () => {
      if (params.id) {
        // setInitEditorState({...initEditorState, description: mockDescription});
      }
    };

    getDetailProductData();
  }, []);

  const handleSelectedTab = (item) => {
    setSelectedTab(item.value);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case PRODUCT_TAB_KEYS.GENERAL:
        return <GeneralTab setHasGeneralInfo={setHasGeneralInfo} />;

      case PRODUCT_TAB_KEYS.PRICE:
        return <PriceTab />;

      case PRODUCT_TAB_KEYS.POINT:
        return <PointTab />;

      case PRODUCT_TAB_KEYS.OTHER_INFO:
        return <OtherInfoTab />;

      default:
        break;
    }
  };

  return (
    <>
      <HeaderContentInner>
        <h1>{params.id ? 'Chỉnh sửa sản phẩm' : 'Thêm mới sản phẩm'}</h1>
      </HeaderContentInner>
      <BodyContentInner>
        <Row>
          <Col xs={24} md={collapsed ? 6 : 24} xl={4}>
            <CustomListTabs
              dataSource={PRODUCT_TAB_ITEMS}
              onClickItem={handleSelectedTab}
              selectedValue={selectedTab}
              className="max-w-52 mx-auto"
              disabled={hasGeneralInfo}
            />
          </Col>
          <Col xs={24} md={collapsed ? 18 : 24} xl={20}>
            {renderTabContent()}
          </Col>
        </Row>
      </BodyContentInner>
    </>
  );
};

export default ProductAction;
