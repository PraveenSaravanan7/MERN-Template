import {Switch, Route, Redirect } from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {LoginPage} from './pages/LoginPage'
import {UsersPage} from './pages/UsersPage'
import {ChatPage} from './pages/ChatPage'

const ls=require("local-storage") 

function App() {
  return (
    <div className="app-div">
    <Switch>
    <Route exact path={["/","/home"]}>
        {ls('accessToken')? <HomePage></HomePage> :<Redirect to={'/login'}></Redirect>}
      </Route>     
      <Route exact path="/login" component={LoginPage}></Route>
      <Route exact path="/users" component={UsersPage}></Route>
      <Route exact path="/chat" component={ChatPage}></Route>
    </Switch>
    </div>
  );
}

export default App;
