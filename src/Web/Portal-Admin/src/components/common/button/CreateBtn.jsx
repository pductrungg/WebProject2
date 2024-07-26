import {Button} from 'antd';

const CreateBtn = ({className = '', text = 'Tạo mới', hasIcon = true, ...props}) => {
  return (
    <Button type="primary" className={`w-fit px-4 py-2 ${className}`} {...props}>
      {hasIcon ? <span className="text-xl">+</span> : ''} {text}
    </Button>
  );
};

export default CreateBtn;
