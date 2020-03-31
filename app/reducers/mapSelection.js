import {fromJS} from "immutable";
import {
    UPDATE_CENTER,
    UPDATE_SIZE,
    UPDATE_DPI,
    UPDATE_MAP_SCALE,
    UPDATE_PIXEL_SCALE,
    UPDATE_SYMBOL
} from "../actions/mapSelection";
import {LOAD_STATE} from "../actions/fileOperations";
import ZoneSymbols from "../components/hsl-zones-publisher-v6.json";

const initialSymbols = () => {
    const zoneSymbols = [];
    ZoneSymbols.features.forEach((zone) => {
        zone.geometry.coordinates.forEach((coordinates) => {
            zoneSymbols.push({
                latitude: coordinates[1],
                longitude: coordinates[0],
                zone: zone.properties.Zone,
                id: zoneSymbols.length
            });
        });
    });
    return zoneSymbols;
};

const initialState = fromJS({
    center: [24.9, 60.2],
    size: [300, 300],
    dpi: 300,
    mapScale: 10000,
    pixelScale: 1,
    zoneSymbols: initialSymbols()
});

export default function mapSelection(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CENTER:
            return state.set("center", fromJS(action.center.lngLat));
        case UPDATE_SIZE:
            return state.set("size", fromJS(action.size));
        case UPDATE_DPI:
            return state.set("dpi", action.dpi);
        case UPDATE_MAP_SCALE:
            return state.set("mapScale", action.mapScale);
        case UPDATE_PIXEL_SCALE:
            return state.set("pixelScale", action.pixelScale);
        case LOAD_STATE:
            return action.state.mapSelection;
        case UPDATE_SYMBOL: {
            const zoneSymbols = state.get("zoneSymbols");
            const newZoneSymbols = zoneSymbols.map((symbol) => {
                if (action.symbol.get("id") === symbol.get("id")) {
                    return action.symbol;
                }
                return symbol;
            });
            return state.set("zoneSymbols", newZoneSymbols);
        }
        default:
            return state;
    }
}
