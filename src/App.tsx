import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './pages/Home';
import Login from './pages/Login';
import Quotation from './pages/Quotation';
import Page404 from './pages/Page404';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './AppContext/Provider';
import { ProtectedRoute } from './pages/ProtectedRoute';

function App() {
  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <ContainerApp>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/quotation"
                element={
                  <ProtectedRoute>
                    <Quotation />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="/page404" element={<Page404 />}></Route>
            </Routes>
          </AuthProvider>
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
`;
