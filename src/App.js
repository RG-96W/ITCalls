import './App.css';
import CadastroForm from './Pages/CadastroForm';
import RecSenhaForm from './Pages/RecSenhaForm';
import LoginForm from './Pages/Login';
import RealizeLogin from './Pages/RealizeLogin';
import Login from './Pages/Logado';

import './Components/HeaderTop/style.css';
import './PageStyles/ResetPage.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie'; // Importe a biblioteca js-cookie




const Private = ({ Item }) => {

  const token = Cookies.get('token'); // Obtém o token do cookie

  return token ? <Item /> : <RealizeLogin />;
}

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/RealizeLogin" element={<RealizeLogin />} />
          <Route path="/cadastro" element={<CadastroForm />} />
          <Route path="/recsenha" element={<RecSenhaForm />} />
          <Route path="/login" element={<Private Item={Login} />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
