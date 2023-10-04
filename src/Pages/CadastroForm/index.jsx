import React from 'react';
import Button from '../../Components/Buttons';
import Input from '../../Components/Input';
import Label from '../../Components/Labels';
import ReturnBar from '../../Components/PrevBar'
import '../../PageStyles/CadastroForm.css'
// import validarCadastro from '../validacoes/cadastro.js'
// import { cadastrarUsuario } from '../api'
// import { Link } from 'react-router-dom';

const CadastroForm = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const login = document.getElementById('cadastro__name').value;
    const password = document.getElementById('cadastro__password').value;
    // const repetirSenha = document.getElementById('cadastro__repassword').value;
    const email = document.getElementById('cadastro__email').value;

    const formData = {
      login,
      password,
      // repetirSenha,
      email,
    };

    console.log(formData)
    try {
      const response = await fetch('http://localhost:5000/account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Dados enviados com sucesso para a API fake.');
      } else {
        console.error('Erro ao enviar os dados para a API fake.');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }

    // validarCadastro(formData)


  };

  return (
    <section className="cadastro">
      <form className="cont__form__cadastro" >
        <ReturnBar className="PrevBar" />
        <Label text="@Cadastro" id="cadastro__label__password" tipo="tituloNoPadding" />
        <div className="cont__column">
          <Input type="text" id="cadastro__name" />
          <Label text="Nome" id="cadastro__label__password" tipo="padrao" />
        </div>

        <div className="cont__column">
          <Input type="password" id="cadastro__password" />
          <Label text="Senha" id="cadastro__label__password" tipo="padrao" />
        </div>


        <div className="cont__column">
          <Input type="password" id="cadastro__repassword" />
          <Label text="Repita senha" id="cadastro__label__password" tipo="padrao" />
        </div>

        <div className="cont__column">
          <Input type="text" id="cadastro__email" />
          <Label text="E-mail" id="cadastro__label__password" tipo="padrao" />
        </div>



        <Button text="CADASTRAR" type="submit" onClick={handleSubmit} />
        {/* onClick={handleButtonClick} */}
      </form>
    </section>
  );
};

export default CadastroForm;