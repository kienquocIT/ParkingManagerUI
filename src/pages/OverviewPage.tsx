import {Box, Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowDown,
    faArrowUp,
    faBan, faCar,
    faCircle,
    faCircleCheck, faCircleExclamation, faLightbulb, faRobot,
    faSignal,
    faSquareParking
} from "@fortawesome/free-solid-svg-icons";
import {getAllParkingSlots} from "../services/ParkingSlotService"
import {getParkingPrediction, getParkingPredictionMAE} from "../services/ParkingPredictionService.tsx";
import {useEffect, useState} from "react";

// Mock Data
const parking_slot = [
    { "code": "1", "isEmpty": true },
    { "code": "2", "isEmpty": false },
    { "code": "3", "isEmpty": true },
    { "code": "4", "isEmpty": false },
    { "code": "5", "isEmpty": true },
    { "code": "6", "isEmpty": false },
    { "code": "7", "isEmpty": true },
    { "code": "8", "isEmpty": false },
    { "code": "9", "isEmpty": true },
    { "code": "10", "isEmpty": false },

    { "code": "11", "isEmpty": true },
    { "code": "12", "isEmpty": false },
    { "code": "13", "isEmpty": true },
    { "code": "14", "isEmpty": false },
    { "code": "15", "isEmpty": true },
    { "code": "16", "isEmpty": false },
    { "code": "17", "isEmpty": true },
    { "code": "18", "isEmpty": false },
    { "code": "19", "isEmpty": true },
    { "code": "20", "isEmpty": false },

    { "code": "21", "isEmpty": true },
    { "code": "22", "isEmpty": false },
    { "code": "23", "isEmpty": true },
    { "code": "24", "isEmpty": false },
    { "code": "25", "isEmpty": true },
    { "code": "26", "isEmpty": false },
    { "code": "27", "isEmpty": true },
    { "code": "28", "isEmpty": false },
    { "code": "29", "isEmpty": true },
    { "code": "30", "isEmpty": false },

    { "code": "31", "isEmpty": true },
    { "code": "32", "isEmpty": false },
    { "code": "33", "isEmpty": true },
    { "code": "34", "isEmpty": false },
    { "code": "35", "isEmpty": true },
    { "code": "36", "isEmpty": false },
    { "code": "37", "isEmpty": true },
    { "code": "38", "isEmpty": false },
    { "code": "39", "isEmpty": true },
    { "code": "40", "isEmpty": false },

    { "code": "41", "isEmpty": true },
    { "code": "42", "isEmpty": false },
    { "code": "43", "isEmpty": true },
    { "code": "44", "isEmpty": false },
    { "code": "45", "isEmpty": true },
    { "code": "46", "isEmpty": false },
    { "code": "47", "isEmpty": true },
    { "code": "48", "isEmpty": false },
    { "code": "49", "isEmpty": true },
    { "code": "50", "isEmpty": false },

    { "code": "51", "isEmpty": true },
    { "code": "52", "isEmpty": false },
    { "code": "53", "isEmpty": true },
    { "code": "54", "isEmpty": false },
    { "code": "55", "isEmpty": true },
    { "code": "56", "isEmpty": false },
    { "code": "57", "isEmpty": true },
    { "code": "58", "isEmpty": false },
    { "code": "59", "isEmpty": true },
    { "code": "60", "isEmpty": false },

    { "code": "61", "isEmpty": true },
    { "code": "62", "isEmpty": false },
    { "code": "63", "isEmpty": true },
    { "code": "64", "isEmpty": false },
    { "code": "65", "isEmpty": true },
    { "code": "66", "isEmpty": false },
    { "code": "67", "isEmpty": true },
    { "code": "68", "isEmpty": false },
    { "code": "69", "isEmpty": true },
    { "code": "70", "isEmpty": false },

    { "code": "71", "isEmpty": true },
    { "code": "72", "isEmpty": false },
    { "code": "73", "isEmpty": true },
    { "code": "74", "isEmpty": false },
    { "code": "75", "isEmpty": true },
    { "code": "76", "isEmpty": false },
    { "code": "77", "isEmpty": true },
    { "code": "78", "isEmpty": false },
    { "code": "79", "isEmpty": true },
    { "code": "80", "isEmpty": false },

    { "code": "81", "isEmpty": true },
    { "code": "82", "isEmpty": false },
    { "code": "83", "isEmpty": true },
    { "code": "84", "isEmpty": false },
    { "code": "85", "isEmpty": true },
    { "code": "86", "isEmpty": false },
    { "code": "87", "isEmpty": true },
    { "code": "88", "isEmpty": false },
    { "code": "89", "isEmpty": true },
    { "code": "90", "isEmpty": false },

    { "code": "91", "isEmpty": true },
    { "code": "92", "isEmpty": false },
    { "code": "93", "isEmpty": true },
    { "code": "94", "isEmpty": false },
    { "code": "95", "isEmpty": true },
    { "code": "96", "isEmpty": false },
    { "code": "97", "isEmpty": true },
    { "code": "98", "isEmpty": false },
    { "code": "99", "isEmpty": true },
    { "code": "100", "isEmpty": false }
]

export default function OverviewPage() {
    const [parkingData, setParkingData] = useState({
        car_count: 0,
        free_spots: [{
            code: "",
            isEmpty: false,
        }],
        timestamp: "dd/mm/yyyy",
    });
    const [parkingDataPrediction, setParkingDataPrediction] = useState({
        prediction: 0,
        prediction_for: "dd/mm/yyyy",
        prediction_free: 0,
        mae: 0
    })

    useEffect(() => {
        const fetchParkingData = async () => {
            try {
                const data = await getAllParkingSlots();

                const freeSpotSet = new Set(
                    (data?.free_spots || []).map(String)
                );

                const updatedSlots = parking_slot.map(slot => ({
                    ...slot,
                    isEmpty: freeSpotSet.has(slot.code)
                }));

                console.log(updatedSlots);

                setParkingData({
                    car_count: data?.car_count ?? 0,
                    free_spots: updatedSlots,
                    timestamp: data?.timestamp
                        ? new Date(data.timestamp).toLocaleString("vi-VN")
                        : "dd/mm/yyyy",
                });

            } catch (err) {
                console.error(err);
            }
        };

        fetchParkingData();
    }, []);

    useEffect(() => {
        const fetchParkingDataPrediction = async () => {
            try {
                const data = await getParkingPrediction();
                const res_ma = await getParkingPredictionMAE();
                console.log(data);
                const format_data = {
                    prediction: data?.prediction,
                    prediction_for: data?.prediction_for
                        ? new Date(data.prediction_for).toLocaleString("vi-VN")
                        : "dd/mm/yyyy",
                    prediction_free: 100 - data?.prediction,
                    mae: res_ma.mae
                }
                setParkingDataPrediction(format_data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchParkingDataPrediction();
    }, []);

    return (
        <Box>
            {/*Title*/}
            <Typography variant={'h2'} fontWeight={'bold'}>OVERVIEW SYSTEM</Typography>
            <Typography color={'textSecondary'}>Update at {parkingData['timestamp']}</Typography>

            <br/>
            <br/>

            {/*Overview*/}
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    height: '100%',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography className={"h7 d-flex justify-content-between fw-bold"} component="div"  color={'textSecondary'}>
                                        Total
                                        <FontAwesomeIcon icon={faSquareParking} className={"fa-2x"}/>
                                    </Typography>
                                    <br/>
                                    <Typography variant="h3" color="textDark" fontWeight={'bold'}>
                                        100
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    height: '100%',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography className={"h7 d-flex justify-content-between fw-bold"} component="div"  color={'textSecondary'}>
                                        Used
                                        <FontAwesomeIcon icon={faBan} className={"fa-2x"}/>
                                    </Typography>
                                    <br/>
                                    <Typography variant="h3" color="textDark" fontWeight={'bold'}>
                                        {parkingData.car_count}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    height: '100%',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography className={"h7 d-flex justify-content-between fw-bold"} component="div"  color={'textSecondary'}>
                                        Available
                                        <FontAwesomeIcon icon={faCircleCheck} className={"fa-2x"}/>
                                    </Typography>
                                    <br/>
                                    <Typography variant="h3" color="textDark" fontWeight={'bold'}>
                                        {parkingData.free_spots.length}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3, md: 3 }}>
                        <Card>
                            <CardActionArea
                                sx={{
                                    height: '100%',
                                    '&[data-active]': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor: 'action.selectedHover',
                                        },
                                    },
                                }}
                            >
                                <CardContent sx={{ height: '100%' }}>
                                    <Typography className={"h7 d-flex justify-content-between fw-bold"} component="div"  color={'textSecondary'}>
                                        Fill rate
                                        <FontAwesomeIcon icon={faSignal} className={"fa-2x"}/>
                                    </Typography>
                                    <br/>
                                    <Typography variant="h3" color="textDark" fontWeight={'bold'}>
                                        {Number((parkingData?.car_count ?? 0).toFixed(1))}%
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
            </Grid>

            <br/>

            {/*Parking lot map*/}
            <Box className={"shadow-lg bg-white rounded p-5"}>
                <Typography variant={"h6"} fontWeight={"bold"} className={"mb-2"}>Parking lot map</Typography>
                {/*Note*/}
                <Box className={"d-flex gap-4"}>
                    <div className={"fs-8 text-success fw-bold"}>
                        <FontAwesomeIcon icon={faCircle} className={"me-1"}/>
                        Empty
                    </div>
                    <div className={"fs-8 text-danger fw-bold"}>
                        <FontAwesomeIcon icon={faCircle} className={"me-1"}/>
                        Used
                    </div>
                </Box>

                <br/>

                {/*lot map*/}
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {parkingData.free_spots.map((slot) => (
                        <Grid
                            key={slot.code}
                            size={{ xs: 12, sm: 1, md: 1 }}
                            className={'text-center rounded-5'}
                        >
                            <Box className={`${slot.isEmpty ? 'bg-outline-success' : 'bg-outline-danger'} rounded py-4 fw-bold`}>
                                {slot.code}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <br/>

            {/*Predict slot*/}
            <Box className={"shadow-lg bg-white rounded p-5"}>
                <Typography variant={"h6"} fontWeight={"bold"} className={"mb-2 d-flex justify-content-start align-items-center mb-4 gap-2 text-primary"}>
                    <Box className={"bg-primary text-light rounded-circle p-2"}><FontAwesomeIcon icon={faRobot} size={'xl'}/></Box>
                    Traffic prediction
                </Typography>

                <Box className={"bg-gradient bg-outline-primary p-4 rounded-5 mb-3"}>
                    <Typography variant={"h6"} fontWeight={"bold"} className={"text-center text-dark mb-2"}>
                        Expected occupancy rate
                    </Typography>
                    <Typography variant={"h1"} fontWeight={"bold"} className={"text-center text-gradient-primary mb-2"}>
                        {Number((parkingDataPrediction?.prediction ?? 0).toFixed(1))}%
                    </Typography>
                    <Box className={`d-flex justify-content-center align-items-center ${parkingDataPrediction?.prediction > parkingData?.car_count ? 'text-success' : 'text-danger'} gap-1`}>
                        <Box maxWidth={"max-content"} className={`${parkingDataPrediction?.prediction > parkingData?.car_count ? 'bg-outline-success' : 'bg-outline-danger'} px-2 rounded-pill fw-bold`}>
                            <FontAwesomeIcon icon={parkingDataPrediction?.prediction > parkingData?.car_count ? faArrowUp : faArrowDown} size={'sm'}/>
                            {parkingDataPrediction?.prediction > parkingData?.car_count ? (parkingDataPrediction?.prediction - parkingData?.car_count) : (parkingData?.car_count - parkingDataPrediction?.prediction)}%
                        </Box>
                        Compared to now
                    </Box>
                </Box>

                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} className={"mb-3"}>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Box className={"bg-outline-primary p-4 rounded-5"}>
                            <Typography className={"text-center text-dark mb-2 fw-bold"}>
                                <FontAwesomeIcon icon={faCar} className={"me-2"}/>
                                Expected number of cars
                            </Typography>
                            <Typography variant={"h3"} className={"text-center text-primary fw-bold"}>
                                {parkingDataPrediction?.prediction}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Box className={"bg-outline-primary p-4 rounded-5"}>
                            <Typography className={"text-center text-dark mb-2 fw-bold"}>
                                <FontAwesomeIcon icon={faCircleCheck} className={"me-2"}/>
                                Expected available
                            </Typography>
                            <Typography variant={"h3"} className={"text-center text-primary fw-bold"}>
                                {parkingDataPrediction?.prediction_free}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4, md: 4 }}>
                        <Box className={"bg-outline-primary p-4 rounded-5"}>
                            <Typography className={"text-center text-dark mb-2 fw-bold"}>
                                <FontAwesomeIcon icon={faCircleExclamation} className={"me-2"}/>
                                MAE
                            </Typography>
                            <Typography variant={"h3"} className={"text-center text-primary fw-bold"}>
                                {parkingDataPrediction?.mae}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Box className={'bg-gradient-blue-dark py-4 px-5 rounded-pill'}>
                    <Typography variant={"h6"} fontWeight={"bold"} className={"mb-2"}>
                        <FontAwesomeIcon icon={faLightbulb} className={"text-warning me-1"}/>
                        Smart suggestion
                    </Typography>
                    <Typography>
                        Traffic is projected to {parkingDataPrediction?.prediction > parkingData?.car_count ? 'increase' : 'decrease'} by {parkingDataPrediction?.prediction > parkingData?.car_count ? (parkingDataPrediction?.prediction - parkingData?.car_count) : (parkingData?.car_count - parkingDataPrediction?.prediction)}% in the next hour. It is recommended to prepare additional support staff and inform customers about the near-full capacity.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}