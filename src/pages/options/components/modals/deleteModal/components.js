import styled from 'styled-components';

export const Title = styled.h1`
    font-size: 25px;
    color: #000000a6;
    font-weight: 500;
    margin: 25px 0px;
`;

export const Subtitle = styled.h1`
    font-size: 16px;
    color: #000000a6;
    font-weight: 500;
    margin-bottom: 15px;
`;

export const Code = styled.p`
    font-size: 16px;
    font-weight: bolder;
    margin-bottom: 10px;
    margin-top: 10px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 430;
    font-size: 14px;
    margin-top: 40px;
`;

export const ButtonDelete = styled.div`
    background-color: #DC3545;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    color: white;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
`;

export const ButtonCancel = styled.div`
    background-color: #6c757d;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    color: white;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 8px;
    &:hover {
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    }
`;

export const ModalContainer = styled.div`
    position: flex;
    flex-direction: column;
    align-items: center;
    margin: 2px 2px 2px 2px;
    text-align: center;
`;

export const Divider = styled.div`
    width: 1rem;
    height: auto;
    display: inline-block;
`;