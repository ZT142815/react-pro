import React, { useEffect, useReducer } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { AppCreateContext, reducer } from './context';

import Home from '../../pages/admin';
import Login from '../../pages/login';
import '../../assets/images/style.less';

const App = withRouter((props) => {

  const [state, dispatch] = useReducer(reducer, {
    username: _g.getUser() || '',
    selectTitle: ''
  })

  useEffect(() => {
    if (!_g.getUser() || _g.getUser() === '') {
      props.history.replace('/login')
    }
  }, []);

  return (
    <AppCreateContext.Provider value={{ state, dispatch }}>
      <Switch>
        <Route path='/login' component={Login} ></Route>
        <Route path='/' component={Home} ></Route>
      </Switch>
    </AppCreateContext.Provider>

  )
});

export default App;