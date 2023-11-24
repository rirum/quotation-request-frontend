import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AppContext/Provider';

export default function Intranet() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Background>
        <Container>
          <Logout>
            <button onClick={handleLogout}>
              <p>Logout</p>
            </button>
          </Logout>

          <WrapperText>
            <Logo>
              <h1>Stereolab</h1>
            </Logo>
            <PagesLink>
              <Link to="/quotation" style={{ textDecoration: 'none' }}>
                <p>Criar orçamento</p>
              </Link>
              <Link to="/list" style={{ textDecoration: 'none' }}>
                <p>Listar orçamentos</p>
              </Link>
              <Link to="/search" style={{ textDecoration: 'none' }}>
                <p>Buscar orçamentos</p>
              </Link>
            </PagesLink>
          </WrapperText>
        </Container>
      </Background>
    </>
  );
}

const Background = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #292826;
  font-family: 'Inconsolata', sans-serif;
  display: flex;
  color: white;
  hr {
    height: 1px;
    border: 0;
    border-top: 1px solid #ccc;
    margin: 1em 0;
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logout = styled.div`
  width: 100vw;
  display: flex;
  justify-content: flex-end;

  p {
    font-size: 30px;
  }
  button {
    border: none;
    background-color: transparent;
    margin-right: 50px;
    margin-top: 20px;
    width: 200px;
    height: 50px;
    color: white;
    cursor: pointer;
    &:hover {
      color: #fcba03;
    }
  }
`;

const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 150px;
    color: white;
  }
`;

const Logo = styled.div`
  margin-bottom: 20px;
`;

const PagesLink = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-around;

  p {
    font-size: 30px;
    color: white;
    &:hover {
      color: #fcba03;
    }
  }
`;
