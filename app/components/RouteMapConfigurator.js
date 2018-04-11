import React from "react";
import Button from "./Button";
import style from "./RouteMapConfigurator.css";
import DayPicker from "./DayPicker";

const RouteMapConfigurator = ({ generateRouteMap, build, date, setDate }) => (
    <div className={style.container}>
        <div>
            <div className={style.header}>Valinnat</div>
            <div className={style.element}>
                <div className={style.title}>Lista</div>
                <div className={style.value}>
                    { build && build.title }
                    { (!build || !build.title) && "-" }
                </div>
            </div>
            <div className={style.element}>
                <div className={style.title}>Päivämäärä</div>
                <div className={style.value}>
                    <DayPicker
                        value={date}
                        onChange={value => setDate(value)}
                    />
                </div>
            </div>
        </div>
        <Button
            styleClass="lightWithBorder"
            disabled={!build || !build.id}
            onClick={generateRouteMap}
        >
            Generoi
        </Button>
    </div>
);

export default RouteMapConfigurator;
