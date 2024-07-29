import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import BookList from './components/BookList';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import './styles/global.css'; // Importar los estilos globales
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={AddBook} />
            <Route path="/edit/:id" component={EditBook} />
            <Route path="/books" component={BookList} />
            <Route path="/cart" component={Cart} />
            <Route path="/product/:id" component={ProductPage} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
