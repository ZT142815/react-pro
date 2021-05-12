import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import CommodityHome from './component/commodityHome';
import CommodityDetail from './component/commodityDetail';
import CommodityAdd from './component/commodityAdd';
import './index.less'

const Commodity = () => {
	return (
		<Switch>
			<Route path='/product' component={CommodityHome} exact></Route>
			<Route path='/product/addupdate' component={CommodityAdd}></Route>
			<Route path='/product/detail' component={CommodityDetail}></Route>
		</Switch>
	);
};

export default withRouter(Commodity);
