import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from '../SignInPage/style'
import InputForm from '../../InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from "../../assets/images/4.jpg"
import {Image, message} from "antd"
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import {useState} from 'react'
import { useNavigate } from "react-router"
import * as UserService from '../../service/UserService'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import * as Message from '../../components/Message/Message'


const SignUpPage = () => {

  const navigate = useNavigate()
    const handleNavigateSignIn = () => {
        navigate('/sign-in')
    }
  const mutation = useMutationHooks(
    data => UserService.createUser(data)
  )  
  const handleSignUp = () => {
    mutation.mutate({
      name, email, phone, password, confirmPassword
   })
    console.log('mutation',mutation)
  }
  const { data, isLoading, isSuccess, isError, isError1} = mutation

  useEffect(() => {
    if (isError || isError1){
      message.error()
    }else if (isSuccess){
    message.success()
    handleNavigateSignIn()
    }
  },[isSuccess, isError])
 

  const [isShowPassword,setIsShowPassword] = useState (false)
  const [isShowConfirmPassword,setIsShowConfirmPassword] = useState (false)

  const [name, setName] = useState ('')
  const [email, setEmail] = useState ('')
  const [phone, setPhone] = useState ('')
  const [password, setPassword] = useState ('')
  const [confirmPassword, setConfirmPassword] = useState ('')
  
  const handleOnchangeName = (value) => {
    setName(value)
  }
  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }
  const handleOnchangePhone = (value) => {
    setPhone(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }



  return (
    <div style={{ display:'flex', alignItems: 'center', justifyContent:'center', background: '#ccc',height:'100vh'}}>
    <div style={{ width:'800px', height:'445px', borderRadius:'6px', background:'#fff', display:'flex'}}>
   <WrapperContainerLeft>
     <h1>Xin Chào</h1>
     <p style={{fontSize:'15px'}}> Đăng Nhập hoặc Đăng Ký</p>
     <InputForm style={{ marginBottom:'10px'}} placeholder="Tên Đăng Nhập" value={name} onChange = {handleOnchangeName}/>
     <InputForm placeholder="Địa Chi Email" style={{ marginBottom:'10px'}} value={email} onChange = {handleOnchangeEmail}/>
     <InputForm placeholder="Số Điện Thoại" style={{ marginBottom:'10px'}} value={phone} onChange = {handleOnchangePhone}/>
     <div style={{ position: 'relative'}}>
     <span
            onClick={() => setIsShowPassword (!isShowPassword)} 
            style={{
            zIndex: 10,
            position:'absolute',
            top: "4px",
            right: '8px'          
            }}
            >{
              isShowPassword ? (
                <EyeFilled />
              ) : (
                <EyeInvisibleFilled />
              )
            }
          </span>
            <InputForm placeholder="Nhập Mật Khẩu" type={isShowPassword ? "text" : "password"} 
            value={password} onChange = {handleOnchangePassword}/>
        </div>
     <div style={{ position: 'relative'}}>
          <span 
            onClick={() => setIsShowConfirmPassword (!isShowConfirmPassword)}
            style={{
            zIndex: 10,
            position:'absolute',
            top: "4px",
            right: '8px'          
            }}
            >{
              isShowConfirmPassword ? (
                <EyeFilled />
              ) : (
                <EyeInvisibleFilled />
              )
            }
          </span>
            <InputForm placeholder="Nhập Lại Mật Khẩu" type={isShowConfirmPassword ? "text" : "password"} 
            value={confirmPassword} onChange = {handleOnchangeConfirmPassword}/>
        </div>
    
      {data?.status === "ERR" && <span style={{color:"red"}}> {data?.message}</span>}  
      <ButtonComponent
        disabled = {!name.length || !email.length || !phone.length || !password.length || !confirmPassword.length }
        onClick = {handleSignUp}
        size ={40}
        styleButton ={{
          backgroundColor:'rgb(97 193 72)',
          margin: '26px 0 10px',
          width: '100%'
        }}
        styleTextButton ={{color: '#blue'}} 
        textButton={'Đăng Ký'}>
      </ButtonComponent>
             <p style={{fontSize:'15px'}}> Bạn đã có tài khoản <WrapperTextLight onClick={handleNavigateSignIn}>Đăng Nhập</WrapperTextLight></p>
   </WrapperContainerLeft>
   <WrapperContainerRight>
     <Image src={imageLogo} preview={false} alt='image-logo' height= "203px" width="203px"/>
     <h4>Cửa Hàng Nông Nghiêp</h4>
   </WrapperContainerRight>
 </div> 
 </div>
  )
}

export default SignUpPage