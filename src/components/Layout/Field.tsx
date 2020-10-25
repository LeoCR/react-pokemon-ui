import React from 'react'
import {TextField,makeStyles,TextFieldProps} from "@material-ui/core";

const useStyle=makeStyles({
    root:{
        width: '100%',
        float:'left',
        background:'#ececec',
        '& .MuiFormLabel-root.Mui-focused':{
            color:'#000000'
        },
        '& .MuiInput-underline::after':{
            borderBottom: '2px solid #a00606'
        }
    }
})

export const Field = (props:TextFieldProps) => {
    const classes=useStyle();

    return (
        <TextField {...props} className={classes.root}/>
    )
}
export default Field;