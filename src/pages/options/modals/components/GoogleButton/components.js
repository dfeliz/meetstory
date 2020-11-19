import styled from 'styled-components';

export const Icon = styled.img`
    padding: 0 16px;
`;

export const Text = styled.p`
    color: #757575;
    padding: 16px 0;
    font-size: 20px;
    line-height: 20px;
    margin-left: 28px;
    justify-content: center;
`;

export const ButtonContainer = styled.div`
    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }

    height: 52px;
    width: 320px;
    display: flex;
    cursor: pointer;
    border: 0.5px solid #707070A0;
    box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.06);

    ${props => props.disabled && `
        cursor: progress;
        color: #F2F2F2;
        background-color: #FAFAFA;
        box-shadow: 0px 0px 0px 0px;

        & > img {
            margin-left: 44%;
            animation: rotation 2s infinite linear;
        }

        & > p {
            visibility: hidden;
        }
    `}
`;
