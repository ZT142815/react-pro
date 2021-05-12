import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AppCreateContext } from '../../../containers/App/context';
import { Modal } from 'antd';
const { confirm } = Modal;

const RightHeader = (props) => {
  const AppVaribleContext = useContext(AppCreateContext);

  const quitHandle = () => {
    confirm({
      title: '确定退出么？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        // 点击退出之后要清空localstortage 
        _g.delUser();
        location.reload()
      }
    })
  }


  return (
    <div className='right-header-container'>
      <div className='header-top'>
        <div className='quit-login' onClick={quitHandle}>退出</div>
        <div>{`欢迎，${AppVaribleContext.state.username}`}</div>
      </div>
      <div className='header-bottom'>
        <div className='bottom-title'>
          {AppVaribleContext.state.selectTitle}
        </div>
        <div className='bottom-time'>{_g.useDate()}</div>
      </div>
    </div>
  )
}

export default withRouter(RightHeader);