import {useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";
import {List} from "immutable";
import {mapSelectionToBbox} from "../utils/geom-utils";
import styles from "./Marker.css";

function redrawSelectionWindow({
    map,
    canvas,
    mapSelection,
    updateSelectionSize
}) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    // eslint-disable-next-line no-param-reassign
    canvas.width = map.getCanvas().width;
    // eslint-disable-next-line no-param-reassign
    canvas.height = map.getCanvas().height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bbox = mapSelectionToBbox(mapSelection);
    const nw = map.project(bbox[0]);
    const se = map.project(bbox[1]);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(nw.x, nw.y, se.x - nw.x, se.y - nw.y);
    const selectionWidth = Math.abs(nw.x - se.x);
    const selectionHeight = Math.abs(nw.y - se.y);
    if (updateSelectionSize) {
        updateSelectionSize([selectionWidth, selectionHeight]);
    }
}

const SelectionMarker = ({
    map,
    center,
    mapSelection,
    mapSelectionSize,
    updateSelectionSize,
    updateCenter
}) => {
    const markerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!map) {
            return () => {};
        }

        if (!mapSelectionSize) {
            const newCenter = List([24.9, 60.2]);
            const updatedMapSelection = mapSelection.set("center", newCenter);
            updateSelectionSize([
                updatedMapSelection.get("size").get(0),
                updatedMapSelection.get("size").get(1)
            ]);
            return () => {};
        }

        const markerElement = document.createElement("div");
        const markerDotElement = document.createElement("div");
        markerElement.className = styles.marker;
        markerDotElement.className = styles.markerDot;
        markerElement.appendChild(markerDotElement);
        const marker = new maplibregl.Marker({
            element: markerElement,
            draggable: true
        })
            .setLngLat([center.get(0), center.get(1)])
            .addTo(map);

        const handleDrag = (e) => {
            const lngLat = e.target.getLngLat();
            const newCenter = List([lngLat.lng, lngLat.lat]);
            const updatedMapSelection = mapSelection.set("center", newCenter);
            redrawSelectionWindow({
                map,
                canvas: canvasRef.current,
                mapSelection: updatedMapSelection
            });
        };

        const handleDragEnd = (e) => {
            const lngLat = e.target.getLngLat();
            const newCenter = List([lngLat.lng, lngLat.lat]);
            updateCenter(newCenter);
            const updatedMapSelection = mapSelection.set("center", newCenter);
            redrawSelectionWindow({
                map,
                canvas: canvasRef.current,
                mapSelection: updatedMapSelection,
                updateSelectionSize
            });
        };

        const handleMapMove = () => {
            redrawSelectionWindow({
                map,
                canvas: canvasRef.current,
                mapSelection
            });
        };

        const handleZoomEnd = () => {
            redrawSelectionWindow({
                map,
                canvas: canvasRef.current,
                mapSelection,
                updateSelectionSize
            });
        };

        marker.on("drag", handleDrag);
        marker.on("dragend", handleDragEnd);
        map.on("move", handleMapMove);
        map.on("zoomend", handleZoomEnd);

        markerRef.current = marker;
        const canvas = document.createElement("canvas");
        canvas.style.position = "absolute";
        canvas.style.top = "0";
        canvas.style.pointerEvents = "none";
        map.getContainer().appendChild(canvas);
        canvasRef.current = canvas;
        redrawSelectionWindow({
            map,
            canvas: canvasRef.current,
            mapSelection,
            updateSelectionSize
        });

        return () => {
            marker.off("drag", handleDrag);
            marker.off("dragend", handleDragEnd);
            map.off("move", handleMapMove);
            map.off("zoomend", handleZoomEnd);
            marker.remove();
            canvas.remove();
        };
    }, [map, center, mapSelection, mapSelectionSize]);

    return null;
};

export default SelectionMarker;
