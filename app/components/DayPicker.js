import PropTypes from "prop-types";
import React from "react";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import styles from "./DayPicker.css";

const valueFormat = "YYYY-MM-DD";
const displayFormat = "D.M.YYYY";

const style = {
    fontSize: 15,
    fontFamily: "Nunito, Arial, Helvetica, Helvetica Neue, sans-serif",
    fontWeight: 200,
    color: "#ddd",
    background: "#555",
    border: "none",
    borderBottom: "1px solid #666",
    outlineWidth: 0
};

const disabledStyle = {
    ...style,
    color: "#878585"
};

const dayPickerProps = {
    firstDayOfWeek: 1,
    weekdaysShort: ["Su", "Ma", "Ti", "Ke", "To", "Pe", "La"],
    months: [
        "Tammikuu",
        "Helmikuu",
        "Maaliskuu",
        "Huhtikuu",
        "Toukokuu",
        "Kesäkuu",
        "Heinäkuu",
        "Elokuu",
        "Syyskuu",
        "Lokakuu",
        "Marraskuu",
        "Joulukuu"
    ]
};

const CustomOverlay = ({classNames, children, ...props}) => {
    return (
        <div
            className={classNames.overlayWrapper}
            style={{marginLeft: -45}}
            {...props}>
            <div className={classNames.overlay}>{children}</div>
        </div>
    );
};

const DayPicker = (props) => (
    <div className={styles.container}>
        {props.disabled && (
            <input
                style={disabledStyle}
                value={moment(props.value, valueFormat).format(displayFormat)}
                disabled
            />
        )}
        {!props.disabled && (
            <DayPickerInput
                overlayComponent={CustomOverlay}
                inputProps={{style}}
                format={displayFormat}
                value={moment(props.value).format(valueFormat)}
                dayPickerProps={dayPickerProps}
                onDayChange={(date) =>
                    props.onChange(moment(date).format(valueFormat))
                }
            />
        )}
    </div>
);

DayPicker.defaultProps = {
    disabled: false
};

DayPicker.propTypes = {
    value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
        .isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default DayPicker;
