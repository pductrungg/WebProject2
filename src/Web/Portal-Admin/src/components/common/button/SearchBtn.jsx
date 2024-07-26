import {Button} from 'antd';

const SearchBtn = ({className = '', text = 'Tìm', ...props}) => {
  return (
    <Button
      type="default"
      className={`w-fit px-4 py-2 border-primary text-primary hover:!border-primary-light-1 hover:!text-primary-light-1 ${className}`}
      {...props}
    >
      {text}
    </Button>
  );
};

export default SearchBtn;
