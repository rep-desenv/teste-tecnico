import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    const response = await api.get('/produtos');
    setProdutos(response.data);
  };

  const deletarProduto = async (id) => {
    if (window.confirm('Deseja realmente excluir?')) {
      await api.delete(`/produto/${id}`);
      carregarProdutos();
    }
  };

  const atualizarProduto = async (id) => {
    navigate(`/produtos/editar/${id}`);
  };

  const incluirProduto = async () => {
    navigate("/produtos/novo");
  };


  return (
    <div>        
      <h2>Produtos</h2> 
      <table class="table">        
        <thead>      
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>  
            <th scope="col">Preço</th> 
            <th scope="col">Categoria</th>      
            <th scope="col"><button type="button" class="btn btn-success"  onClick={() => incluirProduto()}>Novo Produto</button></th>
            </tr>
        </thead>
        <tbody>
          
            {produtos.map((prod) => (
              
              <tr>
              <th scope="row">{prod.id}</th>
              <td>{prod.nome}</td>
              <td>{prod.preco}</td>
              <td>{prod.categoria?.nome}</td>
              <td>
              <button type="button" class="btn btn-primary" onClick={() => atualizarProduto(prod.id)}>Atualizar</button><span>  </span>
              <button type="button" class="btn btn-danger" onClick={() => deletarProduto(prod.id)}>Excluir</button>
              </td>
              
              </tr>
            ))}        
        </tbody>
      </table> 
      
    </div>
  );
}

export default ProdutoList;
