import {
    AppBar,
    Box,
    Tab,
    Tabs,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

const tabRoutes = ["/overview", "/two", "/three", "/four"];

export default function MainLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const currentTab = tabRoutes.findIndex((path) =>
        location.pathname.startsWith(path)
    );

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        navigate(tabRoutes[newValue]);
    };

    return (
        <Box sx={{minHeight: "100vh", display: "flex", flexDirection: "column"}} className={'bg-light'}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{flexGrow: 1, fontWeight: 700}}>
                        SMART PARKING
                    </Typography>
                </Toolbar>
            </AppBar>

            <Box sx={{flexGrow: 1, display: "flex", flexDirection: isMobile ? "column" : "row"}}>
                <Tabs
                    orientation={isMobile ? "horizontal" : "vertical"}
                    variant="scrollable"
                    value={currentTab === -1 ? 0 : currentTab}
                    onChange={handleChange}
                    sx={{
                        borderRight: isMobile ? 0 : 1,
                        borderBottom: isMobile ? 1 : 0,
                        borderColor: "divider",
                        minWidth: isMobile ? "100%" : 200,
                        "& .MuiTab-root": {
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            textAlign: "left",
                        },
                    }}
                    className={isMobile ? "py-0 bg-white shadow" : "py-4 bg-white shadow"}
                >
                    <Tab label="Overview"/>
                    <Tab label="AI MANAGER"/>
                    <Tab label="REPORT"/>
                    <Tab label="SETTINGS"/>
                </Tabs>

                <Box
                    sx={{
                        flexGrow: 1,
                        p: {xs: 2, md: 4},
                        overflow: "auto",
                    }}
                >
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    );
}
