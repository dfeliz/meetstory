import styled from 'styled-components';

export const SuperContainer = styled.div`
  height: 100%;
  width: 25.5%;
  min-width: 300px;
  position: relative;
  background-color: #18435A;
`;

export const Container = styled.div`
  padding-right: 61px;
  transition: all 1s linear;
`;

export const Title = styled.h1`
  font-size: 32px;
  text-align: right;
  color: white;
  outline: none;
  font-family: local('Segoe UI');
  font-weight: 525;
  font-style: normal;
`;

export const Option = styled.h2`
  padding-top: 29px;
  font-size: 20px;
  text-align: right;
  color: white;
  outline: none;
  font-family: local('Segoe UI');
  font-weight: 400;
  font-style: normal;
  cursor: pointer;
`;

export const Shadow = styled.div`
  top: 435px;
  width: 100%;
  opacity: 0.16;
  height: 60px;
  position: absolute;
  background-color: grey;
`;
