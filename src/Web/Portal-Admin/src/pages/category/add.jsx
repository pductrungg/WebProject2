import {Children, useEffect, useState} from 'react';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {Button, Col, Row, Space} from 'antd';
// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
import CustomSelection from './CustomSelection';
import 'styles/choose_option.scss';
import { HiOutlineChevronDown,HiOutlineChevronRight } from "react-icons/hi";




const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [isToogleOn, setToogleOn] = useState(false);
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState({ level1: '', level2: '', level3: '' });
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelect = (level, value) => {
        setSelectedCategory(prev => {
            const newState = { ...prev, [level]: value };
            if (level === 'level1') {
                newState.level2 = '';
                newState.level3 = '';
            } else if (level === 'level2') {
                newState.level3 = '';
            }
            return newState;
        });
        if(level === 'level3'){
            setShowDropdown(false);
        }
    };

    const getLabel = () => {
        const { level1, level2, level3 } = selectedCategory;
        if (level3) return option2.find(opt => opt.value === level1).children.find(opt => opt.value === level2).children.find(opt => opt.value === level3).label;
        if (level2) return option2.find(opt => opt.value === level1).children.find(opt => opt.value === level2).label;
        if (level1) return option2.find(opt => opt.value === level1).label;
        return 'Chọn danh mục cha';
    };


    const handleToggle = () => {
        setToogleOn(prevIson => !prevIson);
    }

    const option2 = [
        {
            label:'Nông nghiệp',
            value:'NongNghiep',
            children:[
                {
                    label:'Dinh dưỡng cây trồng', 
                    value:'DinhDuongCayTrong',
                    children:[
                        {
                            label:'Phân bón lá',
                            value:'PhanBonLa',
                        },
                    ],
                },
                {
                    label:'Thuốc bảo vệ thực vật',
                    value:'ThuocBaoVeThucVat',
                    children:[
                        {
                            label:'Thuốc trừ bệnh',
                            value:'ThuocTruBenh',
                        },
                        {
                            label:'Thuốc trừ sâu',
                            value:'ThuocTruSau',
                        },
                    ],
                },
            ],
        },
        {
            label:'Sức khỏe cộng đồng',
            value:'SucKhoeCongDong',
        },
        {
            label:'Danh mục cấp 1',
            value:'DanhMucCap1',
            children:[
                {
                    label:'Danh mục cấp 2', 
                    value:'DanhMucCap2',
                },
                {
                    label:'Danh mục cấp 2-2', 
                    value:'DanhMucCap2_2',
                },
                {
                    label:'Danh mục cấp 2-3',
                    value:'DanhMucCap2_3',
                    children:[
                        {
                            label:'Danh mục cấp 3',
                            value:'DanhMucCap3',
                        },
                        {
                            label:'Danh mục cấp 3-2',
                            value:'DanhMucCap3_2',
                        },
                    ],
                },
            ],
        },
    ];

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(categoryName.trim() === ' '){
            alert('Tên danh mục không được để trống');
            return;
        }

        const formData = {
            categoryName,
            productCode,
            selectedCategory,
            description,
          };

        console.log('Success',formData);
    };
    return(
        <>
            <HeaderContentInner className='flex justify-between items-center'>
                <h1>Thêm danh mục sản phẩm</h1>
            </HeaderContentInner>
            
            <form onSubmit={handleSubmit}>
                <BodyContentInner>
                        <div
                            style={{
                                marginBottom:'17px',
                            }}
                        >
                            <label htmlFor="categoryName" style={{display:'block', marginBottom:'8px'}}>
                                <span style={{color:'red'}}>*</span> Tên danh mục sản phẩm
                            </label>
                            <div className="input-container">
                            <input
                                className="responsive-input"
                                placeholder="Nhập tên danh mục sản phẩm"
                                type="textarena"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                                required
                            />
                            </div>
                        </div>

                        
                        <div
                            style={{
                                marginBottom:'17px',
                            }}
                        >
                            <label htmlFor="productCode" style={{display:'block', marginBottom:'8px'}}>
                                Mã danh mục sản phẩm đối tác
                            </label>
                            <div
                                className="input-container"
                            >
                            <input
                                id="productCode"
                                className="responsive-input"
                                placeholder="Nhập mã danh mục sản phẩm"
                                type="textarena"
                                value={productCode}
                                onChange={(e) => setProductCode(e.target.value)}
                                />
                            </div>
                        </div>

                        <div style={{ position: 'relative', display: 'inline-block', marginBottom:'16px'}}>
                            <label style={{display:'block', marginBottom:'8px'}}>
                                Chọn danh mục cha
                            </label>
                                <button 
                                    className="dropdown-select"
                                    style={{cursor: 'pointer' }} 
                                    type="button" 
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <span
                                        style={{
                                            display:'flex',
                                            justifyContent: 'space-between',
                                            // textAlign:'center'
                                            alignItems: 'center',
                                            width:'100%',
                                        }}
                                    >
                                        {getLabel()}
                                        <HiOutlineChevronDown />
                                    </span>
                                    {/* {getLabel()} */}
                                </button>
                                {showDropdown && (
                                    <div 
                                        // style={{ position: 'absolute', top: '100%', left: '0', backgroundColor: 'white', border: '1px solid #ccc', zIndex: 1 }}
                                        className="dropdown-choice"
                                    >
                                        {option2.map((level1) => (
                                            <div key={level1.value}>
                                                <label style={{ display: 'flex', padding: '4px', cursor: 'pointer', marginBottom:'4px'}}>
                                                    {level1.value === selectedCategory.level1 ? (
                                                        <HiOutlineChevronDown style={{ marginRight: '8px' }} />
                                                    ) : (
                                                        <HiOutlineChevronRight style={{ marginRight: '8px' }} />
                                                    )}
                                                    <input
                                                        type="radio"
                                                        name="level1"
                                                        value={level1.value}
                                                        checked={selectedCategory.level1 === level1.value}
                                                        onChange={() => handleSelect('level1', level1.value)}
                                                        style={{ marginRight: '8px',display:'none' }}
                                                    />
                                                    <span className="custom-radio"></span>
                                                    {level1.label}
                                                </label>
                                                {level1.value === selectedCategory.level1 && level1.children && (
                                                    <div style={{ paddingLeft: '20px'}}>
                                                        {level1.children.map((level2) => (
                                                            <div key={level2.value}>
                                                                <label style={{ display: 'flex', padding: '4px', cursor: 'pointer',marginBottom:'4px'}}>
                                                                {level2.value === selectedCategory.level2 ? (
                                                                    <HiOutlineChevronDown style={{ marginRight: '8px' }} />
                                                                ) : (
                                                                    <HiOutlineChevronRight style={{ marginRight: '8px' }} />
                                                                )}
                                                                    <input
                                                                        type="radio"
                                                                        name="level2"
                                                                        value={level2.value}
                                                                        checked={selectedCategory.level2 === level2.value}
                                                                        onChange={() => handleSelect('level2', level2.value)}
                                                                        style={{ marginRight: '8px',display:'none'}}
                                                                    />
                                                                    <span className="custom-radio"></span>
                                                                    {level2.label}
                                                                </label>
                                                                {level2.value === selectedCategory.level2 && level2.children && (
                                                                    <div style={{ paddingLeft: '40px' }}>
                                                                        {level2.children.map((level3) => (
                                                                            <label key={level3.value} style={{ display: 'flex', padding: '5px', cursor: 'pointer' }}>
                                                                                <input
                                                                                    type="radio"
                                                                                    name="level3"
                                                                                    value={level3.value}
                                                                                    checked={selectedCategory.level3 === level3.value}
                                                                                    onChange={() => handleSelect('level3', level3.value)}
                                                                                    style={{ marginRight: '10px', display:'none' }}
                                                                                />
                                                                                <span className="custom-radio"></span>
                                                                                {level3.label}
                                                                            </label>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                        </div>

                        {/* mô tả text */}
                        <div
                            style={{
                                marginBottom:'17px',
                            }}
                        >
                            <label  style={{display:'block', marginBottom:'10px'}}>
                                Mô tả
                            </label>
                            <div
                                className="input-container"
                            >
                                <textarea
                                    value={description}
                                    className="responsive-input"
                                    style={{
                                        height:'95px',
                                        resize:'vertical',
                                    }}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                    <div>
                        <label style={{display:'block',marginBottom:'10px'}}>
                            Hiển thị danh mục trên app
                        </label>
                        <div
                            onClick={handleToggle}
                            className={`toggleContainer ${isToogleOn ? 'on' : ''}`}                    
                            >
                            <div className={`toggleNob ${isToogleOn ? 'on' : 'off'}`}>
                            </div>
                        </div>
                    </div>
                    {/* <button type="submit">Submit</button> */}
                </BodyContentInner>


                <div className="absolute right-0 bottom-0 flex gap-2 p-4"
                    // style={{ marginRight: '20px', marginBottom: '1px' }}
                    
                    >
                    <Link to={'/category'}>
                        <Button
                            className="w-fit md:w-32"
                            style={{
                                backgroundColor:'#fff',
                                borderColor:'#000',
                                color:'#000'
                            }}
                            >
                            Quay lại
                        </Button>
                    </Link>
                        <Button
                            className="w-fit md:w-32"
                            type="submit"
                            >
                            Lưu
                        </Button>
                </div>
            </form>
        </>
    );
};

export default AddCategory;
                    



                            

            
            


