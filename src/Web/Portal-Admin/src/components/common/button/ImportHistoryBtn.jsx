import {Button} from 'antd';

const ImportHistoryBtn = ({
  className = '',
  text = 'Lịch sử nhập dữ liệu',
  hasIcon = true,
  ...props
}) => {
  return (
    <Button type="default" className={`w-fit px-4 py-2 ${className}`} {...props}>
      {hasIcon ? (
        <span>
          <i className="fa fa-clock-o" aria-hidden="true"></i>
        </span>
      ) : (
        ''
      )}{' '}
      {text}
    </Button>
  );
};

export default ImportHistoryBtn;
