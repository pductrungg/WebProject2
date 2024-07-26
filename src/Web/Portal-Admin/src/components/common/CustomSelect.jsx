import {Select} from 'antd';

const CustomSelect = ({className = '', maxTagCount = 2, ...props}) => {
  return (
    <Select
      className={`w-full  ${className}`}
      notFoundContent="Không có dữ liệu"
      tagRender={(props) => {
        return <span className="mr-1">{props.label},</span>;
      }}
      maxTagCount={maxTagCount}
      {...props}
    />
  );
};

export default CustomSelect;
