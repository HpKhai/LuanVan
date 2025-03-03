import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {WrapperButtonMore, WrapperProducts, WrapperTypeProduct} from './style'
import SliderComponent from "../../components/SilederComponent/SliderComponent";
import Baner1 from "../../assets/images/Baner1.png"
import Baner2 from "../../assets/images/Baner2.png"
import Baner3 from "../../assets/images/Baner3.png"
import CardComponent from "../../components/CardComponent/CardComponent";
// import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Color } from "antd/es/color-picker";
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../service/ProductService'

const HomePage  = () => {

    const arr = ['Thuốc Trừ Sâu' , 'Thuốc BVTV', 'Thuốc Xịt Lá', 'Phân bón','Men Vi Sinh','Thuốc Ốc']
    const fetchProductAll = async () => {
        const res = await ProductService.getAllProduct() 
        return res
    }
    const { data:products } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProductAll
    })
    return (    
        <>
        <div style ={{ padding: '0 120px'}}>
            <WrapperTypeProduct>
            {arr.map((item)=> {
                return (
                   <TypeProduct name={item} key={item} />  
                )
            })}
         </WrapperTypeProduct>
         </div>

         <div className='body' style={{ width:'100%',backgroundColor:'#e7dee2'}}>
            <div id="container" style={{ height:'1000px',width:'1100px',margin:'0 auto' }}>
       <SliderComponent arrImages={[Baner1,Baner2,Baner3]}/>
       <WrapperProducts>
        {products?.data?.map((product) => {
            return(
                <CardComponent 
                key={product._id}
                countInStock={product.countInStock}
                description={product.description}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
                />
            )
        })}
       </WrapperProducts>
       <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10px'}}>
        <WrapperButtonMore textButton ="Xem Thêm" type="outline" styleButton= {{
        border: '1px solid rgb(11,116,229)',
        Color: 'rgb(11,116,229)',
        width:'240px', height:'38px', borderRadius:'4px'}}
        styleTextButton = {{ fontWeight: 500}}/>
       </div>
    </div>
    </div>
        </>
    )
}
export default HomePage