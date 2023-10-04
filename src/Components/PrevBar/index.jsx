import React from "react";
import './style.css';
import { Link } from 'react-router-dom';

const PrevBar = () => {
    return (
        <nav className="PrevBar" id="leave">
            <label>
                <Link to="/" className='link'> <span className="material-symbols-outlined">
                    logout
                </span></Link>
            </label>
        </nav>
    );
};

export default PrevBar