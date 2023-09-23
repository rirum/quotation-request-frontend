import styled from 'styled-components';
import LogoStereolab from '../assets/logo_stereolab.png';
import React, { useState } from 'react';
export default function Quotation() {
  const [imagens, setImagens] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const imagensArray: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result;
          if (typeof result === 'string') {
            imagensArray.push(result);
            if (imagensArray.length === files.length) {
              setImagens([...imagens, ...imagensArray]);
            }
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };
  return (
    <>
      <Background>
        <QuotationBackground>
          <QuotationHeader>
            <Logo>
              <img src={LogoStereolab} alt="logo-stereolab"></img>
            </Logo>
            <NumberData>
              <WrapperInput>
                <form>
                  <InputData>
                    <p>Número do orçamento:</p>
                    <input></input>
                  </InputData>

                  <InputData>
                    <p>Data do orçamento:</p>
                    <input></input>
                  </InputData>
                </form>
              </WrapperInput>
            </NumberData>
          </QuotationHeader>

          <RegistrationData></RegistrationData>
          <Description>
            <TitleBox>
              <p>Descrição do orçamento</p>
            </TitleBox>
            <InputMedium
              placeholder="Digite aqui para editar | Descrição do produto ou serviço (quantidade, material, cores, dimensão, tipo de corte, acabamentos, especificações do projeto)"
              rows={4}
              cols={50}
            ></InputMedium>
          </Description>
          <Preview>
            <TitleBox>
              <p>Preview do Projeto</p>
            </TitleBox>
            <ImageUpload>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
              {imagens.map((imagem, index) => (
                <img key={index} src={imagem} alt={`Imagem ${index}`} />
              ))}
              {/* Outro conteúdo do documento */}
            </ImageUpload>
          </Preview>
          <Payment>
            <TitleBox>
              <p>Valor total | Formas de pagamento</p>
            </TitleBox>

            <InputMedium
              placeholder="Digite aqui para editar |  Valor total do projeto/serviço e formas de pagamento (ex: entrada + 3 parcelas, à vista, boleto)"
              rows={4}
              cols={50}
            ></InputMedium>
          </Payment>
        </QuotationBackground>
      </Background>
    </>
  );
}

const QuotationHeader = styled.div`
  width: 600px;
  height: 150px;
  display: flex;
`;
const Logo = styled.div`
  width: 50%;
  img {
    height: 35px;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 20px;
  }
`;

const NumberData = styled.div`
  width: 50%;
  display: flex;
`;
const WrapperInput = styled.div`
  margin-top: 30px;
`;
const InputData = styled.div`
  display: flex;
  align-items: center;
  width: 120px;
  margin-left: 50px;
  margin-bottom: 5px;
  p {
    margin-right: 5px;
    color: black;
    font-size: 10px;
  }
`;

const RegistrationData = styled.div`
  background-color: aliceblue;

  height: 150px;
`;

const TitleBox = styled.div`
  background-color: black;
  height: 25px;
  width: 580px;
  margin: 0 auto;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #565656;

  p {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    color: white;
  }
`;

const InputMedium = styled.textarea`
  min-height: 100px;
  width: 574px;
  display: flex;
  font-family: 'Inconsolata', sans-serif;
  margin: 0 auto;
  margin-top: 5px;
  position: relative;
  &::placeholder {
    position: absolute;
    top: 30%;
    left: 30%;
    transform: translate(-20%, -10%);
    font-size: 12px;
  }
`;

const Description = styled.div`
  background-color: yellow;
  height: 250px;
`;

const Preview = styled.div`
  background-color: palegreen;
  height: 450px;
`;

const ImageUpload = styled.div`
  border: 1px solid #565656;
  width: 580px;
  height: 250px;

  position: absolute;
  margin-left: 10px;
  margin-top: 5px;
  input {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
  }
`;
const Payment = styled.div`
  background-color: paleturquoise;
  height: 240px;
`;

const QuotationBackground = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 600px;
  height: 800px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #292826;
  font-family: 'Inconsolata', sans-serif;
`;
