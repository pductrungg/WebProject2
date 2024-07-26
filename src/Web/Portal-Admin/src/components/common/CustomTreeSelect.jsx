import {TreeSelect} from 'antd';
import {DownOutlined} from '@ant-design/icons';

const CustomTreeSelect = ({
  treeData = [],
  onChange = () => {},
  value = undefined,
  popupClassName = '',
  showSearch = true,
  placeholder = '',
  allowClear = true,
  treeDefaultExpandAll = true,
  labelSelected = [],
  customStyle = {},
  customDropdownStyle = {},
  ...props
}) => {
  return (
    <TreeSelect
      style={{
        width: '100%',
        ...customStyle,
      }}
      dropdownStyle={{
        maxHeight: 400,
        overflow: 'auto',
        ...customDropdownStyle,
      }}
      showSearch={showSearch}
      value={value}
      onChange={onChange}
      treeData={treeData}
      placeholder={placeholder}
      allowClear={allowClear}
      treeDefaultExpandAll={treeDefaultExpandAll}
      switcherIcon={<DownOutlined />}
      notFoundContent="Không có dữ liệu"
      popupClassName={`custom-tree-select ${popupClassName}`}
      treeTitleRender={(nodeData) => {
        if (nodeData?.label)
          return (
            <label className="flex items-center gap-2">
              <input
                className="accent-primary"
                type="radio"
                readOnly
                checked={nodeData?.value === value}
              />
              <span>{nodeData?.label}</span>
            </label>
          );
        return <span>{labelSelected?.join(' > ')}</span>;
      }}
      {...props}
    />
  );
};

export default CustomTreeSelect;
