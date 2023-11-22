import styled from 'styled-components';
import LogoStereolab from '../assets/logo_stereolab.png';
import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import CheckboxGroup from '../components/Checkbox';
import {
  postQuotation,
  getLastQuotationNumber,
} from '../services/quotationApi';
import { toast } from 'react-toastify';
import { useAuth } from '../AppContext/Provider';
import { format, formatISO } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [description, setDescription] = useState('');
  const [paymentValue, setPaymentValue] = useState('');
  const [paymentTypeValue, setPaymentTypeValue] = useState('');
  const [quotationDate, setQuotationDate] = useState(
    format(new Date(), 'yyyy-MM-dd')
  );
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quotationStatus, setQuotationStatus] = useState('ORCAMENTO');
  const [quotationNumber, setQuotationNumber] = useState('');
  const [loggedUser, setLoggedUser] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [prevNumber, setPrevNumber] = useState<string | null>(null);
  const [quotationFormNumber, setQuotationFormNumber] = useState('');

  const navigate = useNavigate();
  const { token, login } = useAuth();

  const quotationData = {
    quotation_date: new Date(quotationDate).toISOString(),
    client_name: clientName,
    client_email: clientEmail,
    client_address: clientAddress,
    quotation_description: description,
    quotation_total_amount: paymentValue,
    status: quotationStatus,
  };

  const startNewQuotation = async () => {
    try {
      setClientName('');
      setClientEmail('');
      setClientAddress('');
      setDescription('');
      setPaymentValue('');
      setPaymentTypeValue('');
      setQuotationDate(format(new Date(), 'yyyy-MM-dd'));
      setSelectedItems([]);
      setSelectedOption(null);
      setQuotationStatus('ORCAMENTO');
      getNextQuotationNumber().then((nextNumber) => {
        if (typeof nextNumber === 'number') {
          // Atualiza o estado com o novo número do orçamento
          setPrevNumber(quotationFormNumber); // Salva o valor anterior antes de reiniciar
          setQuotationNumber(nextNumber.toString());
        }
      });

      // Oculta a mensagem de sucesso
      setShowSuccessMessage(false);
    } catch (error) {
      console.error('Erro ao obter número da cotação', error);
    }
  };

  // const clearFormFields = () => {};

  useEffect(() => {
    const loggedInUser = localStorage.getItem('token');
    if (loggedInUser) {
      setLoggedUser(true);
    }

    getNextQuotationNumber().then((nextNumber) => {
      if (typeof nextNumber === 'number') {
        setQuotationNumber(nextNumber.toString());
      }
    });
  }, []);

  const handleOptionChange = (option: string | null) => {
    setSelectedOption(option);
  };

  const handleStatusChange = (newStatus: string | null) => {
    setQuotationStatus(newStatus || '');
  };

  async function getNextQuotationNumber() {
    try {
      const response = await getLastQuotationNumber();
      const lastQuotationNumber = response.data.quotation_number;
      console.log('Next Quotation Number:', lastQuotationNumber + 1);
      if (typeof lastQuotationNumber === 'number') {
        return lastQuotationNumber + 1;
      }
    } catch (error) {
      console.error('Erro ao obter número da cotação');
    }
  }
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

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const post = await postQuotation(quotationData, token);

        // toast('Orçamento criado com sucesso');
        setShowSuccessMessage(true);
      } catch (error) {
        console.log({ error });
      }
    } else {
      console.log('Token de autorização inexistente');
    }
  }

  return (
    <>
      {!showSuccessMessage && (
        <div ref={pdfRef}>
          <Background>
            <Block></Block>
            <form onSubmit={submit}>
              <QuotationBackground id="QuotationBackground">
                <QuotationHeader>
                  <Logo>
                    <img src={LogoStereolab} alt="logo-stereolab"></img>
                  </Logo>
                  <NumberData>
                    <WrapperInput>
                      <InputData>
                        <p>Número do orçamento:</p>
                        <h1>{quotationNumber}</h1>
                      </InputData>

                      <InputData>
                        <p>Data do orçamento:</p>
                        <input
                          type="date"
                          value={quotationDate}
                          onChange={(e) => setQuotationDate(e.target.value)}
                        ></input>
                      </InputData>
                    </WrapperInput>
                  </NumberData>
                </QuotationHeader>

                <CheckboxGroup
                  onOptionChange={handleOptionChange}
                  onStatusChange={handleStatusChange}
                />

                <RegistrationData>
                  <InputDataMedium>
                    <p>Nome:</p>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="*campo obrigatorio"
                    ></input>
                  </InputDataMedium>

                  <InputDataMedium>
                    <p>Telefone/Whatsapp:</p>
                    <input
                      type="text"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="ex: 41 99999-9999 | *campo obrigatorio"
                    ></input>
                  </InputDataMedium>

                  <InputDataMedium>
                    <p>Cidade - Estado:</p>
                    <input
                      type="text"
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                    ></input>
                  </InputDataMedium>
                </RegistrationData>

                <Description>
                  <TitleBox>
                    <p>Descrição do orçamento</p>
                  </TitleBox>
                  <InputMedium
                    placeholder="Digite aqui para editar | Descrição do produto ou serviço (quantidade, material, cores, dimensão, tipo de corte, acabamentos, especificações do projeto)"
                    rows={4}
                    cols={50}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></InputMedium>
                </Description>

                <Preview>
                  <TitleBox>
                    <p>Valor total</p>
                  </TitleBox>

                  <InputSmall
                    placeholder="Digite aqui para editar |  Valor total do projeto/serviço | *campo obrigatório"
                    rows={4}
                    cols={50}
                    value={paymentValue}
                    onChange={(e) => setPaymentValue(e.target.value)}
                  ></InputSmall>
                </Preview>
                <Payment>
                  <TitleBox>
                    <p>Formas de pagamento</p>
                  </TitleBox>

                  <InputSmall
                    placeholder="Digite aqui para editar |  Formas de pagamento (ex: entrada + 3 parcelas, à vista, boleto)"
                    rows={4}
                    cols={50}
                    value={paymentTypeValue}
                    onChange={(e) => setPaymentTypeValue(e.target.value)}
                  ></InputSmall>
                </Payment>
              </QuotationBackground>

              <StyledButton>
                <button type="submit" onClick={generatePDF}>
                  <p>SALVAR NA DATABASE E GERAR PDF</p>
                </button>
              </StyledButton>
            </form>
          </Background>
        </div>
      )}
      {showSuccessMessage && (
        <BackgroundSuccessMessage>
          <p>Orçamento salvo com sucesso! Deseja gravar outro orçamento?</p>
          <WrapperButton>
            <button onClick={() => setShowSuccessMessage(false)}>Fechar</button>
            <button onClick={startNewQuotation}>Novo Orçamento</button>
          </WrapperButton>
        </BackgroundSuccessMessage>
      )}
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
  button {
    width: 100%;
  }
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
  width: 350px;
  margin-left: 50px;
  margin-bottom: 5px;
  p {
    margin-right: 5px;
    color: black;
    font-size: 10px;
  }
`;

const RegistrationData = styled.div`
  background-color: white;
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
    &::placeholder {
      font-size: 10px;
    }
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
  min-height: 300px;
  width: 574px;
  display: flex;
  font-family: 'Inconsolata', sans-serif;
  margin: 0 auto;
  margin-top: 5px;
  position: relative;

  overflow: auto;

  &::placeholder {
    position: absolute;
    top: 30%;
    left: 30%;
    transform: translate(-20%, -10%);
    font-size: 12px;
  }
`;

const Description = styled.div`
  background-color: white;
  height: 500px;
`;

const Preview = styled.div`
  background-color: white;
  height: 200px;
  display: flex;
  flex-direction: column;
`;

const Payment = styled.div`
  background-color: white;
  height: 200px;
`;

const InputSmall = styled.textarea`
  min-height: 50px;
  width: 574px;
  display: flex;
  font-family: 'Inconsolata', sans-serif;
  margin: 0 auto;
  margin-top: 5px;
  position: relative;

  overflow: auto;

  &::placeholder {
    position: absolute;
    top: 30%;
    left: 30%;
    transform: translate(-20%, -10%);
    font-size: 12px;
  }
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
const BackgroundSuccessMessage = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #292826;
  font-family: 'Inconsolata', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: white;
    font-size: 25px;
  }
`;
const WrapperButton = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  button {
    border-radius: 5px;
    border: 1px solid #fcba03;
    background-color: transparent;
    width: 200px;
    height: 50px;
    color: white;
    transition: background-color 0.3s; /* Adiciona uma transição suave à mudança de cor */
    &:hover {
      background-color: #fcba03; /* Muda a cor de fundo ao passar o mouse */
    }
  }
`;
