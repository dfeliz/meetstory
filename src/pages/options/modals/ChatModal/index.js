import React from 'react';

import {
    Code,
    Date,
    Title,
    Header,
    Options,
    ChatContainer,
} from './components';
import ModalBase from '../modalBase';

const printMessages = (messages) => messages.map((message) => <div>{message}</div>)

class ChatModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, onRequestClose, selectedChat } = this.props;
        const { title, code, formattedDate, messages } = selectedChat;
        return (
            <ModalBase
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                style={{
                    width: 969,
                    padding: 60,
                }}
            >
                <Header>
                    <Code>
                        {code}
                    </Code>
                    <Title>
                        {title}
                    </Title>
                    <Date>
                        {formattedDate}
                    </Date>
                </Header>
                <Options>

                </Options>
                <ChatContainer>
                    {printMessages(messages)}
                </ChatContainer>
            </ModalBase>
        )
    }
}

export default ChatModal;
