import React, {useState} from 'react';
// import { render } from 'react-dom';
import 'styles/choose_option.scss';

const CustomSelection = ({ options, value, onChange }) => {
    const [openOptions, setOpenOptions] = useState(false);
    const [expandedPaths, setExpandedPaths] = useState([]);
  
    const handleToggle = (path) => {
      setExpandedPaths((prev) =>
        prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
      );
    };
  
    const handleOptionClick = (option) => {
      if (option.subOptions) {
        handleToggle(option.path);
      } else {
        onChange(option.value);
        setOpenOptions(false);
      }
    };
  
    const renderOptions = (options, path = '') => {
      return options.map((option, index) => {
        const optionPath = path ? `${path}-${index}` : `${index}`;
        const isOpen = expandedPaths.includes(optionPath);
        return (
          <div key={optionPath} className="option-container">
            <div className="option" onClick={() => handleOptionClick({ ...option, path: optionPath })}>
              {option.subOptions && (
                <span className="arrow">{isOpen ? '▾' : '▸'}</span>
              )}
              <input
                type="radio"
                name="dropdown-option"
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                onClick={(e) => e.stopPropagation()}
              />
              {option.label}
            </div>
            {isOpen && option.subOptions && (
              <div className="sub-options">
                {renderOptions(option.subOptions, optionPath)}
              </div>
            )}
          </div>
        );
      });
    };
  
    return (
      <div className="hierarchical-dropdown">
        <div className="select-box" onClick={() => setOpenOptions(!openOptions)}>
          {value || 'Chọn danh mục cha'}
          <span className="arrow">{openOptions ? '▾' : '▸'}</span>
        </div>
        {openOptions && (
          <div className="options-container show">
            {renderOptions(options)}
          </div>
        )}
      </div>
    );
  };
  
  export default CustomSelection;