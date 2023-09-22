import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Login from './pages/Login';
import Quotation from './pages/Quotation';

function App() {
  return (
    <>
      <BrowserRouter>
        <ContainerApp>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/quotation" element={<Quotation />}></Route>
          </Routes>
        </ContainerApp>
      </BrowserRouter>
    </>
  );
}

export default App;

const ContainerApp = styled.div`
  width: 100vw;
  min-height: 100vh;

  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px;
  padding: 0px;
  font-family: 'Karla', sans-serif;
  color: #fff;
`;
