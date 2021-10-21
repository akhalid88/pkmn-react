import React, { useState } from 'react';
import './style.css';
import { Button, Modal } from 'react-bootstrap';

function Popup(props) {

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	console.log("poop");
	if (props.showPopup) {
		handleShow();

	}

	return (
		<>
			{/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default Popup;