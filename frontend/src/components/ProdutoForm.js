import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function ProdutoForm() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    carregarCategorias();
    if (id) {
      api.get(`/produto/${id}`).then((response) => {
        setNome(response.data.nome);
        setPreco(response.data.preco);
        setCategoriaId(response.data.categoriaId);
      });
    }
  }, [id]);

  const carregarCategorias = async () => {
    const response = await api.get('/categorias');
    setCategorias(response.data);
  };

  const handleCancel = async() => {
    navigate('/produtos');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      nome,
      preco: parseFloat(preco),
      categoriaId: parseInt(categoriaId),
    };

    if (id) {
      // await api.put(`/produto/${id}`, dados);
      try {
        const response = await api.put(`/produto/${id}`, dados);  
        navigate('/produtos');     
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert( error.response.data.message);
        } else {
          console.error('Erro desconhecido', error);
          alert('Erro inesperado');
        }
      }
    } else {
      // await api.post('/produto', dados);
      try {
        const response = await api.post('/produto', dados); 
        navigate('/produtos');            
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert( error.response.data.message);
        } else {
          console.error('Erro desconhecido', error);
          alert('Erro inesperado');
        }
      }
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Produto' : 'Novo Produto'}</h2>
      <br></br>
      <form onSubmit={handleSubmit} onAbort={handleSubmit}>
        <div class="form-group">
          <div class="col-md-4 mb-3">
            <label>Nome</label>
            <input
              class="form-control"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>        
          <div class="col-md-4 mb-3">
            <label>Preço</label>
            <input
              class="form-control"
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
            />
          </div>
          <div class="col-md-4 mb-3"> 
            <label>Categoria</label>
            <select
              class="form-control"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br/>
        <button class="btn btn-success" type="submit">Salvar</button><span> </span>
        <button type="button" class="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default ProdutoForm;
