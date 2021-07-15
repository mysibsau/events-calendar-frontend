import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import CalendarPage from "./components/CalendarPage/CalendarPage";

function App() {
  return (
    <Router>
      {localStorage.getItem('token') !== null ? 
      <Switch>
        <Route path={'/'}>
          <CalendarPage />
        </Route>
      </Switch> : 
      <Switch>
        <Route path={'/'}>
          <LoginPage />
        </Route>
        </Switch>}
    </Router>
  );
}

export default App;
