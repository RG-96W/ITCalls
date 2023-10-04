import React from 'react';
import Button from '../../Components/Buttons';
import Input from '../../Components/Input';
import Label from '../../Components/Labels';
import { useNavigate } from 'react-router-dom';


import '../../PageStyles/LoginForm.css'



const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {

    navigate('/');
  }

  return (
    <section className="login">
      <form className="cont__form__login" >
        <Label text="@Realize Login!" id="login__label__password" tipo="titulo" />
        <div className="cont__column">
          <Input type="text" id="login__name" />
          <Label text="Nome" id="login__label__password" tipo="padrao" />
          <Button text="VOLTAR" type="submit" onClick={handleSubmit} />

        </div>
      </form>
    </section>
  );
};
export default Login;
