import ResData from "./ResData";

const Res = (props) => {
    const reservations = props.resuser;

    return(
        <div>
            {reservations.map((res) => {
                return(<ResData
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

export default Res;