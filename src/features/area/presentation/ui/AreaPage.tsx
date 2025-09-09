import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";


const AreaPage = () => {
    return (
        <Box>
            <Outlet />
        </Box>
    );
};

export default AreaPage;
