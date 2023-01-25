import { useState } from 'react';

import { Modal, Button, Image, Form } from 'react-bootstrap';

import styles from "./AddItemModal.module.css";

export default function EditItemModal(props) {
    const [validated, setValidated] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const conditions = ["Fine", "Good", "Excellent"];
    
    const onModalStart = () => {
        setSelectedImage(null);
        setValidated(false);
    }
    
    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            let formData = new FormData();
            if (selectedImage) {
                formData.append('file', selectedImage);
            }
            formData.append("itemType", form.itemType.value);
            formData.append("condition", form.condition.value);
            await fetch(`/item/${props.item._id}`, {
                method: 'POST',
                body: formData
            })
        }
        setValidated(true);
    };

    const getImage = () => {
        if (selectedImage) {
            return URL.createObjectURL(selectedImage);
        }
        return `/item/image/${props.item.imagePath}`;
    }

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            onEnter={onModalStart}
            centered>
                
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Type</Form.Label>
                        <Form.Control required name="itemType" defaultValue={props.item.itemType}/>
                        <Form.Text>Example: Sofa / Chair / Desk / Book etc.</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Condition</Form.Label>
                        <br />
                        {conditions.map((value) =>
                            <Form.Check
                                key={value}
                                required inline
                                label={value} value={value}
                                name="condition" type="radio"
                                defaultChecked={props.item.condition === value}
                            />
                        )}
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            className="mb-3"
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                                setSelectedImage(event.target.files[0]);
                            }}
                        />
                        <Image className={styles.uploaded_image} alt="not found" src={getImage()} />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        Update Item
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}