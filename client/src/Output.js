import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Output(props) {
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
			{props.result ? (
				<div>
				<Button>Display curve</Button>
				<img src={`data:image/png;base64,${props.curve}`} alt=""/>
				</div>
				) : null
			}
		</div>
	);
}

export default Output;