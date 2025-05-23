import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate, useParams } from 'react-router-dom';


function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    const response = await api.get('/categorias');
    setCategorias(response.data);
  };

  const deletarCategoria = async (id) => {
    if (window.confirm('Deseja realmente excluir?')) {
      await api.delete(`/categoria/${id}`);
      carregarCategorias();
    }
  };

  const atualizarCategoria = async (id) => {
    navigate(`/categorias/editar/${id}`);
  };

  const incluirCategoria = async () => {
    navigate("/categorias/novo");
  };

  return (    
    <div>
      <h2>Categorias</h2>   
      
      <table class="table">
        <thead>      
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>        
            <th scope="col"><button type="button" class="btn btn-success"  onClick={() => incluirCategoria()}>Nova Categoria</button></th>
            </tr>
        </thead>
        <tbody>
          
            {categorias.map((cat) => (
              
              <tr>
              <th scope="row">{cat.id}</th>
              <td>{cat.nome}</td>
              <td>
              <button type="button" class="btn btn-primary" onClick={() => atualizarCategoria(cat.id)}>Atualizar</button><span>  </span>
              <button type="button" class="btn btn-danger" onClick={() => deletarCategoria(cat.id)}>Excluir</button>
              </td>
              
              </tr>
            ))}        
        </tbody>
      </table>  
    </div>
  );
}

export default CategoriaList;
