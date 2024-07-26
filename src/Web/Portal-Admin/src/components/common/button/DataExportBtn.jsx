import {Button} from 'antd';

const DataExportBtn = ({className = '', text = 'Xuất dữ liệu', hasIcon = true, ...props}) => {
  return (
    <Button type="default" className={`w-fit px-4 py-2 ${className}`} {...props}>
      {hasIcon ? (
        <span>
          <i className="fa fa-sign-out" aria-hidden="true"></i>
        </span>
      ) : (
        ''
      )}{' '}
      {text}
    </Button>
  );
};

export default DataExportBtn;
