import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoriaList from './components/CategoriaList';
import CategoriaForm from './components/CategoriaForm';
import ProdutoList from './components/ProdutoList';
import ProdutoForm from './components/ProdutoForm';


function App() {
  return (
    <Router>
      <div style={{ padding: 20 }}>
        
        {/* <nav>          
          <Link to="/" style={{ marginRight: 10 }}>Inicio</Link>
          <Link to="/categorias" style={{ marginRight: 10 }}>Categorias</Link>
          <Link to="/produtos">Produtos</Link>
        </nav> */}

          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#"><Link to="/" style={{ marginRight: 10 }}>Inicio</Link></a>
            <a class="navbar-brand" href="#"><Link to="/categorias" style={{ marginRight: 10 }}>Categorias</Link></a>
            <a class="navbar-brand" href="#"><Link to="/produtos">Produtos</Link></a>
          </nav>
     

        <Routes>
          <Route path="/categorias" element={<CategoriaList />} />
          <Route path="/categorias/novo" element={<CategoriaForm />} />
          <Route path="/categorias/editar/:id" element={<CategoriaForm />} />

          <Route path="/produtos" element={<ProdutoList />} />
          <Route path="/produtos/novo" element={<ProdutoForm />} />
          <Route path="/produtos/editar/:id" element={<ProdutoForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
