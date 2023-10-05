import React from 'react';
import Button from '../../Components/Buttons';
import Input from '../../Components/Input';
import Label from '../../Components/Labels';
import ReturnBar from '../../Components/PrevBar';
import '../../PageStyles/RecSenhaForm.css';
import Header from '../../Components/HeaderTop';

const RecSenhaForm = () => {


  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = document.getElementById('login__name').value;

    const formData = {
      email,
    };

    console.log(formData)
    try {
      const response = await fetch('http://localhost:5000/get-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.password) {
          // A resposta da API foi bem-sucedida e possui uma senha
          document.getElementById('login__RecSenha').value = data.password;
          console.log('Senha recuperada com sucesso:', data.password);
        } else {
          console.error('Resposta da API está incompleta ou não possui senha.');
        }
      } else {
        console.error('Erro ao enviar os dados para a API fake. Código de status:', response.status);
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };





  return (
    <div>
      <Header />
      <section className="RecSenha">
        <form className="cont__form__RecSenha">
          <ReturnBar className="PrevBar" />
          <Label text="@Recuperar" id="login__label__RecSenha" tipo="titulo" />
          <div className="cont__column">
            <Input type="text" id="login__name" />
            <Label text="E-Mail" id="login__label__RecSenhaEmail" tipo="padrao" />
          </div>
          <Label text="Informe o email de cadastro." id="login__label__RecSenha" tipo="detalhes" />
          <div className="cont__column">
            <Input type="text" id="login__RecSenha" readOnly={true} />
            <Label text="Senha" id="login__label__RecSenhaSenha" tipo="padrao" />
          </div>

          <Label text="Tome sua senha, Não é o foco." id="login__label__RecSenha" tipo="detalhes" />

          <Button text="RECUPERAR" type="button" onClick={handleSubmit} />
        </form>
      </section>
    </div>
  );
};

export default RecSenhaForm;