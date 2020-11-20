import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faTag } from '@fortawesome/free-solid-svg-icons';
import {
    Menu,
    Upper,
    MeetLogo,
    CardContainer,
    MeetCode,
    MeetTitle,
    MeetIcons,
    MeetMessages,
    MeetOptions,
    MeetDate
} from './components';
import MeetIcon from '../../assets/meet.svg';
import Dots from '../../assets/dots.svg';
import { COLORS } from '../../../../../styles/colors'
import { formatDate } from '../../../utils/date';

const GenerateMessages = (chat) => {
    return chat.slice(0, 6).map((message) => {
        return <MeetMessages>{message}</MeetMessages>
    })
}

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownVisible: false
        };
    }

    dropdownToggle = () => {
        this.setState(prevState => ({
            dropdownVisible: !prevState.dropdownVisible
        }));
    }

    render() {
        const {
            chat,
            toggleDelete,
            openChatModal,
            toggleFavorite,
        } = this.props;
        const { dropdownVisible } = this.state;

        const chatValue = Object.values(chat)[0];
        const chatId = Object.keys(chat)[0];
        const {
            title,
            code,
            date,
            messages,
            favorite,
            deleted,
        } = chatValue;
        const formattedDate = formatDate(date);

        return (
            <CardContainer>
                <Upper>
                    <MeetLogo src={MeetIcon} alt="Meet" />
                    <MeetOptions aria-controls="export-menu" src={Dots} alt="options" onClick={this.dropdownToggle} />
                    {
                        dropdownVisible && (
                            <Menu chatData={chatValue} />
                        )
                    }
                    <MeetCode>{code}</MeetCode>
                    <MeetTitle>{title}</MeetTitle>
                    <MeetDate>{formattedDate}</MeetDate>
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => openChatModal({ ...chatValue, formattedDate })}
                    >
                        {GenerateMessages(messages)}
                    </div>
                </Upper>
                <MeetIcons>
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        size="2x"
                        style={{ cursor: "pointer", color: deleted ? COLORS.DANGER : COLORS.INACTIVE }}
                        onClick={() => toggleDelete(chatId)}

                    />
                    {
                        !deleted && (
                            <FontAwesomeIcon
                                icon={faTag}
                                size="2x"
                                style={{ cursor: "pointer", color: favorite ? COLORS.ACTIVE : COLORS.INACTIVE }}
                                onClick={() => toggleFavorite(chatId)}
                            />
                        )
                    }
                </MeetIcons>
            </CardContainer>
        )
    }
}

export default Card;
