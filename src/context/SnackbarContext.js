'use client';

import { SnackbarProvider } from "notistack";

function SnackProvider({ children }) {
    return (
        <SnackbarProvider
            autoHideDuration={2000}
            maxSnack={3}
        >
            {children}
        </SnackbarProvider>
    )
}

export default SnackProvider