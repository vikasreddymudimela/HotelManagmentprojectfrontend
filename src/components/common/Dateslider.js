import React from "react";
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"
import { DateRangePicker } from "react-date-range";
import { useState } from "react";

const DateSlider = ({onDateChange,onFilterChange}) => {
    const[dateRange,setdaterange] = useState({
        startDate:undefined,
        endDate:undefined,
        key:"selection" //uniquely identify a daterange
    })
const handleselect = (ranges) => {
    setdaterange(ranges.selection)
    onDateChange(ranges.selection.startDate,ranges.selection.endDate)
    onFilterChange(ranges.selection.startDate,ranges.selection.endDate)
}
const handleclearfilter = () => {
    setdaterange({
        startDate:undefined,
        endDate:undefined,
        key:"selection"
    })
    onDateChange(null,null)
    onFilterChange(null,null)
}
return (
    <div>
        <h5>filter bookings by date</h5>
        <DateRangePicker ranges={[dateRange]} onChange={handleselect} className="mb-4"/>
        <button  className="btn btn-secondary" onClick={handleclearfilter} >
         Clear Filter
        </button>
    </div>
)

}

export default DateSlider;