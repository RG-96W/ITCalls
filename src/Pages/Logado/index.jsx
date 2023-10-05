import React from 'react';


import LateralEnd from '../../Components/LateralEnd';
import LateralMenu from '../../Components/LateralMenu';
import ListCalls from '../../Components/ListCalls';
import RequestTopPage from '../../Components/RequestTopPage';
import TopBar from '../../Components/TopBar';


import '../Logado/style.css'
import SearchTopBar from '../../Components/SearchTopBar/SearchTopBar';



const Login = () => {
  // const navigate = useNavigate();
  // const handleSubmit = () => {
  //   Cookies.remove('token')
  //   navigate('/');
  // }


  return (

    <main className='Page'>

      <section className='Section1'>
        <TopBar />
        <LateralMenu />
        <LateralEnd />
      </section>


      <section className='Section2'>
        <SearchTopBar />
        <RequestTopPage />
        <ListCalls />
      </section>

    </main>

  );
};
export default Login;
