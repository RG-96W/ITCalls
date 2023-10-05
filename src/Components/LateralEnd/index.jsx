import React from 'react';
import Postit from './psotit.png';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';


import './style.css'



const LateralEnd = () => {

    return (

        <div className="Section1_End">
        <div className="Alerts">
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img src={Postit} alt="Descrição da imagem" />
            <div className="Alerts_Overlay">
                Alert !

                Lorem ipsum dolor sit amet, 
                consectetur adipisicing elit. 
                A velit reprehenderit nam iure ipsum 
                ullam minus dolorum perspiciatis 
                atque veniam.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusantium magnam totam,
                mollitia esse aut commodi eligendi quia?
                Officiis voluptas mollitia nisi animi a natus rerum doloribus minima dicta esse,
                aspernatur nostrum soluta odio fugiat sit libero ex eos adipisci dolores quis expedita. 
                Eveniet culpa, fugit eligendi eaque delectus hic molestias.
            </div>
        </div>

    </div>

    );
};
export default LateralEnd;