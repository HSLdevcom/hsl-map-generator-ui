import React from "react";
import Button from "./Button";
import style from "./RouteMapConfigurator.css";
import DayPicker from "./DayPicker";

const RouteMapConfigurator = ({
    generateRouteMap,
    build,
    date,
    setDate,
    setPosterName,
    posterName,
}) => {
    let input = null;

    return (
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
                    <div className={style.title}>Tunnus</div>
                    <div className={style.value}>
                        <input
                            ref={(el) => { (input) = el; }}
                            className={style.input}
                            value={posterName}
                            onChange={() => setPosterName(input.value)}
                            placeholder="nimi/tunnus"
                        />
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
                disabled={!build || !build.id || !posterName}
                onClick={generateRouteMap}
            >
                Generoi
            </Button>
        </div>
    );
};


export default RouteMapConfigurator;
