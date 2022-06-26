import React, { useState } from 'react';
import {
	Form,
	Row,
	Col,
	Button,
	Image,
	Alert,
	Modal
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Output(props) {

	const [modalVisible, setModalVisible] = useState(false);

	const modalBody = () => {
		if (props.result) {
			return (
				<div>
					<Image alt="selected image" src={`data:image/png;base64,${props.curve}`} fluid />
				</div>
			);
		}
		else {
			return (
				<div>
					<Alert variant="danger">
						Curve not available!
					</Alert>
				</div>
			);
		}
	}

	const handleClose = () => {
		setModalVisible(false)
	}

	return (
		<div className="offset-md-3">
			<Form>
				<Form.Group as={Row} controlId="equation">
					<Form.Label column sm="3">
						Equation
					</Form.Label>
					<Col sm="5">
						<Form.Control readOnly placeholder={props.equation} />
					</Col>
				</Form.Group>
				<Form.Group as={Row} controlId="result">
					<Form.Label column sm="3">
						Result
					</Form.Label>
					<Col sm="5">
						<Form.Control as="textarea" readOnly placeholder={props.result} />
					</Col>
				</Form.Group>
			</Form>
			{props.curve ?
				<Button variant="success"
					onClick={() => setModalVisible(true)}>
					Display curve
				</Button>
				:
				null
			}
			<Modal
				show={modalVisible}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
			>
				<Modal.Header closeButton>
					<Modal.Title>
						{props.curve ? "Curve of equation" : "Error in extension"}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{modalBody()}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default Output;