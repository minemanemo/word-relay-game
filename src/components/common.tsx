import styled from 'styled-components';

export const Title = styled.h1`
  padding: 30px 0;
  margin: 0;
  line-height: 1.15;
  font-size: 3rem;
  text-align: center;
`;

export const Grid = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 800px;
`;

export const Card = styled.div`
  margin: 1rem;
  padding: 1.5rem;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 300px;
  cursor: pointer;
  text-align: center;

  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }

  & > h2 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  & > p {
    margin: 0;
    font-size: 1.25rem;
    line-height: 1.5;
  }
`;

export const Button = styled.a`
  margin: 0;
  border-radius: 7px;
  color: white;
  background: #0070f3;
  box-shadow: 0 4px 14px 0 rgb(0 118 255 / 39%);
  padding: 0 2rem;
  height: 2.5rem;
  line-height: 2.5rem;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  font-weight: 400;
  touch-action: pan-y;
  transition: opacity 0.5s;
  opacity: 1;
  font-size: 1.2rem;
  &:hover {
    opacity: 0.8;
  }
`;

export const Layout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const ButtonGroup = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  padding: 30px 0;
`;

export const Content = styled.div`
  position: absolute;
  top: 100px;
  right: 30px;
  bottom: 100px;
  left: 30px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 4rem;
  font-weight: bold;
`;

export const TimerText = styled.span`
  font-size: 2rem;
`;

export const Timer = ({ delay }: { delay: number }) => (
  <TimerText>{(delay / 1000).toFixed(2)}</TimerText>
);
