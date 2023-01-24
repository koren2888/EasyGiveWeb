import { Badge, Dropdown, Card } from 'react-bootstrap';

import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai"

import styles from "./MyItemCard.module.css";

export default function MyItemCard(props) {
    const conditionColor = {
        "Fine": "secondary",
        "Good": "info",
        "Excellent": "success"
    }

    return (
        <Card className={styles.item}>
            <Card.Img className={styles.item_image} variant="top" src={`/item/image/${props.imagePath}`} />
            <Card.Body className={`pb-2 ${styles.item_body}`}>
                <Card.Title className={styles.item_header}>
                    <span>
                        {props.itemType}
                        <Badge className="ms-2" bg={conditionColor[props.condition]}>
                            {props.condition}
                        </Badge>
                    </span>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-dark" id={styles.item_dropdown_toggle}>
                            <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            <Dropdown.Item onClick={props.editItem}>
                                <AiOutlineEdit className={`me-2 ${styles.icon}`}/>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={props.deleteItem}>
                                <AiOutlineDelete className={`me-2 ${styles.icon}`} />
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Title>
            </Card.Body>
        </Card>
    );
}
