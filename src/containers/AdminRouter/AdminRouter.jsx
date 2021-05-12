import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../../pages/home';
import Category from '../../pages/category';
import Commodity from '../../pages/commodity';
import User from '../../pages/user';
import Role from '../../pages/role';
import BarChart from '../../pages/echarts/barChart';
import LineChart from '../../pages/echarts/lineChart';
import PieChart from '../../pages/echarts/pieChart';

const AdminRouter = () => {
  return (
    <Switch>
      <Route path='/home' component={Home}></Route>
      <Route path='/category' component={Category}></Route>
      <Route path='/product' component={Commodity}></Route>
      <Route path='/user' component={User}></Route>
      <Route path='/role' component={Role}></Route>
      <Route path='/charts/bar' component={BarChart}></Route>
      <Route path='/charts/line' component={LineChart}></Route>
      <Route path='/charts/pie' component={PieChart}></Route>
      <Redirect from='/' to='/home'></Redirect>
    </Switch>
  )
}

export default AdminRouter;