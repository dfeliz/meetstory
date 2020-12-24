import './styles.css'
import styled from 'styled-components';

export const SuperContainer = styled.div`
  height: 100%;
  width: 25.5%;
  display: flex;
  min-width: 350px;
  position: relative;
  flex-direction: column;
  justify-content: center;
  background-color: #18435A;
`;

export const Container = styled.div`
  transition: all 0.3s ease-in-out;
`;

export const Title = styled.h1`
  color: white;
  outline: none;
  font-size: 32px;
  font-weight: 525;
  text-align: right;
  font-style: normal;
  padding-right: 61px;
  margin-bottom: 29px;
  font-family: local('Segoe UI');
`;

export const Option = styled.h2`
  color: white;
  outline: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: 400;
  line-height: 60px;
  text-align: right;
  font-style: normal;
  padding-right: 61px;
  font-family: local('Segoe UI');

  &:hover {
    background-color: #FFFFFF20;
  }
`;

export const Shadow = styled.div`
  top: 435px;
  width: 100%;
  opacity: 0.16;
  height: 60px;
  position: absolute;
  background-color: grey;
`;
