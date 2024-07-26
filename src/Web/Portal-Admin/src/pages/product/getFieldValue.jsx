export const getFieldValueGeneralTab = (data) => {
  let initialValues = [
    {
      name: ['name'],
      value: data?.name || '',
    },
    {
      name: ['code'],
      value: data?.code || '',
    },
    {
      name: ['commonCode'],
      value: data?.commonCode || '',
    },
    {
      name: ['images'],
      value: data?.images || '',
    },
    {
      name: ['videoLink'],
      value: data?.videoLink || '',
    },
    {
      name: ['categoryId'],
      value: data?.categoryId,
    },
    {
      name: ['productType'],
      value: data?.productType,
    },
    {
      name: ['unitId'],
      value: data?.unitId,
    },
    {
      name: ['specificationsUnitId'],
      value: data?.specificationsUnitId,
    },
    {
      name: ['specificationsQuantity'],
      value: data?.specificationsQuantity,
    },
    {
      name: ['shelfLife'],
      value: data?.shelfLife,
    },
    {
      name: ['shelfLifeType'],
      value: data?.shelfLifeType,
    },
    {
      name: ['weight'],
      value: data?.weight,
    },
    {
      name: ['weightType'],
      value: data?.weightType,
    },
    {
      name: ['volume'],
      value: data?.volume,
    },
    {
      name: ['volumeType'],
      value: data?.volumeType,
    },
    {
      name: ['description'],
      value: data?.description,
    },
    {
      name: ['useDescription'],
      value: data?.useDescription,
    },
    {
      name: ['status'],
      value: data?.status,
    },
    {
      name: ['isDisplayOnApp'],
      value: data?.isDisplayOnApp,
    },
  ];

  return initialValues;
};
