import LineData from './LineData';

const Lines = (props) => {
    const lines = props.traindata;

    return(
        <div className='mt-6'>
            {lines.map((train) => {
                return (<LineData
                        trainId={train.myownid}
                        from={train.from}
                        to={train.to}
                        weekday={train.weekday}
                        hour={train.hour}
                        userid={props.userid}
                        ticketprice={train.ticketprice}
                        traintype={train.traintype}
                        usertype={props.type}
                        callback={props.callback}
                        />)
            })}
        </div>
    )
}

export default Lines;