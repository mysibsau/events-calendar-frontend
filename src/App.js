import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import CalendarPage from "./components/CalendarPage/CalendarPage";
import EventPage from "./components/EventPage/EventPage";
import { ReferenceManager } from "./api/references";
import AddEventPage from "./components/AddEventPage/AddEventPage";
import Header from "./components/Header/Header";

function App() {
  return (
    // <RightsManager>
    <ReferenceManager>
    <Router>
      {localStorage.getItem('token') !== null ? 
      <>
      <Header />
      <Switch>
        
        <Route path={'/add-event/:date'}>
          <AddEventPage />
        </Route>
        <Route path={'/event/:id'}>
          <EventPage />
        </Route>
        <Route path={'/'}>
          <CalendarPage />
        </Route>
        <Redirect to="/" />
      </Switch></> : 
      <Switch>
        <Route path={'/'}>
          <LoginPage />
        </Route>
        <Redirect to="/" />
        </Switch>}
    </Router>
    </ReferenceManager>
    // </RightsManager>
  );
}

export default App;
