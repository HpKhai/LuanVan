import { Button, message, Space } from 'antd';

const success = (mes = 'Success') => {
  message.success(mes);
};

const error =( mes = 'Err') => {
  message.error(mes);
};

export {success, error}