import { Badge, Dropdown, Card } from 'react-bootstrap';

import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"

import "./MyItemCard.css";

export default function MyItemCard(props) {
    const conditionColor = {
        "Fine": "secondary",
        "Good": "info",
        "Excellent": "success"
    }

    return (
        <Card className='my-item'>
            <Card.Img className='item-image' variant="top" src={`http://localhost:3001/item/image/${props.imagePath}`} />
            <Card.Body className='pb-2'>
                <Card.Title className='my-item-header'>
                    <span>
                        {props.itemType}
                        <Badge className="ms-2" bg={conditionColor[props.condition]}>{props.condition}</Badge>
                    </span>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-dark" id="item-dropdown-toggle">
                            <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={props.editItem}>
                                <AiOutlineEdit className='icon me-2'/>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={props.deleteItem}>
                                <AiOutlineDelete className='icon me-2' />
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}
