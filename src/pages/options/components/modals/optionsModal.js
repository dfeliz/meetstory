import React from 'react';
import Switch from 'react-switch';
import Select from 'react-select';

import {
    Separator,
    SelectContainer,
} from './components';
import ModalBase from './modalBase';
import Section from './components/Section';
import SettingRow from './components/SettingRow';
import GoogleButton from './components/GoogleButton';
import {
    getAutoSave, toggleAutoSave
} from '../../services'

const languageOptions = [
    { value: 'english', label: 'English' },
]

class OptionsModal extends React.Component {
    state = {
        autoSave: false,
        isGoogleButtonDisabled: false,
    }

    constructor(props) {
        super(props);
    }

    
    componentDidMount() {
        this.obtainSavedState();
    }

    obtainSavedState = () => {
        getAutoSave().then((checkStatus) => {
            this.setState({ autoSave: checkStatus });
        });
    }

    handleSwitchToggle = () => {
        const { autoSave } = this.state;
        toggleAutoSave(autoSave)
        this.obtainSavedState();
    }


    handleGoogleConnection = () => {
        const { handleAuthentication } = this.props;
        this.setState({ isGoogleButtonDisabled: true })
        handleAuthentication().then(() => {
            this.setState({ isGoogleButtonDisabled: false })
        })
    }

    renderSwitch = () => {
        const { autoSave } = this.state;
        return (
            <Switch
                checked={autoSave}
                onChange={this.handleSwitchToggle}
            />
        )
    }

    renderGoogleButton = () => (
        <GoogleButton
            onClick={this.handleGoogleConnection}
            isConnected={this.props.isAuthenticated}
            disabled={this.state.isGoogleButtonDisabled}
        />
    )

    renderLanguageSelect = () => (
        <SelectContainer>
            <Select
                isDisabled
                name="lang"
                classNamePrefix="select"
                options={languageOptions}
                value={languageOptions[0]}
                styles={{ container: () => ({ height: 44, width: 320 }) }}
            />
        </SelectContainer>
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
