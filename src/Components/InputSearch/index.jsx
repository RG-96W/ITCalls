import React from 'react';
import './style.css';

const InputSearch = ({ type, id, onClick, readOnly }) => {
  return (
    <input
      type={type}
      autoComplete="off"
      className="SearchInput"
      onClick={onClick}
      id={id}
      readOnly={readOnly} // Adicione o atributo readOnly com base na propriedade readOnly
    />
  );
};

export default InputSearch;
