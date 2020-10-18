import styled from 'styled-components';

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 60px 130px;
    justify-content: space-between;

    & > div {
        flex: 1, 1, 1;
    }

`;

export { default as Card } from './card';
