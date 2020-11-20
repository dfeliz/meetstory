import React from 'react';
import {
    Title,
    Section,
} from './components';

const ModalSection = ({
    title,
    children,
}) => {
    return (
        <Section>
            <Title>
                {title}
            </Title>
            {children}
        </Section>
    )
}

export default ModalSection;
