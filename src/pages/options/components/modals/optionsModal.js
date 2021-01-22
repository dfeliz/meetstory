import React from 'react';
import Select from 'react-select';

import {
    Separator,
    SelectContainer,
} from './components';
import ModalBase from './modalBase';
import Section from './components/Section';
import SettingRow from './components/SettingRow';
import GoogleButton from './components/GoogleButton';
import { getTranslation, saveTranslation } from '../../services'

const languageOptions = [
    { value: 'fr', label: 'Francés' },
    { value: 'en', label: 'Inglés' },
    { value: 'it', label: 'Italiano' },
    { value: 'zh', label: 'Mandarín' },
    { value: 'pt', label: 'Portugués' },
]

class OptionsModal extends React.Component {
    state = {
        autoSave: false,
        isGoogleButtonDisabled: false,
        translateLenguage: ""
    }

    componentDidMount() {
        this.obtainTranslationLenguage();
    }

    obtainTranslationLenguage = () => {
        getTranslation().then((lenguage) => {
            this.setState({ translateLenguage: lenguage });
        });
    }

    setTranslationLenguage = (selectedLenguage) => {
        saveTranslation(selectedLenguage);
        this.setState({ translateLenguage: selectedLenguage });
    }


    handleGoogleConnection = () => {
        const { handleAuthentication } = this.props;
        this.setState({ isGoogleButtonDisabled: true })
        handleAuthentication().finally(() => {
            this.setState({ isGoogleButtonDisabled: false })
        })
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
                name="lang"
                classNamePrefix="select"
                options={languageOptions}
                value={this.state.translateLenguage}
                styles={{ container: () => ({ height: 44, width: 320 }) }}
                onChange={this.setTranslationLenguage}
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
                    overflow: 'visible',
                }}
            >
                <Section title="Configuración de Google Drive">
                    <SettingRow
                        Title="Conexión con Google"
                        Description="Conecta con Google para guardar tus meetstories en Google Drive."
                        renderComponent={this.renderGoogleButton}
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
