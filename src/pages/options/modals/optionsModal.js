import React from 'react';
import Switch from 'react-switch';

import {
    Separator
} from './components';
import ModalBase from './modalBase';
import Section from './components/Section';
import SettingRow from './components/SettingRow';
import GoogleButton from './components/GoogleButton';
import { auth, saveToken, getToken, disconnect } from '../services';

class OptionsModal extends React.Component {
    state = {
        autoSave: false,
        isConnected: false,
        isGoogleButtonDisabled: false,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.checkIsAuthenticated();
    }

    checkIsAuthenticated = () => {
        getToken().then((token) => {
            if (typeof token === 'string' && token.length !== 0) {
                this.setState({ isConnected: true })
            }
        })
    }

    handleGoogleConnection = () => {
        const { isConnected } = this.state;
        this.setState({ isGoogleButtonDisabled: true })
        
        if (!isConnected) {
            auth().then((res) => {
                let objState = { isGoogleButtonDisabled: false }
                if (res.success) {
                    saveToken(res.token)
                    objState = { ...objState, isConnected: true }
                }
                this.setState(objState)
            })
        }
        else {
            disconnect().then((res) => {
                let objState = { isGoogleButtonDisabled: false }
                if (res.success) {
                    objState = { ...objState, isConnected: false }
                }
                this.setState(objState)
            });
        }
    }

    handleSwitchToggle = () => {
        const { autoSave } = this.state;
        this.setState({ autoSave: !autoSave })
    }

    renderSwitch = () => (
        <Switch checked={this.state.autoSave} onChange={this.handleSwitchToggle} />
    )

    renderGoogleButton = () => (
        <GoogleButton
            disabled={this.state.isGoogleButtonDisabled}
            isConnected={this.state.isConnected}
            onClick={this.handleGoogleConnection}
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
