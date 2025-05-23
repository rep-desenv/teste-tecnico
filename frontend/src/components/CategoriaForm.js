import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function CategoriaForm() {
  const [nome, setNome] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/categoria/${id}`).then((response) => {
        setNome(response.data.nome);
      });
    }
  }, [id]);

  const handleCancel = async() => {
    navigate('/categorias');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = { nome };

    if (id) {
    //   await api.put(`/categoria/${id}`, dados);
      try {
        const response = await api.put(`/categoria/${id}`, dados);  
        navigate('/categorias');      
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert( error.response.data.message);
        } else {
          console.error('Erro desconhecido', error);
          alert('Erro inesperado');
        }
      }

    } else {
    //   await api.post('/categoria', dados);
        try{
        const response = await api.post('/categoria', dados);  
        navigate('/categorias');     
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
      <h2>{id ? 'Editar Categoria' : 'Nova Categoria'}</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <div class="col-md-4 mb-3">
              <label>Nome </label>
              <input
                class="form-control"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
          </div>
        </div>
        <br/>
        <button class="btn btn-success" type="submit">Salvar</button><span> </span>
        <button type="button" class="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
      </form>
    </div>
  );
}

export default CategoriaForm;
