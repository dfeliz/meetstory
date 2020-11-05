import React from 'react';
import {
    Left,
    Right,
    RowDesc,
    RowTitle,
    Container,
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
                {renderComponent()}
            </Right>
        </Container>
    )
}

export default SettingRow;
