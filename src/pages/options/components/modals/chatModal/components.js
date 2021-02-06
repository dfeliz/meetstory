import styled from 'styled-components';

export const Header = styled.div`
    margin-bottom: 9px;
    display: flex;
    justify-content: space-between;
`;

export const Title = styled.h1`
    font-size: 31px;
    color: #000000a6;
    font-weight: 500;
`;

export const Code = styled.p`
    font-size: 14px;
    margin-bottom: 2px;
`;

export const Date = styled.p`
    color: #707070;
    font-size: 12px;
`;

export const ChatContainer = styled.div`
    width: 100%;
    height: 408px;
    font-size: 16px;
    overflow-y: scroll;
    padding: 16px 0 0 16px;
    box-sizing: border-box;
    background-color: #F2F2F2;
`;

export const MeetOptions = styled.img`
    right: 0;
    top: -10px;
    cursor: pointer;
    position: absolute;
`;

export const Options = styled.div`
    right: 0;
    bottom: 0;
    display: flex;
    position: absolute;
    padding-right: 26px;
    padding-bottom: 28px;

    & > svg {
        margin-right: 36px;
    }
`;

export const RightContainer = styled.div`
    width: 200px;
    position: relative;
`;
