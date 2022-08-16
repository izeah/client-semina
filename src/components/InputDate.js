import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { DateRange, DefinedRange } from "react-date-range";
import * as locales from "react-date-range/dist/locale";

function InputDate({ date, onChangeDate, setIsShowed }) {
    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const refDate = React.useRef(null);
    const handleClickOutside = (event) => {
        if (refDate && !refDate.current.contains(event.target)) {
            setIsShowed(false);
        }
    };

    const check = (focus) => {
        focus.indexOf(1) < 0 && setIsShowed(false);
    };

    return (
        <div
            className="position-absolute"
            style={{ zIndex: "4" }}
            ref={refDate}>
            <Row>
                <Col xs={6} sm={4} md={4}>
                    <DefinedRange onChange={onChangeDate} ranges={[date]} />
                </Col>
                <Col xs={6} sm={4} md={4}>
                    <DateRange
                        locale={locales["id"]}
                        editableDateInputs={true}
                        onChange={onChangeDate}
                        moveRangeOnFirstSelection={false}
                        onRangeFocusChange={check}
                        ranges={[date]}
                        maxDate={new Date()}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default InputDate;
