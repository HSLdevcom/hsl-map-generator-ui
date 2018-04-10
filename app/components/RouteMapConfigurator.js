import React from "react";
import Button from "./Button";
// import style from "./RouteMapConfigurator.css";

const RouteMapConfigurator = ({ generateRouteMap }) => (
    <div>
        <Button styleClass="lightWithBorder" onClick={generateRouteMap}>Generoi</Button>
    </div>
);

export default RouteMapConfigurator;
