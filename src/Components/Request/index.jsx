import React, { useEffect, useState } from 'react';
import Button from './button'
import { useLocation } from 'react-router-dom';

import './style.css';

const Request = () => {
  const location = useLocation();
  const { chamadoId } = location.state;

  const [atualRequest, setAtualRequest] = useState(null);

  useEffect(() => {
    if (chamadoId) {
      // Fazer uma solicitação HTTP GET para obter os detalhes do chamado usando o chamadoId
      fetch(`http://127.0.0.1:5001/requests/${chamadoId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao obter os detalhes do chamado');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Dados do chamado:', data); // Adicione este log
          setAtualRequest(data);
        })
        .catch((error) => {
          console.error('Erro ao obter os detalhes do chamado:', error);
        });
    }
  }, [chamadoId]);

  if (!atualRequest) {
    return <div>Carregando...</div>;
  }

  return (

<div className="bodymodal1">
    <div className="request">
        <div className="parent">


        <div className="div11">
  <div className="titulo">
    Título: {atualRequest.titulo} {/* Use atualRequest.titulo, não atualRequest.title */}
  </div>
  <div className="descricao">
    Descrição: {atualRequest.descricao} {/* Use atualRequest.descricao, não atualRequest.description */}
  </div>
</div>

<div className="div22">
  <div className="comentariostitulo">
    Respostas
  </div>
  <div className="comentarios">
    {atualRequest.comentarios} {/* Use atualRequest.comentarios, não atualRequest.comments */}
  </div>
</div>

<div className="div33">
  <div className="infosRequest">
    <div className="status">Status: {atualRequest.status}</div>
    <div className="tecnico">Técnico: {atualRequest.responsavel}</div> {/* Use atualRequest.responsavel, não atualRequest.technician */}
    <div className="solicitante">Solicitante: {atualRequest.cliente}</div> {/* Use atualRequest.cliente, não atualRequest.customer */}
    <div className="abertura">Abertura: {atualRequest.data_abertura}</div> {/* Use atualRequest.data_abertura, não atualRequest.open_date */}
    <div className="vencimento">Vencimento: {atualRequest.data_previsao}</div> {/* Use atualRequest.data_previsao, não atualRequest.dbvencimento */}
    <div className="prioridade">Prioridade: {atualRequest.prioridade}</div>
  </div>
</div>

            <div className="div44">
                <div className="GridButtons">
                    <div className="button1">
                    <Button text="Solucionado" className="bsolucionado" type="submit" />
                    {/* onClick={handleSubmit}  */}
                    </div>
                    <div className="button2">
                    <Button text="Responder" className="bcomentario" type="submit" />
                    </div>
                    <div className="button3">
                    <Button text="Bloqueado" className="bbloqueado" type="submit" />
                    </div>
                    <div className="button4">
                    <Button text="Editar" className="beditar" type="submit" />
                    </div>
                    </div>
                </div>


            </div>
    </div>
</div>

    );
};
export default Request;