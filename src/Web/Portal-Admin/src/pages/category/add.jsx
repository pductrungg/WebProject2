import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useLocation, useNavigate, Link} from 'react-router-dom';
import {Button, Col, Row, Space} from 'antd';
// ---LAYOUT
import HeaderContentInner from 'components/layout/HeaderContentInner';
import BodyContentInner from 'components/layout/BodyContentInner';
import CustomSelection from './CustomSelection';
// import React from 'react';


const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [parCategory, setParCategory] = useState('');
    
    const handleSelectCategory = (option) => {
        setParCategory(option);
    };

    const options = [
        { label: 'Nông nghiệp', value: 'agriculture', subOptions: [
          { label: 'Dinh dưỡng cây trồng', value: 'plant_nutrition', subOptions: [
            { label: 'Phân bón lá', value: 'leaf_fertilizer' }
          ] },
          { label: 'Thuốc bảo vệ thực vật', value: 'plant_protection', subOptions: [
            { label: 'Thuốc trừ bệnh', value: 'disease_control' },
            { label: 'Thuốc trừ sâu', value: 'pest_control' }
          ] }
        ] },
        { label: 'Sức khỏe cộng đồng', value: 'public_health' },
        { label: 'Danh mục cấp 1', value: 'category_1', subOptions: [
          { label: 'Danh mục cấp 2', value: 'category_2', subOptions: [
            { label: 'Danh mục cấp 2', value: 'category_2_2', subOptions: [
              { label: 'Danh mục cấp 3', value: 'category_3' }
            ] }
          ] }
        ] }
      ];

    const handleSubmit = (event)=>{
        event.preventDefault();

        if(categoryName.trim() === ' '){
            alert('Tên danh mục không được để trống');
            return;
        }

        console.log('Success');
    }
    return(
        <>
            <HeaderContentInner className='flex justify-between items-center'>
                <h1>Thêm danh mục sản phẩm</h1>
            </HeaderContentInner>
            <BodyContentInner>
                    

                <form
                    onSubmit={handleSubmit}
                    >
                    <div
                        style={{
                            marginBottom:'17px',
                        }}
                    >
                        <label htmlFor="categoryName" style={{display:'block', marginBottom:'8px'}}>
                            <span style={{color:'red'}}>*</span> Tên danh mục sản phẩm
                        </label>
                        <input
                            id="categoryName"
                            style={{
                                width:'820px',
                                height:'32px',
                                padding:'8px 16px 7px 16px',
                                border:'1px solid #D2D2D2',
                                borderRadius:'5px',
                                boxSizing:'border-box',
                                }}
                            placeholder="Nhập tên danh mục sản phẩm"
                            type="textarena"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            required
                        />
                    </div>
                    <div
                        style={{
                            marginBottom:'17px',
                        }}
                    >
                        <label htmlFor="productCode" style={{display:'block', marginBottom:'8px'}}>
                            Mã danh mục sản phẩm đối tác
                        </label>
                        <input
                            id="categoryName"
                            style={{
                                width:'820px',
                                height:'32px',
                                padding:'8px 16px 7px 16px',
                                border:'1px solid #D2D2D2',
                                borderRadius:'5px',
                                boxSizing:'border-box',
                                }}
                            placeholder="Nhập mã danh mục sản phẩm"
                            type="textarena"
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                            // required
                        />
                    </div>
                    <div
                        style={{
                            marginBottom:'17px'
                        }}
                    >
                        <label style={{display:'block', marginBottom:'8px'}}>
                            Danh mục cha
                        </label>
                        <CustomSelection options={options} value={parCategory} onChange={handleSelectCategory} />
                        {/* <p>Selected Option: {setParCategory}</p> */}
                    </div>
                    <div
                        style={{
                            marginBottom:'17px',
                        }}
                    >
                        <label  style={{display:'block', marginBottom:'10px'}}>
                            Mô tả
                        </label>
                        <input
                            // id="categoryName"
                            style={{
                                width:'820px',
                                height:'95px',
                                padding:'6px 12px 6px 12px',
                                border:'1px solid #D2D2D2',
                                borderRadius:'5px',
                                boxSizing:'border-box',
                                }}
                            type="textarena"
                            // value={categoryName}
                            // onChange={(e) => setProductCode(e.target.value)}
                            // required
                        />
                    </div>
                </form>
                <div
                    style={{
                        display: 'flex',
                        gap: '16px', // Adjust the gap between buttons as needed
                        position: 'relative', // Ensure the buttons are positioned within the parent container
                        // top: '300px',
                        left: '990.4px',
                        // margin:'200px',
                        marginTop:'300px',
                    }}
                    >
                    <Link to={'/category'}>
                        <Button
                            type="primary"
                            style={{
                            width: '162px',
                            height: '32px',
                            borderRadius: '5px',
                            padding: '8px 16px 7px 16px',
                            backgroundColor:'#fff',
                            borderColor:'#000',
                            color:'#000'
                            }}
                        >
                            Quay lại
                        </Button>
                    </Link>
                    
                    <Button
                        type="primary"
                        style={{
                        width: '162px',
                        height: '32px',
                        borderRadius: '5px',
                        padding: '8px 16px 7px 16px'
                        }}
                    >
                        Lưu
                    </Button>
                </div>
            </BodyContentInner>

        </>
    );
};

export default AddCategory;
