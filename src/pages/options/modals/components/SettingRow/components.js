import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    position: relative;
`;

export const RowTitle = styled.h3`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 6px;
`;

export const RowDesc = styled.p`
    font-size: 16px;
    color: #000000A0;
`;

export const Left = styled.div`
    display: flex;
    padding: 6px 0 6px 0;
    flex-direction: column;
`;

export const Right = styled.div`
    right: 0;
    height: 100%;
    line-height: 66px;
    position: absolute;
`;

export const ComponentContainer = styled.div`
    vertical-align: middle;
`;
