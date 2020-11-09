import styled from 'styled-components';
import { TEXT_COLORS } from '../../../../../../styles/colors';


export * from './menu';

export const CardContainer = styled.div`
    position: relative;
    width: 342px;
    margin-bottom: 72px;
    border-radius: 13px;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.16);
    -moz-box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.16);
    -webkit-box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.16);
`;

export const DropdownMenu = styled.div`
    position: absolute;
    top: 45px;
    right: 0px;
    width: 115px;
    transform: translateX(-45%);
    background-color: white;
    border-radius: 15px; 
    padding: 1rem;
    overflow: hidden;
    box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.50);
    -moz-box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.50);
    -webkit-box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.50);
`;

export const ItemText = styled.p`
    color: black;
    font-size: 14px;
    text-align: center;
    padding-left: 2px;
`;

export const ItemHeader = styled.p`
    color: grey;
    font-size: 12px;
`;

export const MenuItem = styled.div`
    height: 20px;
    display: flex;
    align-items: left;
    color: black;
    font-size: 13px;
    padding: 5px 0;
    cursor: pointer;
`;

export const Upper = styled.div`
    height: 351px;
    padding: 28px;
    box-sizing: border-box;
    border-bottom: 1px solid #E6E6E6;
`;

export const MeetLogo = styled.img`
    margin-bottom: 11px;
`;

export const MeetOptions = styled.img`
    position: absolute;
    right: 20px;
    top: 32px;
    border-radius:35px;
    cursor: pointer;
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
`;

export const MeetDate = styled.p`
    color: ${TEXT_COLORS.GRAY};
    font-size: 12px;
    margin-bottom: 10px;
`;

export const MeetMessages = styled.p`
    color: black;
    font-size: 16px;
    font-weight: normal;
`;

export const MeetIcons = styled.div`
    color: black;
    display: flex;
    justify-content: space-between;
    padding: 16.8px 28px 23.2px 28px;
`;
