import apiUrl from "../utils/constants/apiUrl";

const routes = {
    // auth system
    loginRoute : `${apiUrl}/login`,
    registrationRoute : `${apiUrl}/register`,
    // checking train data and searching
    trainsRoute : `${apiUrl}/trains`,
    searchTrainRoute : `${apiUrl}/searchtrain`,
    insertTrainRoute : `${apiUrl}/inserttrain`,
    deleteTrainRoute : `${apiUrl}/deletetrain`,
    // reservations
    makeReservationRoute : `${apiUrl}/makereservation`,
    deleteReservationRoute : `${apiUrl}/deletereservation`,
    checkReservationRoute : `${apiUrl}/checkreservation`
}

export default routes;