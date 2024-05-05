import { IconButton, Drawer } from "@mui/material";
import close from "@assets/logos/Close.svg"

const CustomDrawer = ({
    position,
    openDrawer,
    setOpenDrawer,
    children,
    showCloseIcon = true,
    mobile,
    onClose = () => { },
}) => {
    const handleClose = () => {
        setOpenDrawer && setOpenDrawer(false);
        onClose();
    };

    return (
        <Drawer
            PaperProps={{
                style: {
                    maxHeight: mobile ? '80vh' : 'auto',
                    minWidth: "auto",
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                },
            }}
            anchor={position} open={openDrawer} onClose={handleClose}>
            {!!showCloseIcon && (
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "black",
                        width:"40px",
                        height:"40px"
                    }}
                >
                    <img src={close.src} alt="Close drawer" />
                </IconButton>
            )}
            {children}
        </Drawer>
    );
};

export default CustomDrawer;
