import React from "react";
import moment from "moment";

import styles from "./ShowListModalItem.css";
import { downloadPoster } from "../utils/publisher-api";
import Button from "./Button";

const ShowListModalItem = ({ item }) => (
    <div className={styles.container}>
        <div className={styles.text}>
            <span className={styles.itemName}>
                {item.props.name && item.props.name}
                {!item.props.name && "- Nimetön -"}
            </span>
            <br/>
            Lisätty: {moment(item.createdAt).format("D.M.YYYY HH:mm")}
            <br/>
            Kohde päivämäärä: {moment(item.props.date).format("D.M.YYYY")}
        </div>
        {item.status === "READY" &&
            <Button onClick={() => downloadPoster({ id: item.id })}>
                Lataa
            </Button>
        }
    </div>
);

export default ShowListModalItem;
