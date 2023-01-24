import { Button, Form, Row, Col } from 'react-bootstrap';
import { FiFilter } from 'react-icons/fi';

import SelectCity from "./SelectCity";

import styles from "./FilterHeader.module.css";

export default function MyItemCard(props) {
    const conditions = ["Fine", "Good", "Excellent"];

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        let filters = {}
        event.preventDefault();
        event.stopPropagation();
        
        if (form.itemType.value) {
            filters["itemType"] = form.itemType.value;
        }

        let checked_consitions = conditions.filter(value => {
            return form[value].checked;
        });
        if (checked_consitions.length > 0) {
            filters["conditions"] = checked_consitions;
        }

        console.log(form.city.value);
        
        props.setFilters(filters);
    }

    return (
        <Form className={styles.box} onSubmit={handleSubmit}>
            <Row className="m-0">
                <Form.Group as={Col}>
                    <Form.Label>Item Type</Form.Label>
                    <Form.Control name="itemType"/>
                </Form.Group>
                
                <Form.Group as={Col}>
                    <Form.Label>Condition</Form.Label>
                    <br />
                    { conditions.map(value =>
                        <Form.Check inline key={value} name={value} label={value} value={value} />
                    )}
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>City</Form.Label>
                    <SelectCity />
                </Form.Group>
            </Row>
            <Button className={styles.filter_button} type="submit" variant='outline-dark'>
                <FiFilter className={styles.filter_icon} />
                Filter
            </Button>
        </Form>
    );
}
