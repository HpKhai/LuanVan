import { Badge, Col, Popover } from "antd"
import React from "react"
import {useState} from 'react'
import {useEffect} from 'react'

import { WrapperHeader , WrapperTextHeader,WrapperHeaderAccount,WrapperTextHeaderSmall, WrapperContentPopup} from "./Style"
// import Search from "antd/es/transfer/search"
import {UserOutlined,
        CaretDownOutlined,
        ShoppingCartOutlined} from '@ant-design/icons'
import ButtonSearch from '../ButtonSearch/ButtonSearch'
import { useNavigate } from "react-router"
import * as UserService from '../../service/UserService'
import { useDispatch, useSelector } from "react-redux"
import { resetUser } from '../../redux/slides/userSlide'





const HeaderComponent = ({isHiddenSearch=false, isHiddenCart=false}) => {
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const navigate = useNavigate()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }
    const handleNavigateHome = () =>{
        navigate('/')
    }
    

    
    useEffect(()=>{
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
    },[user?.name, user?.avatar])
    
    const handleLogout = async () => {
        await UserService.logoutUser
        dispatch(resetUser())
    }
    
    const content = (
        <div>
          <WrapperContentPopup onClick={handleLogout}>Đăng xuất</WrapperContentPopup>
          <WrapperContentPopup onClick = {()=>navigate('/profile-user')}>Thông tin người dùng</WrapperContentPopup>
          { user?.isAdmin && (
              <WrapperContentPopup onClick = {()=>navigate('/system/admin')}>Quản lý hệ thống</WrapperContentPopup>
          )}

        </div>
    )

    return (
        <div >
            <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset'}}>
                <Col span={6}>
                <WrapperTextHeader onClick={handleNavigateHome} style={{fontSize: '20px', textAlign: 'center'}}>
                    CỬA HÀNG THUỐC SÂU
                </WrapperTextHeader> 
                </Col>
                {!isHiddenSearch &&(
                <Col span={12} >
                <ButtonSearch 
                    // size ="large"
                    textButton ="Tìm Kiếm"
                    // bordered ={false}
                    placeholder="input search text"
                />
                </Col>   
                )}
                <Col span ={6} style={{display:'flex', gap:'20px',alignItems : 'center'}}>
                <WrapperHeaderAccount >
                    {userAvatar ? (
                        <img src={userAvatar} alt="avatar"
                        style={{
                            height:'30px',
                            width:'30x',
                            borderRadius: '50%',
                            objectFit:'cover'
                        }} />
                    ) : (

                    <UserOutlined style={{fontSize: '30px'}}/> 
                    )}

                    {user?.name ? (
                    <>
                        <Popover content={content} trigger="click">
                        <div style={{color:'black'}}>{userName}</div>
                        </Popover>
                    </>
                    ) : (
                    <div onClick={handleNavigateLogin} style={{ cursor: "pointer"}}>
                        <WrapperTextHeaderSmall style={{fontSize:'15px'}}> Đăng Nhập/Đăng Ký</WrapperTextHeaderSmall>
                        <div>
                        <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                        <CaretDownOutlined />
                        </div>
                     </div>
                    )}
                
                </WrapperHeaderAccount>
                {!isHiddenCart && (
                <div>
                    <Badge count={1} size="small">
                        <ShoppingCartOutlined style={{fontSize: '30px', color: '#fff'}}/>
                     </Badge>
                        <WrapperTextHeaderSmall style={{fontSize: '15px', color: '#fff'}}>Giỏ Hàng</WrapperTextHeaderSmall>   
                </div>
                )}
                </Col>
            </WrapperHeader>
        </div>
    )
}
export default HeaderComponent