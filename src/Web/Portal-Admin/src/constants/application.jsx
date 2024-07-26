import {ProductStatus} from 'enums/product.status';
import {ProductType} from 'enums/product.type';
import {ProductShelfLifeType} from 'enums/productShelfLife.type';
import {ProductWeightType} from 'enums/productWeight.type';
import {ProductVolumeType} from 'enums/productVolume.type';

export const CODE_KEY = {
  BAD_REQUEST: 400,
  UNAUTHORIZED_STATUS: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  ERROR_NETWORK: 'ERROR_NETWORK',
  TIME_OUT: 408,
  NOT_INTERNET: 'NOT_INTERNET',
  UNDEFINED: 'UNDEFINED',
  UNKNOWN: 'UNKNOWN',
};

export const API_METHOD = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const STORAGE_KEY = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
};

export const PRODUCT_TYPE_OPTIONS = [
  {
    label: 'Bán thành phẩm',
    value: ProductType.SEMIFINISHED,
  },
  {
    label: 'Thành phẩm',
    value: ProductType.FINISHED,
  },
];

export const PRODUCT_STATUS_OPTIONS = [
  {
    label: 'Ngưng hoạt động',
    value: ProductStatus.INACTIVE,
  },
  {
    label: 'Hoạt động',
    value: ProductStatus.ACTIVE,
  },
];

export const PRODUCT_TAB_KEYS = {
  GENERAL: 'GENERAL',
  PRICE: 'PRICE',
  POINT: 'POINT',
  OTHER_INFO: 'OTHER_INFO',
};

export const PRODUCT_TAB_ITEMS = [
  {
    label: 'Thông tin chung',
    value: PRODUCT_TAB_KEYS.GENERAL,
  },
  {
    label: 'Giá sản phẩm',
    value: PRODUCT_TAB_KEYS.PRICE,
  },
  {
    label: 'Điểm tích luỹ',
    value: PRODUCT_TAB_KEYS.POINT,
  },
  {
    label: 'Thông tin khác',
    value: PRODUCT_TAB_KEYS.OTHER_INFO,
  },
];

export const PRODUCT_SHELF_LIFE_TYPE_OPTIONS = [
  {
    label: 'Ngày',
    value: ProductShelfLifeType.DAY,
  },
  {
    label: 'Tháng',
    value: ProductShelfLifeType.MONTH,
  },
  {
    label: 'Năm',
    value: ProductShelfLifeType.YEAR,
  },
];

export const PRODUCT_WEIGHT_TYPE_OPTIONS = [
  {
    label: 'g',
    value: ProductWeightType.g,
  },
  {
    label: 'kg',
    value: ProductWeightType.kg,
  },
];

export const PRODUCT_VOLUME_TYPE_OPTIONS = [
  {
    label: 'ml',
    value: ProductVolumeType.ml,
  },
  {
    label: 'l',
    value: ProductVolumeType.l,
  },
];
