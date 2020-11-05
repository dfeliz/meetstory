import styled from 'styled-components';

export const SuperContainer = styled.div`
    bottom: 0;
    width: 100%;
    padding: 1rem;
    position: absolute;
    box-sizing: border-box;
`

export const Card = styled.div`
    color: white;
    display: flex;
    padding: 1.5rem;
    border-radius: 7px;
    position: relative;
    background-color: #FFFFFF7F;
`

export const UserImgContainer = styled.div`
    margin-right: 1.3125rem;
`;

export const UserImg = styled.img`
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50px;
`;

export const TextsContainer = styled.div`
    min-width: 0;
    padding-right: 48px;
    display: flex;
    flex-direction: column;
`;

export const UpperText = styled.p`
    font-size: 1em;
    font-weight: 100;
`;

export const LowerText = styled.h2`
    min-width: 0;
    overflow: hidden;
    font-size: 1.6875em;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const ButtonContainer = styled.div`
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    padding-right: inherit;
`;

