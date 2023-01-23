import { Modal, Button } from 'react-bootstrap';

export default function DeleteItemModal(props) {

    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            centered
        >
            <Modal.Body>
                <h4>Are you sure you want to delete the item <b>{props.item.itemType}</b>?</h4>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" type="submit" onClick={props.deleteItem}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}