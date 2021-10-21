import React, { useState } from 'react';
import './style.css';
import typeColors from '../../helpers/pokemonTypes';
// import Popup from '../Popup';
// import { Button, Modal } from 'react-bootstrap';

function Card({ pokemon }) {

	// const [show, setShow] = useState(false);

	// const handleClose = () => setShow(false);
	// const handleShow = () => setShow(true);

	// const popupLogic = () => {
	// 	console.log("Here")
	// 	return (
	// 		// <>
	// 		// 	<Popup showPopup={true} />
	// 		// </>
	// 		<>
	// 			<Modal show={true} onHide={handleClose}>
	// 				<Modal.Header closeButton>
	// 					<Modal.Title>Modal heading</Modal.Title>
	// 				</Modal.Header>
	// 				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
	// 				<Modal.Footer>
	// 					<Button variant="secondary" onClick={handleClose}>
	// 						Close
	// 					</Button>
	// 					<Button variant="primary" onClick={handleClose}>
	// 						Save Changes
	// 					</Button>
	// 				</Modal.Footer>
	// 			</Modal>
	// 		</>
	// 	)
	// }

	return (
		<div className="card">
			<div className="card-number">
				{pokemon.id}
			</div>
			<div className="card-img">
				<img src={pokemon.sprites.front_default} alt="" />
			</div>
			<div className="card-name">
				{pokemon.name}
			</div>
			<div className="card-types">
				{pokemon.types.map(type => {
					return (
						<div className="card-type" key={type.type.name} style={{ backgroundColor: typeColors[type.type.name] }}>
							{type.type.name}
						</div>
					)
				})}
			</div>
			<div className="card-info">
				<div className="card-data card-data-weight">
					<p className="title">Weight</p>
					<p>{pokemon.weight}</p>
				</div>
				<div className="card-data card-data-height">
					<p className="title">Height</p>
					<p>{pokemon.height}</p>
				</div>
				<div className="card-data card-data-baseXP">
					<p className="title">Base XP</p>
					<p>{pokemon.base_experience}</p>
				</div>
			</div>
		</div>
	)
}

export default Card;