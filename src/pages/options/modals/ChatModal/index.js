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

class ChatModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isOpen, onRequestClose, selectedChat } = this.props;
        const { title, code, formattedDate, messages } = selectedChat;
        console.log(messages);
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
                    {messages.join("\n")}
                </ChatContainer>
            </ModalBase>
        )
    }
}

export default ChatModal;
