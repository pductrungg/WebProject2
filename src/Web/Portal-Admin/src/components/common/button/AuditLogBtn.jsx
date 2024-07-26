import {Button} from 'antd';

const AuditLogBtn = ({className = '', text = 'Nhật ký hệ thống', hasIcon = true, ...props}) => {
  return (
    <Button type="default" className={`w-fit px-4 py-2 ${className}`} {...props}>
      {hasIcon ? (
        <span>
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </span>
      ) : (
        ''
      )}{' '}
      {text}
    </Button>
  );
};

export default AuditLogBtn;
