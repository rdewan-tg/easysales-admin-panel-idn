import { Box } from "@mui/material"
import { Outlet } from "react-router-dom";


const SiteVisitPage =() => {
    return  (
        <Box>
            <Outlet />
        </Box>
    )
}

export default SiteVisitPage;