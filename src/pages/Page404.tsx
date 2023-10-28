import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StereolabSmall from '../assets/logo_stereolab-150x150.png';

export default function Page404() {
  return (
    <Container>
      <WrapperText>
        <img src={StereolabSmall} alt="logo-stereolab"></img>
        <h1>Acesso Negado</h1>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <p>clique aqui para fazer login</p>
        </Link>
      </WrapperText>
    </Container>
  );
}

const Container = styled.div`
  background-color: #292826;
  width: 100vw;
  min-height: 100vh;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    color: white;
    font-size: 50px;
  }
  p {
    font-size: 20px;
    color: white;
  }
`;

const WrapperText = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 300px;
`;
