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
import ru from "date-fns/locale/ru";
import { RightsManager } from "./helpers/UserRightsContext";
import UsersPage from "./components/UsersPage/UsersPage";
import UnverifiedPage from "./components/UnverifiedPage/UnverifiedPage";

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

function App() {
  return (
    <MuiPickersUtilsProvider locale={ru} utils={DateFnsUtils}>
    <RightsManager>
    <ReferenceManager>
    <Router>
      {localStorage.getItem('token') !== null ? 
      <>
      <Header />
      <Switch>
        <Route path={'/unverified'} component={UnverifiedPage}/>
        <Route path={'/users'}>
          <UsersPage />
        </Route>
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
    </RightsManager>
    </MuiPickersUtilsProvider>
  );
}

export default App;
