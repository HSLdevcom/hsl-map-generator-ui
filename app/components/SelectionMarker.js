import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import styles from './Marker.css';
import { mapSelectionToBbox } from "../utils/geom-utils";
import { List } from 'immutable';

const SelectionMarker = ({ map, center, mapSelection, mapSelectionSize, updateSelectionSize, updateCenter }) => {
    const markerRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!map) return;

        if (!mapSelectionSize) {
            const newCenter = List([24.9, 60.2]);
            const updatedMapSelection = mapSelection.set("center", newCenter);
            updateSelectionSize(updatedMapSelection);
            return;
        }

        const markerElement = document.createElement('div');
        const markerDotElement = document.createElement('div');
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
            redrawSelectionWindow(map, canvasRef.current, updatedMapSelection);
        };

        const handleDragEnd = (e) => {
            const lngLat = e.target.getLngLat();
            const newCenter = List([lngLat.lng, lngLat.lat]);
            const updatedMapSelection = mapSelection.set("center", newCenter);
            updateSelectionSize(updatedMapSelection);
            redrawSelectionWindow(map, canvasRef.current, updatedMapSelection);
            updateCenter(newCenter);
        };

        const handleMapMove = (e) => {
            const newCenter = List([center.get(0), center.get(1)]);
            const updatedMapSelection = mapSelection.set("center", newCenter);
            redrawSelectionWindow(map, canvasRef.current, updatedMapSelection);
        };

        const handleZoomEnd = (e) => {
            const updatedMapSelection = mapSelection.set("center", [center.get(0), center.get(1)]);
            updateSelectionSize(updatedMapSelection);
        };

        marker.on('drag', handleDrag);
        marker.on('dragend', handleDragEnd);
        map.on('move', handleMapMove);
        map.on('zoomend', handleZoomEnd);

        markerRef.current = marker;
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.pointerEvents = 'none';
        map.getContainer().appendChild(canvas);
        canvasRef.current = canvas;
        redrawSelectionWindow(map, canvasRef.current, mapSelection);

        return () => {
            marker.off('drag', handleDrag);
            marker.off('dragend', handleDragEnd);
            map.off('move', handleMapMove);
            map.off('zoomend', handleZoomEnd);
            marker.remove();
            canvas.remove();
        };
    }, [map, center, mapSelection, mapSelectionSize]);

    return null;
};


function redrawSelectionWindow(map, canvas, mapSelection) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = map.getCanvas().width;
    canvas.height = map.getCanvas().height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const bbox = mapSelectionToBbox(mapSelection);
    const nw = map.project(bbox[0]);
    const se = map.project(bbox[1]);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(nw.x, nw.y, se.x - nw.x, se.y - nw.y);
}

export default SelectionMarker;
