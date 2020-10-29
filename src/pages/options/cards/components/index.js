import styled from 'styled-components';

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 60px 130px 0 130px;
    justify-content: space-around;

    & > div {
        flex: 1, 1, 1;
    }

`;

export const NothingHereMessage = styled.div`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100px;
    height: 30px;
    color: black;
    margin: auto;
    position: absolute;
`;

export { default as Card } from './card';
