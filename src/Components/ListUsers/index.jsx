import React, { useEffect, useState } from 'react';
import UserModal from '../UserModal';
import MessageModal from '../MessageModal';
import './style.css';

const ListCalls = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalCode, setModalCode] = useState('');
  const [account, setAccount] = useState([]);
  const [selectedAccountId, setselectedAccountId] = useState(null);


  const openMessageModal = (title, message, code) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalCode(code);
    setIsModalOpen(true);
  };

  const handleAccountClick = (accountId) => {
    setselectedAccountId(accountId);
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
        openMessageModal("Erro","Sua sessão expirou, refaça o login!"," (002-907)", true)

      }
    };

    const token = getBearerTokenFromCookies();

    if (token !== null) {
      const apiUrl = 'http://200.216.165.199:5000/account';

      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        redirect: 'follow'
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Erro ao obter os account');
          }
          return response.json();
        })
        .then((data) => {
          setAccount(data);
          
        })
        .catch((error) => {
          console.error('Erro ao obter os account:', error);
          openMessageModal("Erro","Erro ao obter dados do servidor de usuarios!"," (001-906)", true)
        });
    }
  }, []);

  const levelMap = {
    1: "Cliente",
    2: "Técnico",
    3: "Administrador"
  };

  const formatPassword = (password) => {
    return password.substring(0, 2) + '***';
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
            .filter(account => account.status !== "Fechado")
            .map((account) => (
              <tr
                key={account._id}
                onClick={() => handleAccountClick(account._id)}
              >
                <td className="tab1">{account.login}</td>
                <td className="tab2">{account.email}</td>
                <td className="tab3">{formatPassword(account.password)}</td>
                <td className={`tab4 ${account.level === 2 ? 'blue bold' : account.level === 3 ? 'red bold' : ''}`}>{levelMap[account.level] || ""}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <UserModal
        isOpen={selectedAccountId !== null}
        onRequestClose={() => setselectedAccountId(null)}
        accountId={selectedAccountId}
      />
      {isModalOpen && (
            <MessageModal
            isOpen={isModalOpen !== false}
              message={modalMessage}
              title={modalTitle}
              code={modalCode}
            />
          )}
    </div>
  );
};

export default ListCalls;
