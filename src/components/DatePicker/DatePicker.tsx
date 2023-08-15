import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { TextField } from '@mui/material'
// import DatePicker from '@mui/lab/DatePicker'
import styled from 'styled-components'
// import dayjs from "dayjs";
import * as React from 'react'
// import { useEffect } from "react";

const CustomMobileDatePicker = styled(MobileDatePicker)`
  .MuiInputBase-root {
    font-size: 16px;
    width: 90%;
    background-color: white;
    height: 40px;
  }
`
const CustomTextField = styled(TextField)`
  background-color: red;
  border-radius: 8px;
`

const DatePickerCus = ({ Title, handleChange, name, value = null }: any) => {
  // const [valuei, setValue] = React.useState(value);
  // useEffect(() => {
  //   setValue(value);
  // }, []);
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CustomMobileDatePicker
          label={Title}
          value={value}
          onChange={(newValue) => {
            console.log(newValue)
          }}
          className='date'
          renderInput={(params) => <CustomTextField size='small' />}
        />
      </LocalizationProvider>
    </>
  )
}

export default DatePickerCus
