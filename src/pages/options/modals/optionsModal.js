import React from 'react';
import Switch from 'react-switch';
import { GoogleLogin } from 'react-google-login';

import {
    Separator
} from './components';
import ModalBase from './modalBase';
import Section from './components/Section';
import SettingRow from './components/SettingRow';
import GoogleButton from './components/GoogleButton';

class OptionsModal extends React.Component {
    state = {
        autoSave: false,
        isConnected: false,
    }

    constructor(props) {
        super(props);
    }

    responseGoogle = (response) => {
        console.log(response);
    }

    handleSwitchToggle = () => {
        const { autoSave } = this.state;
        this.setState({ autoSave: !autoSave })
    }

    renderSwitch = () => (
        <Switch checked={this.state.autoSave} onChange={this.handleSwitchToggle} />
    )

    renderGoogleButton = () => (
        <GoogleLogin
            clientId="190864320471-u7013qpmh2r7fn39id3eof6fip0fhd7d.apps.googleusercontent.com"
            render={renderProps => (
                <GoogleButton
                    isConnected={this.state.isConnected}
                    {...renderProps}
                />
            )}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
        />

    )

    renderLanguageSelect = () => (
        <select>
            <option id="english" value="english">English</option>
        </select>
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
                        renderComponent={this.renderLanguageSelect}
                    />
                </Section>
            </ModalBase>
        )
    }
}

export default OptionsModal;
