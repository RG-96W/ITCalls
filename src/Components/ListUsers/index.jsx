import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import UserModal from '../UserModal'; // Importe o componente do modal
import './style.css';

const ListCalls = () => {
  const [account, setAccount] = useState([]);
  const [selectedAccountId, setselectedAccountId] = useState(null); // Estado para controlar o ID do account selecionado
  // const navigate = useNavigate();

  const handleAccountClick = (accountId) => {
    setselectedAccountId(accountId); // Abre o modal quando um account é clicado
  };

  useEffect(() => {
    // Função para obter o token de acesso dos cookies
    const getBearerTokenFromCookies = () => {
      try {
        const cookies = document.cookie;
        const cookieArray = cookies.split(';');
    
        for (const cookie of cookieArray) {
          const [name, value] = cookie.trim().split('=');
          if (name.trim() === 'token') {
            if (value) {
              return value;
            } else {
              throw new Error('Token nos cookies está vazio.');
            }
          }
        }
    
        throw new Error('Token não encontrado nos cookies.');
      } catch (error) {
        console.error('Erro ao obter o token:', error.message);

        throw error; // Lança o erro novamente para que possa ser tratado no código que chama a função

      }
    };
  

    const token = getBearerTokenFromCookies();

    if (token !== null) {
      console.log('Token:', token);
      const apiUrl = 'http://127.0.0.1:5000/account';
    
      console.log('Fazendo solicitação GET para:', apiUrl);
    
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        redirect: 'follow' // Lidar com redirecionamentos
      })
        .then((response) => {
          console.log('Status da resposta:', response.status);
    
          // Adicione logs para visualizar o cabeçalho da resposta e o corpo da resposta, se necessário.
          
          if (!response.ok) {
            throw new Error('Erro ao obter os account');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Dados obtidos com sucesso:', data);
          setAccount(data);
        })
        .catch((error) => {
          console.error('Erro ao obter os account:', error);
        });
        
    }

    
  }, []);
  const levelMap = {
    1: "Cliente",
    2: "Técnico",
    3: "Administrador"
    
  };

  

  return (
    <div className="ListCalls">
      <table>
        <thead>
          <tr className="CallsRef">
            <th className="tab1">Nome</th>
            <th className="tab2">E-Mail</th>
            <th className="tab3">Password</th>
            <th className="tab4">Função</th>
          </tr>
        </thead>
        <tbody>
        {account
    .filter(account => account.status !== "Fechado") // Filtra os account com status diferente de "Fechado"
    .map((account) => (
      <tr
        key={account._id}
        onClick={() => handleAccountClick(account._id)}
      >
              <td className="tab1">{account.login}</td>
              <td className="tab2">{account.email}</td>
              <td className="tab3">{account.password}</td>
              <td className={`tab4 ${account.level === 2 ? 'blue bold' : account.level === 3 ? 'red bold' : ''}`}>{levelMap[account.level] || ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UserModal
        isOpen={selectedAccountId !== null}
        onRequestClose={() => setselectedAccountId(null)} // Fecha o modal quando o usuário clica fora dele
        accountId={selectedAccountId}
      />
    </div>
  );
};

export default ListCalls;
