import React, { useEffect, useState } from 'react';
import moment from 'moment';
// 公共方法

// 保存user
export const saveUser = (user) => {
  localStorage.setItem('user_key', JSON.stringify(user))
}

// 获取user
export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user_key'));
  return user;
}

// 删除user
export const delUser = () => {
  localStorage.removeItem('user_key')
}

// 获取时间
export const useDate = () => {
  const dataFormat = 'YYYY-MM-DD HH:mm:ss';
  const [currentTime, setCurrentTime] = useState(moment().format(dataFormat));

  useEffect(() => {
    const timeCount = () => {
      const timer = setTimeout(() => {
        setCurrentTime(moment().format(dataFormat));
        clearTimeout(timer);
        timeCount();
      }, 1000)
    }
    timeCount();
  }, [])
  return currentTime;
}

