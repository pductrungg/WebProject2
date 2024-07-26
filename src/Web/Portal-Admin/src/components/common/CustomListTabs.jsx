import {List} from 'antd';

const CustomListTabs = ({
  className = '',
  classNameItem = '',
  size = 'small',
  bordered = true,
  dataSource = [],
  onClickItem = () => {},
  selectedValue = '',
  disabled = false,
  ...props
}) => {
  return (
    <List
      className={` ${className}`}
      size={size}
      bordered={bordered}
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item
          onClick={() => {
            if (selectedValue === item?.value) return;
            onClickItem(item);
          }}
          className={`cursor-pointer  ${
            selectedValue === item?.value ? 'bg-primary-light-3' : 'hover:bg-primary-light-4'
          } ${classNameItem}`}
          disabled={disabled}
        >
          {item?.label}
        </List.Item>
      )}
      {...props}
    />
  );
};

export default CustomListTabs;
