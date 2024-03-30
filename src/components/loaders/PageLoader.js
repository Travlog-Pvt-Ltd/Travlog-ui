import { Backdrop, CircularProgress } from "@mui/material"

const PageLoader = ({open}) => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: 5 }}
            open={open}
        >
            <CircularProgress color="secondary" />
        </Backdrop>
    )
}

export default PageLoader