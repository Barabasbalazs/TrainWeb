import ReservationData from "./ReservationData";

const ReservationWrapper = (props) => {
    const reservations = props.resuser;

    return(
        <div>
            {reservations.map((res) => {
                return(<ReservationData
                        trainId={res.trainid}
                        userId={res.userid}
                        loggedinId={props.id}
                        loggedinName={props.name}
                        callback={props.callback}
                        />)
            })}
        </div>
    )
}

export default ReservationWrapper;