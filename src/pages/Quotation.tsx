import styled from 'styled-components';
import LogoStereolab from '../assets/logo_stereolab.png';
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function ImageUpload() {
  const [imagens, setImagens] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImagens([...imagens, ...files]);
    }
  };

  const deleteImage = (index: number) => {
    const novasImagens = [...imagens];
    novasImagens.splice(index, 1);
    setImagens(novasImagens);
  };

  return (
    <StyledImageUpload>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
      <Thumbnail>
        {imagens.map((imagem, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(imagem)} alt={`Imagem ${index}`} />
            <button onClick={() => deleteImage(index)}>x</button>
          </div>
        ))}
      </Thumbnail>
    </StyledImageUpload>
  );
}

const StyledImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  input {
  }
`;

const Thumbnail = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;

  img {
    width: 150px;
  }
  button {
    border-radius: 50%;
    background-color: #565656;
    border: 0 solid;
    color: white;
    margin-right: 10px;
  }
`;

export default function Quotation() {
  const pdfRef = useRef(null);

  const generatePDF = async () => {
    const quotationBackground = document.getElementById('QuotationBackground');

    if (!quotationBackground) {
      console.error('A div QuotationBackground não foi encontrada.');
      return;
    }

    const waitForImages = Array.from(
      quotationBackground.querySelectorAll('img')
    ).map(
      (img: HTMLImageElement) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
          }
        })
    );

    await Promise.all(waitForImages);

    html2canvas(quotationBackground).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5',
      });
      pdf.addImage(imgData, 'JPEG', 0, 0, 148, 210);
      pdf.save('documento.pdf');
    });
  };
  return (
    <>
      <div ref={pdfRef}>
        <Background>
          <Block></Block>
          <QuotationBackground id="QuotationBackground">
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

            <RegistrationData>
              <InputDataMedium>
                <p>Nome:</p>
                <input></input>
              </InputDataMedium>

              <InputDataMedium>
                <p>Email ou Whatsapp:</p>
                <input></input>
              </InputDataMedium>

              <InputDataMedium>
                <p>Endereço:</p>
                <input></input>
              </InputDataMedium>
            </RegistrationData>
            <hr></hr>
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
              <ImageUpload />
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
          <StyledButton onClick={generatePDF}>
            {' '}
            <p>BAIXAR PDF</p>
          </StyledButton>
        </Background>
      </div>
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
const StyledButton = styled.div`
  width: 600px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #fff;
  display: flex;
  margin: 0 auto;
  margin-top: 15px;

  p {
    margin: 0 auto;
    margin-top: 5px;
  }
`;

const Block = styled.div`
  background-color: #292826;
  height: 50px;
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
  height: 80px;
  align-content: center;
`;

const InputDataMedium = styled.div`
  width: 580px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  input {
    width: 450px;
    margin-bottom: 5px;
  }
  p {
    width: 130px;
    font-size: 12px;
    margin-right: 10px;
    margin-bottom: 5px;
  }
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
  height: 200px;
`;

const Preview = styled.div`
  background-color: palegreen;
  height: 450px;
`;

const Payment = styled.div`
  background-color: paleturquoise;
  height: 240px;
`;

const QuotationBackground = styled.div`
  margin-top: 15px;

  margin: 0 auto;
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
  hr {
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
  }
`;
