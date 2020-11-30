import React from "react";
import moment from "moment";
import Modal from "react-modal";

import styles from "./ShowListModalItem.css";
import {downloadPoster, removePoster} from "../utils/publisher-api";
import Button from "./Button";

const FINISHED_MESSAGE = "Rendered successfully";

function getColorFromStatus(status) {
    switch (status) {
        case "READY":
            return "#66cc66";
        case "PENDING":
            return "#ffff19";
        case "FAILED":
            return "#ff4848";
        default:
            return "#afafaf";
    }
}

function getBuildTime(item) {
    if (item.status !== "READY") return null;
    const finishedEvent = item.events.filter(
        (event) => event.message === FINISHED_MESSAGE
    );
    const created = moment(item.createdAt);
    const finished = moment(finishedEvent[0].createdAt);
    const timeDiff = finished.diff(created);
    const tempTime = moment.duration(timeDiff);
    return {
        hours: tempTime.hours(),
        minutes: tempTime.minutes(),
        seconds: tempTime.seconds()
    };
}

function getTime(buildTime) {
    if (!buildTime) return null;
    const hours = buildTime.hours !== 0 ? `${buildTime.hours}h ` : "";
    const minutes = buildTime.minutes !== 0 ? `${buildTime.minutes}min ` : "";
    const seconds = buildTime.seconds !== 0 ? `${buildTime.seconds}s ` : "";
    return `${hours}${minutes}${seconds}`;
}

const ShowListModalItem = ({item, openLogId, openLog, closeLog}) => {
    const buildTime = getBuildTime(item);
    const time = getTime(buildTime);
    return (
        <div className={styles.container}>
            <div
                className={styles.text}
                data-cy={item.props.configuration.name}>
                <span className={styles.itemName}>
                    {item.props.configuration.name &&
                        item.props.configuration.name}
                    {!item.props.configuration.name && "- Nimetön -"}
                </span>
                <span
                    className={styles.pill}
                    style={{backgroundColor: getColorFromStatus(item.status)}}>
                    {item.status}
                </span>
                <br />
                Lisätty: {moment(item.createdAt).format("D.M.YYYY HH:mm")}
                <br />
                Kohde päivämäärä:{" "}
                {moment(item.props.configuration.date).format("D.M.YYYY")}
                {time ? <br /> : ""}
                {time ? `Generointiaika: ${time}` : ""}
            </div>
            <div className={styles.buttons}>
                <Button
                    onClick={() => downloadPoster({id: item.id})}
                    disabled={item.status !== "READY"}>
                    Lataa
                </Button>
                <Button onClick={() => openLog(item.id)}>Log</Button>
                {item.status === "PENDING" && (
                    <Button onClick={() => removePoster(item)}>Keskeytä</Button>
                )}
                {item.status === "FAILED" && (
                    <Button onClick={() => removePoster(item)}>Poista</Button>
                )}
                <Modal
                    isOpen={openLogId && openLogId === item.id}
                    onRequestClose={closeLog}>
                    <div className={styles.log}>
                        <h3>Log</h3>
                        {item.events.map((event) => (
                            <p key={event.createdAt}>{event.message}</p>
                        ))}
                        <Button onClick={closeLog}>Sulje</Button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default ShowListModalItem;
