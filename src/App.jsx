import {
  HashRouter as Router,
  Route,
  Switch,
  // eslint-disable-next-line
  Redirect,
} from 'react-router-dom';

import './assets/scss/styles.scss';
import { AppFooter } from './components/AppFooter';
import { AppHeader } from './components/AppHeader';
import { TaskApp } from './views/TaskApp';
import { TaskEdit } from './views/TaskEdit';
import { HomePage } from './views/HomePage';
import { TaskDetails } from './views/TaskDetails';

export function App() {
  return (
    <Router>
      <AppHeader />
      <main className="app-container">
        <Switch>
          <Route path="/task/edit/:id?" component={TaskEdit} />
          <Route path="/task/:id" component={TaskDetails} />
          <Route path="/task" component={TaskApp} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
      <AppFooter />
    </Router>
  );
}

export default App;
