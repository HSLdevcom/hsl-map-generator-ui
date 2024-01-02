import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import ZoneSymbolMarkers from "./ZoneSymbolMarkers";
import SelectionMarker from "../containers/SelectionMarker";

const MapComponent = ({
    viewport,
    updateViewport,
    style,
    mapWidth,
    mapHeight,
    zoneSymbols,
    updateSymbol,
    showZoneSymbols,
    symbolSize,
    mapSelectionSize
}) => {
    const mapContainerRef = useRef(null);
    const [map, setMap] = useState(null);
    useEffect(() => {
        const newMap = new maplibregl.Map({
            container: mapContainerRef.current,
            style,
            center: [viewport.longitude, viewport.latitude],
            zoom: viewport.zoom
        });

        setMap(newMap);

        return () => newMap.remove();
    }, []);

    useEffect(() => {
        if (!map) {
            return () => {};
        }

        const onChange = () => {
            updateViewport({
                longitude: map.getCenter().lng,
                latitude: map.getCenter().lat,
                zoom: map.getZoom()
            });
        };

        map.on("zoomend", onChange);
        map.on("moveend", onChange);

        return () => {
            map.off("zoomend", onChange);
            map.off("moveend", onChange);
        };
    }, [map]);
    return (
        <div ref={mapContainerRef} style={{width: "100%", height: "100%"}}>
            <SelectionMarker
                map={map}
                center={[viewport.longitude, viewport.latitude]}
                mapSelectionSize={mapSelectionSize}
            />
            {showZoneSymbols && (
                <ZoneSymbolMarkers
                    map={map}
                    zoneSymbols={zoneSymbols}
                    updateSymbol={updateSymbol}
                    symbolSize={symbolSize}
                    mapWidth={mapWidth}
                    mapHeight={mapHeight}
                    mapSelectionSize={mapSelectionSize}
                />
            )}
        </div>
    );
};
MapComponent.propTypes = {
    viewport: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
    }).isRequired
};

export default MapComponent;
