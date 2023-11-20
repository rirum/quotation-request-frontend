import React, { useState } from 'react';
import styled from 'styled-components';

export default function CheckboxGroup({
  onOptionChange,
  onStatusChange,
}: {
  onOptionChange: (option: string) => void;
  onStatusChange: (option: string) => void;
}) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedOption(event.target.value);
  //   onOptionChange(event.target.value);
  // };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value;
    setSelectedOption(event.target.value);
    onStatusChange(newStatus);
  };
  return (
    <CheckboxWrapper>
      <CheckboxInput>
        <label>
          <input
            type="checkbox"
            value="ORCAMENTO"
            checked={selectedOption === 'ORCAMENTO'}
            onChange={handleStatusChange}
          />{' '}
          Orçamento
        </label>
      </CheckboxInput>
      <CheckboxInput>
        <label>
          <input
            type="checkbox"
            value="VENDA"
            checked={selectedOption === 'VENDA'}
            onChange={handleStatusChange}
          />{' '}
          Venda
        </label>
      </CheckboxInput>
      <CheckboxInput>
        <label>
          <input
            type="checkbox"
            value="LISTA_DE_ESPERA"
            checked={selectedOption === 'LISTA_DE_ESPERA'}
            onChange={handleStatusChange}
          />{' '}
          Lista de Espera
        </label>
      </CheckboxInput>
      <CheckboxInput>
        <label>
          <input
            type="checkbox"
            value="CANCELADA"
            checked={selectedOption === 'CANCELADA'}
            onChange={handleStatusChange}
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
