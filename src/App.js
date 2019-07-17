import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuider/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path='/orders' component={Orders} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
