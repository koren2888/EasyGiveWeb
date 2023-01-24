import { Badge, Card } from 'react-bootstrap';

import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

import styles from "./ItemCard.module.css";

export default function MyItemCard(props) {
    const conditionColor = {
        "Fine": "secondary",
        "Good": "info",
        "Excellent": "success"
    }

    return (
        <Card className={styles.item}>
            { props.isFavorite? <MdFavorite onClick={props.setFavorite} className={styles.fav_icon} />
            : <MdFavoriteBorder onClick={props.setFavorite} className={styles.fav_icon} />}
            
            <Card.Img className={styles.item_image} variant="top" src={`/item/image/${props.imagePath}`} />
            <Card.Body className={`${styles.item_body}`}>
                <Card.Title className={styles.item_header}>
                    {props.itemType}
                    <Badge className="ms-2" bg={conditionColor[props.condition]}>{props.condition}</Badge>
                </Card.Title>
                <b>In Rishon Letsion</b>
            </Card.Body>
        </Card>
    );
}
