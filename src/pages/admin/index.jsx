import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { AppCreateContext } from '../../containers/App/context';
import { Layout } from 'antd';
import './index.less';
import LeftNav from './components/leftNav';
import RightHeader from './components/rightHeader';
import AdminRouter from '../../containers/AdminRouter/AdminRouter';

const { Footer, Sider, Content } = Layout;

const Home = () => {
  const AppVaribleContext = useContext(AppCreateContext);
  return (
    <div className='home'>
      <Layout>
        <Sider className='left-nav' >
          <LeftNav></LeftNav>
        </Sider>
        <Layout>
          <header className='right-header'>
            <RightHeader />
          </header>
          <Content style={{ margin: '24px', backgroundColor: '#fff' }}>
            <AdminRouter></AdminRouter>
          </Content>
          <Footer className='right-footer'>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
        </Layout>
      </Layout>
    </div>
  )
};

export default Home;