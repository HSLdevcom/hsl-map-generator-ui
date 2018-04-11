import React from "react";
import moment from "moment";
import { ModalContainer, ModalDialog } from "react-modal-dialog";

import styles from "./ShowListModalItem.css";
import { downloadPoster } from "../utils/publisher-api";
import Button from "./Button";

function getColorFromStatus(status) {
    switch (status) {
        case "READY": return "#66cc66";
        case "PENDING": return "#ffff19";
        case "FAILED": return "#ff4848";
        default: return "#afafaf";
    }
}

const ShowListModalItem = ({ item, openLogId, openLog, closeLog }) => (
    <div className={styles.container}>
        <div className={styles.text}>
            <span className={styles.itemName}>
                {item.props.name && item.props.name}
                {!item.props.name && "- Nimetön -"}
            </span>
            <span
                className={styles.pill}
                style={{ backgroundColor: getColorFromStatus(item.status) }}
            >{item.status}</span>
            <br/>
            Lisätty: {moment(item.createdAt).format("D.M.YYYY HH:mm")}
            <br/>
            Kohde päivämäärä: {moment(item.props.date).format("D.M.YYYY")}
        </div>
        <div className={styles.buttons}>
            <Button onClick={() => downloadPoster({ id: item.id })} disabled={item.status !== "READY"}>
                Lataa
            </Button>
            <Button onClick={() => openLog(item.id)}>
                Log
            </Button>
            { openLogId && openLogId === item.id &&
                <ModalContainer onClose={closeLog}>
                    <ModalDialog onClose={closeLog}>
                        <div className={styles.log}>
                            <h3>Log</h3>
                            {
                                item.events.map(event => (
                                    <p>{event.message}</p>
                                ))
                            }
                        </div>
                    </ModalDialog>
                </ModalContainer>
            }
        </div>
    </div>
);

export default ShowListModalItem;
