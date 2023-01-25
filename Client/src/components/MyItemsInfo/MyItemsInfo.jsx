import { useEffect, useState } from "react";
import { Table, Badge } from "react-bootstrap";

import styles from "./MyItemsInfo.module.css"

export default function MyItemsInfo(props) {
    const [conditionsCount, setConditionsCount] = useState({});

    useEffect(() => {
        console.log(props.userId);
        fetch(`/users/${props.userId}/conditions`)
        .then((response) => response.json())
        .then((data) => {
            let conditions = {};
            data.forEach(element => {
                conditions[element._id] = element.count;
            });
            setConditionsCount(conditions);
        });
    }, [props.items, props.userId])
  
    return (
        <Table bordered className={styles.box}>
            <thead>
                <tr>
                    {Object.keys(props.conditionsColors).map((condition) =>
                        <th>
                            <Badge bg={props.conditionsColors[condition]}>
                                {condition}
                            </Badge>
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                <tr>
                    {Object.keys(props.conditionsColors).map((condition, index) =>
                        <td>
                            {conditionsCount[condition] || 0}
                        </td>
                    )}
                </tr>
            </tbody>
        </Table>
    )
}