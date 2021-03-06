import styled, { keyframes } from 'styled-components';
import { TEXT_COLORS } from '../../../../../../../styles/colors';

export * from './menu';

export const CardContainer = styled.div`
    position: relative;
    width: 342px;
    margin-right: 32px;
    margin-bottom: 72px;
    border-radius: 13px;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.16);
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
    overflow: hidden;
    line-height: 26px;
    font-weight: normal;
    padding-bottom: 4px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const MeetDate = styled.p`
    color: ${TEXT_COLORS.GRAY};
    font-size: 12px;
    margin-bottom: 10px;
`;

export const MeetMessages = styled.p`
    color: black;
    font-size: 16px;
    overflow: hidden;
    font-weight: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const MeetIcons = styled.div`
    color: black;
    display: flex;
    justify-content: space-between;
    padding: 16.8px 28px 23.2px 28px;
`;



// Dropdown popup

export const DropdownMenu = styled.div`
    @keyframes appear {
        from {
            top: ${(props) => props.top - 15}px;
            opacity: 0;
        }

        to {
            top: ${(props) => props.top}px;
            opacity: 1;
        }
    }

    position: absolute;
    top: ${(props) => props.top}px;
    right: ${(props) => props.right}px;
    width: 172px;
    transform: translateX(-40%);
    background-color: white;
    border-radius: 22px; 
    padding: 1.2rem 0;
    overflow: hidden;
    box-shadow: 0px 0px 25px -6px rgba(0,0,0,0.35);
    animation: appear 0.12s ease;
`;

export const ItemText = styled.p`
    color: black;
    font-size: 14px;
    text-align: center;
`;

export const ItemHeader = styled.p`
    color: grey;
    padding: 0 1.4rem;
    margin: 5px 0;
    font-size: 12px;
    cursor: default;
`;

export const MenuItem = styled.div`
    height: 20px;
    display: flex;
    align-items: center;
    color: black;
    font-size: 13px;
    padding: 5px 1.4rem;
    cursor: pointer;

    &:hover {
        background-color: #F9F9F9;
    }
`;

export const IconContainer = styled.div`
    width: 12px;
    margin-right: 10px;
`;
