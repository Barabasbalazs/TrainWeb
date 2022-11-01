import apiUrl from "../utils/constants/apiUrl";

const routes = {
    lineRoute : `${apiUrl}/lines`,
    searchRoute : `${apiUrl}/searchlines`,
    authRoute : `${apiUrl}/userdata`,
    insertTrainRoute : `${apiUrl}/insert`,
    deleteTrainRoute : `${apiUrl}/deletetrain`,
    reservationRoute : `${apiUrl}/mr`,
    deleteReservationRoute : `${apiUrl}/deleteres`,
    registrationRoute : `${apiUrl}/register`,
    checkReservationRoute : `${apiUrl}/checkres`
}

export default routes;