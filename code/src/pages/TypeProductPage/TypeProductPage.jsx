import React from 'react'
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import {  Col, Pagination, Row } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'


const TypeProductPage = () => {
  const onChange = () =>{}
  return (
    <div style={{ width: '100%', background: '#e7dee2'}}> 
       <div style={{ width:'1200px', padding: '0 120px', background: '#e7dee2'}}>
    <Row style={{  flexWrap:'nowrap', paddingTop:'10px'}}>
        <WrapperNavbar span={4} >
            <NavbarComponent /> 
        </WrapperNavbar>  
         <Col span={20}>
          <WrapperProducts>
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            <CardComponent />
            </WrapperProducts>
            <Pagination align="start" defaultCurrent={1} total={100} onChange={onChange} style={{ textAlign:'center', marginTop:'10px'}}/>
        </Col>
    </Row>
  </div> 
    </div>


  )
}

export default TypeProductPage