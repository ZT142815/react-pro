import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AppCreateContext, createContextAction } from '../../containers/App/context'
import './index.less';

const Login = (props) => {

  const AppVaribleContext = useContext(AppCreateContext);

  useEffect(() => {
    if (_g.getUser()) {
      props.history.push('/')
    }
  }, [])

  const onFinish = (values) => {
    const postData = {
      username: values.username,
      password: values.password,
    }
    // 调用接口
    httpUtil.external('reqLogin', postData).then((res) => {
      if (res.status === 0) {
        _g.saveUser(res.data.username)
        AppVaribleContext.dispatch(
          createContextAction({
            username: res.data.username
          })
        )
        message.success('登陆成功');
        props.history.replace('/');
      } else {
        message.error(res.msg);
      }
    })

  };

  return (
    <div className='login'>
      <div className='login-head'>
        <div className='login-logo g-learn-admin-logo'></div>
        <div className='login-title'>React项目：后台管理系统</div>
      </div>
      <div className='login-bottom'>
        <div className='login-content'>
          <h1 className='user-login'>用户登陆</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                () => ({
                  validator (_, value) {
                    if (!value) {
                      return Promise.reject(new Error('用户名不能为空'));
                    } else if (value.length < 4 || value.length > 12) {
                      return Promise.reject(new Error('用户名长度大于4小于12'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                () => ({
                  validator (_, value) {
                    if (!value) {
                      return Promise.reject(new Error('密码不能为空'));
                    } else if (value.length < 4 || value.length > 12) {
                      return Promise.reject(new Error('密码长度大于4小于12'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
};

export default withRouter(Login);