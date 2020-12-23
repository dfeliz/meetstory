import React, { createRef } from 'react';
import { Card, CardsContainer, NothingHereMessage } from './components';
import Animate from './helpers/Animate';

const CardsComponent = ({
	data,
	toggleDelete,
	openChatModal,
	openDeleteModal,
	toggleFavorite,
}) => {

	if (data && data.length > 0) {
		return (
			<CardsContainer>
				<Animate>
					{data.map((chat) => (
						<Card
							chat={chat}
							key={chat.id}
							ref={createRef()}
							toggleDelete={toggleDelete}
							openChatModal={openChatModal}
							toggleFavorite={toggleFavorite}
							openDeleteModal={openDeleteModal}
						/>
					))}
				</Animate>
			</CardsContainer>
		)
	}
	return <NothingHereMessage>No hay chats.</NothingHereMessage>
}

export default CardsComponent;
