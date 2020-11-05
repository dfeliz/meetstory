import React from 'react';
import Switch from 'react-switch';

import {
    Separator
} from './components';
import ModalBase from './modalBase';
import Section from './components/Section';
import SettingRow from './components/SettingRow';
import GoogleButton from './components/GoogleButton';

class OptionsModal extends React.Component {
    state = {
        isConnected: false,
    }

    constructor(props) {
        super(props);
    }

    renderSwitch = () => (
        <Switch />
    )

    renderGoogleButton = () => (
        <GoogleButton
            isConnected={this.state.isConnected}
            onClick={() => console.log('Clicked')}
        />
    )

    render() {
        const { isOpen, onRequestClose } = this.props;
        return (
            <ModalBase
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={{
                    width: 966,
                    padding: 60,
                }}
            >
                <Section title="Configuración de Google Drive">
                    <SettingRow
                        Title="Conexión con Google"
                        Description="Conecta con Google para guardar tus meetstories en Google Drive."
                        renderComponent={this.renderGoogleButton}
                    />
                    <SettingRow
                        Title="Guardado automático"
                        Description="Guarda los meetstories automáticamente en tu Google Drive."
                        renderComponent={this.renderSwitch}
                    />
                </Section>
                <Separator />
                <Section title="Configuración de traducción">
                    <SettingRow
                        Title="Idioma predeterminado"
                        Description="Idioma por defecto para la traducción de meetstories."
                        renderComponent={this.renderGoogleButton}
                    />
                </Section>
            </ModalBase>
        )
    }
}

export default OptionsModal;
