import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
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
						<Form.Control readOnly placeholder={props.result} />
					</Col>
				</Form.Group>
			</Form>
		</div>
	);
}

export default Output;