import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let imgBase64 = '';

class Evaluate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded: false,
            imgUrl: '',
            uploadError: false,
            showModal: false
        };
    }

    validateFile = (event) => {
        let extension = event.target.files[0].name.substring(event.target.files[0].name.lastIndexOf('.') + 1).toLowerCase();
        let img = '';
        if (extension === 'png') {
            img = URL.createObjectURL(event.target.files[0]);
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                imgBase64 = reader.result;
                this.setState(Object.assign(this.state, {
                    uploaded: true,
                    imgUrl: img,
                    uploadError: false,
                }));
            }
            reader.readAsDataURL(file);
        }
        else {
            imgBase64 = '';
            this.setState(Object.assign(this.state, {
                uploaded: false,
                imgUrl: '',
                uploadError: true,
            }));
        }
    }

    handleClose = () => {
        this.setState(Object.assign(this.state, { showModal: false }));
    }

    selectedImage = () => {
        if (!this.state.uploadError) {
            return (
                <div>
                    <Image alt="selected image" src={this.state.imgUrl} fluid />
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.state.imgUrl &&
                    (<div className="border border-secondary rounded" style={{
                        height: '20em',
                        width: '40em',
                        marginBottom: '20px'
                    }}>
                        {this.selectedImage()}
                    </div>)
                }
                <div style={{ marginLeft: '5em' }}>
                    <input type="file" onChange={this.validateFile} />
                    <Button
                        className="btn btn-primary"
                        disabled={!this.state.uploaded}
                        onClick={() => this.props.sendImgToServer(imgBase64)}>
                        Evaluate
                    </Button>
                </div>
            </div>
        );
    }
}

export default Evaluate;