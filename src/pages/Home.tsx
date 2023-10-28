import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <BackgroundContainer>
      <SvgWrapper>
        <svg
          viewBox="0 0 900 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <path d="M0 0h900v600H0z" fill="#292826" />
          <path
            d="M0 410l21.5-1.2c21.5-1.1 64.5-3.5 107.3 6.5 42.9 10 85.5 32.4 128.4 34 42.8 1.7 85.8-17.3 128.6-21 42.9-3.6 85.5 8 128.4 19.7 42.8 11.7 85.8 23.3 128.6 17 42.9-6.3 85.5-30.7 128.4-41 42.8-10.3 85.8-6.7 107.3-4.8L900 421v180H0z"
            fill="#fcba03"
            strokeLinecap="round"
          />
        </svg>
      </SvgWrapper>
      <Content>
        <WrapperText>
          <Logo>
            <h1>STEREOLAB</h1>
          </Logo>
          <Paragraph>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <p>login</p>
            </Link>
          </Paragraph>
        </WrapperText>
      </Content>
    </BackgroundContainer>
  );
}

const BackgroundContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const SvgWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const WrapperText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
`;

const Logo = styled.div`
  margin-top: 300px;
  h1 {
    color: #fff;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 140px;
    font-weight: 400;
  }
`;

const Paragraph = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  p {
    color: #fff;
    font-family: 'Inconsolata', sans-serif;
    font-size: 40px;
    font-weight: 400;
    margin-right: 20px;
  }
`;
