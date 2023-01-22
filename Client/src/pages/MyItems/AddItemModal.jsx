import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

import "./AddItemModal.css"

export default function AddItemModal(props) {
    const [validated, setValidated] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    
    const onModalStart = () => {
        setSelectedImage(null);
        setValidated(false);
    }
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            let formData = new FormData();
            formData.append('file', selectedImage);
            formData.append("itemType", form.itemType.value);
            formData.append("condition", form.condition.value);
            formData.append("ownerId", "1");
            fetch("http://localhost:3001/item", {
                method: 'POST',
                body: formData
            })
        }
        setValidated(true);
    };

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            onEnter={onModalStart}
            centered>
                
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Type</Form.Label>
                        <Form.Control required name="itemType"/>
                        <Form.Text>Example: Sofa / Chair / Desk / Book etc.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Condition</Form.Label>
                        <br />
                        <Form.Check required inline label="Fine" value="Fine" name="condition" type="radio"/>
                        <Form.Check required inline label="Good" value="Good" name="condition" type="radio"/>
                        <Form.Check required inline label="Excellent" value="Excellent" name="condition" type="radio"/>
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            required
                            className="mb-3"
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                        {selectedImage && (
                            <Image className="uploaded-image" alt="not found" src={URL.createObjectURL(selectedImage)} />
                        )}
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Add Item
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}