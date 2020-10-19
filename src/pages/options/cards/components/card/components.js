import styled from 'styled-components';

export const CardContainer = styled.div`
    width: 342px;
    margin-bottom: 72px;
    border-radius: 13px;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.16);
    -moz-box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.16);
    -webkit-box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.16);
`;

export const Upper = styled.div`
    padding: 28px;
    border-bottom: 1px solid #E6E6E6;
`;

export const MeetLogo = styled.img`
    margin-bottom: 11px;
`;

export const MeetCode = styled.p`
    color: black;
    font-size: 14px;
    margin-bottom: 11px;
`

export const MeetTitle = styled.h2`
    color: black;
    font-size: 25px;
    font-weight: normal;
    margin-bottom: 26px;
`;

export const MeetMessages = styled.p`
    color: black;
    font-size: 16px;
    font-weight: normal;
`;

export const MeetIcons = styled.div`
    color: black;
    display: flex;
    padding: 16.8px 28px 23.2px 28px;
    justify-content: space-between;
`;
