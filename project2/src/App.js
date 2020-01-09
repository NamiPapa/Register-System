import React from 'react';
import SoldierList from './Components/SoldierList';
import SoldierCreate from './Components/SoldierCreate';
import SoldierEdit from './Components/SoldierEdit';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SoldierList} />
          <Route path='/create' component={SoldierCreate} />
          <Route path='/edit/:id' component={SoldierEdit} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
