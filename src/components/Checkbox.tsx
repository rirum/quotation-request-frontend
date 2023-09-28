import React, { useState } from 'react';
import styled from 'styled-components';

export default function CheckboxGroup() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <CheckboxWrapper>
      <CheckboxInput>
        <label>
          <input
            type="checkbox"
            value="option1"
            checked={selectedOption === 'option1'}
            onChange={handleCheckboxChange}
          />{' '}
          Venda
        </label>
      </CheckboxInput>
      <CheckboxInput>
        <label>
          <input
            type="checkbox"
            value="option2"
            checked={selectedOption === 'option2'}
            onChange={handleCheckboxChange}
          />{' '}
          Orçamento
        </label>
      </CheckboxInput>
      <CheckboxInput>
        <label>
          <input
            type="checkbox"
            value="option3"
            checked={selectedOption === 'option3'}
            onChange={handleCheckboxChange}
          />{' '}
          Lista de Espera
        </label>
      </CheckboxInput>
      <CheckboxInput>
        <label>
          <input
            type="checkbox"
            value="option4"
            checked={selectedOption === 'option4'}
            onChange={handleCheckboxChange}
          />{' '}
          Cancelados
        </label>
      </CheckboxInput>
    </CheckboxWrapper>
  );
}

const CheckboxWrapper = styled.div`
  display: flex;
  width: 600px;
  justify-content: space-evenly;
`;
const CheckboxInput = styled.div`
  display: flex;

  height: 40px;
  align-items: center;
`;
