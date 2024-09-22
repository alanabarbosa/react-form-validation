import React, { useState } from 'react';
import Input from './Form/Input';
import Radio from './Form/Radio'

const Home = () => {
  const [cep, setCep] = useState('');
  const [cpf, setCpf] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [dados, setDados] = React.useState('CPF');
  const [error, setError] = useState(null);
  const [errorDados, setErrorDados] = useState(null);

  const validateCep = (value) => {
    if(value.length === 0) {
      setError('Preencha um valor');
      return false;
    } else if (!/^\d{5}-?\d{3}$/.test(value)) {
      setError('Preencha um CEP válido');
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  const validateCpf = (value) => {
    console.log(value)
    if(value.length === 0) {
      setErrorDados('Preencha um valor');
      return false;
    } else if (!/^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/
.test(value)) {
      setErrorDados('Preencha um CPF válido');
      return false;
    } else {
      setErrorDados(null);
      return true;
    }
  }

  const validateCnpj = (value) => {
    if(value.length === 0) {
      setErrorDados('Preencha um valor');
      return false;
    } else if (!/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})$/
.test(value)) {
      setErrorDados('Preencha um CNPJ válido');
      return false;
    } else {
      setErrorDados(null);
      return true;
    }
  }   

  const handleBlur = ({ target }) => validateCep(target.value);

  const handleChange = ({ target }) => {
    if (error) validateCep(target.value)
    setCep(target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateCep(cep)) console.log('Enviou');
    else console.log('Não enviar')
  }

  const handleChangeDados = ({ target }) => {
    if (dados === 'CPF') {
      if (errorDados) validateCpf(target.value)
      setCpf(target.value);
    } else {
      if (errorDados) validateCnpj(target.value)
      setCnpj(target.value);
    }
  }

  const handleBlurDados = ({ target }) => {
    if (dados === 'CPF') {
      console.log('Validando CPF:', cpf);
      validateCpf(target.value)
    } else {
      console.log('Validando CNPJ:', cnpj);
      validateCnpj(target.value)
    }
  }

  const getClassName = () => {
    if (errorDados) return 'error';
    if (!errorDados && (cpf || cnpj)) return 'valid';
    return '';
  }; 
  
  const getClassNameCep = () => {
    if (error) return 'error';
    if (!error && (cep)) return 'valid';
    return '';
  };  
    
    return (
      <>
        <form action="" onSubmit={handleSubmit}>
          <Input 
          label="CEP" 
          id="cep" 
          type="text" 
          value={cep} 
          placeholder="0000-000"
          onChange={handleChange}
          onBlur={handleBlur}
          className={getClassNameCep()} />
          {error && <p>{error}</p>}

          <Input 
          label={dados} 
          id={dados.toLowerCase()} 
          type="text" 
          value={dados === 'CPF' ? cpf : cnpj}
          placeholder={`Digite seu ${dados.toLowerCase()}`}
          onChange={handleChangeDados}
          onBlur={handleBlurDados}
          className={getClassName()}/>   
          {errorDados && <p>{errorDados}</p>}       

          <Radio
            options={['CPF', 'CNPJ']}
            value={dados}
            setValue={setDados}
          />          
          <button>Enviar</button>
        </form>
      </>
    );
}

export default Home;