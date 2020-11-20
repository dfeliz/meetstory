import React from 'react';
import {
    Left,
    Right,
    RowDesc,
    RowTitle,
    Container,
    ComponentContainer,
} from './components'

const SettingRow = ({
    Title,
    Description,
    renderComponent
}) => {
    return (
        <Container>
            <Left>
                <RowTitle>
                    {Title}
                </RowTitle>
                <RowDesc>
                    {Description}
                </RowDesc>
            </Left>
            <Right>
                <ComponentContainer>
                    {renderComponent()}
                </ComponentContainer>
            </Right>
        </Container>
    )
}

export default SettingRow;
