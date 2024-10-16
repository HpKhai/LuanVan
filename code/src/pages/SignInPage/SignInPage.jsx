import React, { useEffect } from 'react'
import { WrapperContainerLeft, WrapperContainerRight,WrapperTextLight } from './style'
import InputForm from '../../InputForm/InputForm'
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent"
import imageLogo from "../../assets/images/4.jpg"
import {Image} from "antd"
import {EyeFilled, EyeInvisibleFilled} from '@ant-design/icons'
import {useState} from 'react'
import { useNavigate } from "react-router";
// import { useMutation } from '@tanstack/react-query';
import * as UserService from '../../service/UserService'
import {useMutationHooks} from '../../hooks/useMutationHooks'
import Loading from '../../components/LoadingComponent/Loading'
import * as Message from '../../components/Message/Message'
import { jwtDecode } from "jwt-decode"
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'



const SignInPage = () => {

  const navigate = useNavigate()
    const handleNavigateSignUp = () => {
        navigate('/sign-up')
    }


  const [name, setName] = useState ('')
  const [password, setPassword] = useState ('')
  const usedispatch = useDispatch()

  const handleOnchangeName = (value) => {
    setName(value)
  }
  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const [isShowPassword,setIsShowPassword] = useState (false)

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
 
  const { data, isLoading, isSuccess } = mutation

  const handleSignIn = () => {
    mutation.mutate({
      name,
      password
    })
  }

  useEffect(() => {
    if (isSuccess){
      navigate('/')
      localStorage.setItem('access_token', JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decoded = jwtDecode(data?.access_token)
        console.log('decoded', decoded)
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, data?.access_token)
        }
      }
    }
  },[isSuccess])

  const handleGetDetailsUser = async (id, token) =>{
    const res = await UserService.getDetailsUser(id, token)
    usedispatch(updateUser({ ...res?.data, access_token: token}))
    console.log('res', res)
  }

  return (
    <div style={{ display:'flex', alignItems: 'center', justifyContent:'center', background: '#ccc',height:'100vh'}}>
       <div style={{ width:'800px', height:'445px', borderRadius:'6px', background:'#fff', display:'flex'}}>
      <WrapperContainerLeft>
        <h1>Xin Chào</h1>
        <p style={{fontSize:'15px'}}> Đăng Nhập hoặc Đăng Ký</p>
        <InputForm style={{ marginBottom:'10px'}} placeholder="Nhập Tài Khoản" value={name} onChange = {handleOnchangeName}/>
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
            <InputForm placeholder="password" type={isShowPassword ? "text" : "password"} 
            value={password} onChange = {handleOnchangePassword}/>
        </div>

        {data?.status === "ERR" && <span style={{color:"red"}}> {data?.message}</span>}

          {/* <Loading> */}
            <ButtonComponent
                 disabled = {!name.length ||!password.length}
                 onClick = {handleSignIn}
                 size ={20}
                 styleButton ={{
                   backgroundColor:'rgb(97 193 72)',
                   margin: '26px 0 10px',
                   width:'100%'
                 }}
                 styleTextButton ={{color: '#blue'}} 
                 textButton={'Đăng Nhập'}>
            </ButtonComponent> 
          {/* </Loading> */}
                <p><WrapperTextLight>Quên Mật Khẩu</WrapperTextLight></p>
                <p>Chưa có tài khoản <WrapperTextLight onClick={handleNavigateSignUp} style={{ cursor: "pointer"}}>Tạo tài khoản </WrapperTextLight></p>
      </WrapperContainerLeft>
      <WrapperContainerRight>
        <Image src={imageLogo} preview={false} alt='image-logo' height= "203px" width="203px"/>
        <h4>Cửa Hàng Nông Nghiêp</h4>
      </WrapperContainerRight>
    </div> 
    </div>
  
  )
}

export default SignInPage