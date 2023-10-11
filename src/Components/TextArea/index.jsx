import React from 'react';
import './style.css';

const TextArea = ({ id, onClick, readOnly, width, height }) => {
  const style = {
    width: width || 'auto', // Use o valor fornecido ou 'auto' como padrão
    height: height || 'auto', // Use o valor fornecido ou 'auto' como padrão
  };

  return (
    <textarea
      autoComplete="off"
      className="inputs"
      onClick={onClick}
      id={id}
      readOnly={readOnly}
      style={style}
    />
  );
};

export default TextArea;
