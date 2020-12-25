import './App.css';
import Nav from "./components/mainScreen";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Comics from "./components/comics";
import Media from "./components/allMedia";
import Books from "./components/books";
import Magazines from "./components/magazines";
import Movies from "./components/movies";
import Series from "./components/series";
import logo from "./img/logo.png";

function App() {
  return (
    <Router>
      <div className="main">
        <div className="Header">
          <img src={logo}></img>
          <h1>Media HUB</h1>
        </div>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Nav} />
            <Route path="/comics" exact component={Comics} />
            <Route path="/media" exact component={Media} />
            <Route path="/books" exact component={Books} />
            <Route path="/magazines" exact component={Magazines} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/series" exact component={Series} />
          </Switch>
        </div>
        <div className="Footer">
          <ul>
            <li>Azur Mujezinović</li>
            <li>Nikola Milovanović</li>
            <li>Emina Sokolović</li>
            <li>Nikola Šubarić</li>
          </ul>
        </div>
      </div>

    </Router>
  );
}

export default App;
