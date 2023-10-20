import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Button from './button';
import Label from '../Labels'
import './style.css';
import Cookies from 'js-cookie';
import Input from '../Input';

const UserModal = ({ isOpen, onRequestClose, accountId }) => {
  const [accountDetails, setAccountDetails] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const token = Cookies.get('token'); // Obtenha o token dos cookies (se você está usando Cookies para armazenar o token)

      fetch(`http://127.0.0.1:5000/account/${accountId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao obter os detalhes da conta');
        }
        return response.json();
      })
      .then((data) => {
        setAccountDetails(data);
        setLoginToUpdate(data.login);
      })
      .catch((error) => {
        console.error('Erro ao obter os detalhes da conta:', error);
      });
    }
  }, [isOpen, accountId]);
  const levelMap = {
    1: "Cliente",
    2: "Técnico",
    3: "Administrador"
    
  };

  const formatPassword = (password) => {
    // Exibe os primeiros 2 caracteres seguidos de 3 asteriscos
    return password.substring(0, 2) + '***';
  };





  const [selectedOption, setSelectedOption] = useState('login');
  const [loginToUpdate, setLoginToUpdate] = useState('');

  const handleSubmit = () => {
  const token = Cookies.get('token');
  const inputAlteracao = document.getElementById('alteracao').value
  const updateData = {};

  if (selectedOption === 'login') {
    updateData.login = inputAlteracao;
  } else if (selectedOption === 'password') {
    updateData.password = inputAlteracao;
  } else if (selectedOption === 'email') {
    updateData.email = inputAlteracao;
  } else if (selectedOption === 'level') {
    updateData.level = inputAlteracao;
  }
  
  fetch(`http://127.0.0.1:5000/account/${loginToUpdate}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData), // Converta o objeto em JSON
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Erro na atualização do usuário');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Usuário atualizado com sucesso:', data);
  })
  .catch((error) => {
    console.error('Erro na atualização do usuário:', error);
  });
};




  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="request-modal">
      {accountDetails && (
    <div className="modaluserbg">
    <div className="formuser">
      <h1 className='Titulouser'>Alterar dados de usuario</h1>
    <p className='opuser'>Nome: {accountDetails.login}</p>
    <p className='opuser'>E-Mail: {accountDetails.email}</p>
    <p className='opuser'>Password: {formatPassword(accountDetails.password)}</p>
    <p className='opuser'>Função: {levelMap[accountDetails.level] || ''}</p>
<select
  className='options'
  name="Alterar"
  id="cars"
  value={selectedOption}
  onChange={(e) => setSelectedOption(e.target.value)}
>
              <option value="login">Nome</option>
              <option value="email">E-mail</option>
              <option value="password">Senha</option>
              <option value="level">Função</option>
            </select>

            <Label text="Senha" id="login__label__password" tipo="padrao" />
            <Input type="password" id="alteracao" />
            <div>
          <Button text="ALTERAR" className='bsolucionado2' type="submit" onClick={handleSubmit} />
          </div>
</div>
  </div>
      )}
    </Modal>
  );
};

export default UserModal;
