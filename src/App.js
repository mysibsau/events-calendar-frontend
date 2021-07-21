import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import CalendarPage from "./components/CalendarPage/CalendarPage";
import EventPage from "./components/EventPage/EventPage";
import { ReferenceManager } from "./api/references";
import {CookiesProvider} from 'react-cookie';

function App() {
  return (
    // <RightsManager>
    <CookiesProvider>
    <ReferenceManager>
    <Router>
      {localStorage.getItem('token') !== null ? 
      <Switch>
        <Route path={'/event/:id'}>
          <EventPage />
        </Route>
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
    </ReferenceManager>
    </CookiesProvider>
    // </RightsManager>
  );
}

export default App;
