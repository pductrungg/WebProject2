import {SearchOutlined} from '@ant-design/icons';
import {Input} from 'antd';

const SearchText = ({
  value = '',
  setValue = () => {},
  onPressEnter = () => {},
  customOnChange = null,
  className = '',
  placeholder = '',
  hasPrefix = true,
  ...props
}) => {
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Input
        value={value}
        onChange={customOnChange ? customOnChange : onChange}
        onPressEnter={onPressEnter}
        placeholder={placeholder}
        prefix={hasPrefix ? <SearchOutlined /> : null}
        {...props}
      />
    </>
  );
};

export default SearchText;
