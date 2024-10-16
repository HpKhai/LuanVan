import { Col, Row ,Image, InputNumber} from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/1.webp'
// import imageProductSmall from '../../assets/images/2.webp'
import { WrapperAddressProduct, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleNameProduct, WrapperStyleText } from './style'
import {StarFilled} from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'


const ProductDetailsComponent = () => {
  const onChange = () => { }
  return (
    <Row style={{backgroundColor:'#fff',borderRadius:'8px',padding:'15px'}}>
        <Col span ={10} style={{borderRight:'1px solid #aaa',paddingRight:'8px'}}>
            <Image src= {imageProduct} alt="image product" preview ="false"/>
            {/* <div>
                <Image src= {imageProductSmall} alt="image small" preview ="false"/>
                <Image src= {imageProductSmall} alt="image small" preview ="false"/>
                <Image src= {imageProductSmall} alt="image small" preview ="false"/>
                <Image src= {imageProductSmall} alt="image small" preview ="false"/>
            </div> */}
        </Col>

        <Col span ={14} style={{ paddingLeft:'10px'}}> 
        <WrapperStyleNameProduct>Thuốc trừ sâu sinh học NeemNim - Chai 100ml</WrapperStyleNameProduct>
        <div>
                  <StarFilled style={{ fontSize: '10px', color:'yellow'}} />
        <StarFilled style={{ fontSize: '10px', color:'yellow'}} />
        <StarFilled style={{ fontSize: '10px', color:'yellow'}} />
        <WrapperStyleText> | Đã bán 99+</WrapperStyleText>
        </div>
              <WrapperPriceProduct>
                <WrapperPriceTextProduct>200000</WrapperPriceTextProduct>
              </WrapperPriceProduct>
              <WrapperAddressProduct>
                <span>Địa chỉ: </span>
                <span className='address'>O Môn Cần Thơ</span> -
                <span className='change-address'>Đổi Địa chỉ</span>
              </WrapperAddressProduct>
              <div style={{ margin:'5px 0 15px', borderTop:'1px solid #aaa',borderBottom:'1px solid #aaa',padding:'10px 0'}}>
                  <WrapperQualityProduct>
                    <div style={{marginBottom:'10px'}}>Số Lượng: <InputNumber  defaultValue={3} onChange={onChange}  /></div>
                  </WrapperQualityProduct>
              </div>
              
              <div style={{display:'flex',alignItems: 'center',gap:'30px'}}>
                <ButtonComponent
                  size ={20}
                  style ={{
                    backgroundColor:'rgb(97 193 72)'
                  }}
                  styleTextButton ={{color: '#blue'}} 
                  textButton={'Chọn Mua'}>
                </ButtonComponent> 

                <ButtonComponent 
                  size ={20}
                  style ={{
                    backgroundColor:'rgb(97 193 72)'
                  }}
                  styleTextButton ={{color: '#blue'}} 
                  textButton={'Mua Trả Góp'}>
                </ButtonComponent> 
              </div>
        </Col>
    </Row>
  )
}

export default ProductDetailsComponent