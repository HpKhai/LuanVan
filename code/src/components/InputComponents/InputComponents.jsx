import { Input } from 'antd'
import React from 'react'

const InputComponents  = (props) => {
const {
  size, placeholder, bordered, style,...rests
}= props
  return (
    <div>
        <Input 
        // size ={size} 
        placeholder={placeholder} 
        bordered={bordered} 
        style={style}
        {...rests}
        />
        </div>
  )
}

export default InputComponents