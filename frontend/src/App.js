import {Switch, Route, Redirect } from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {LoginPage} from './pages/LoginPage'
import {PanelPage} from './pages/PanelPage'

const ls=require("local-storage") 

function App() {
  return (
    <div className="app-div">
    <Switch>
    <Route exact path={["/","/home"]}>
        {ls('accessToken')? <HomePage></HomePage> :<Redirect to={'/login'}></Redirect>}
      </Route>     
      <Route exact path="/panel" component={PanelPage}></Route>
      <Route exact path="/login" component={LoginPage}></Route>
    </Switch>
    </div>
  );
}

export default App;
