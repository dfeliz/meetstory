import React from 'react';
import ModalBase from './modalBase';


class OptionsModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, onRequestClose } = this.props;
        return (
            <ModalBase
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={{
                    width: 966,
                    height: 514,
                    padding: 60,
                }}
            >
                This is a modal
            </ModalBase>
        )
    }
}

export default OptionsModal;
