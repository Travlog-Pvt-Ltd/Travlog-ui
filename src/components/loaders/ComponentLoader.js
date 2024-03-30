import { CircularProgress } from "@mui/material"

import classes from "./Loaders.module.css"

const ComponentLoader = ({className}) => {
    return(
        <div className={`${classes['component-loader']} ${className}`}><CircularProgress color="secondary" /></div>
    )
}

export default ComponentLoader