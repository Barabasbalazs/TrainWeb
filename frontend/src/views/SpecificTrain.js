import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Top from '../components/LoginComps/Top';
import Res from '../components/SpecificTrainComps/Res';
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Button} from 'react-bootstrap';
import '../styles/views/SpecificTrain.css';
import routes from '../router/index';

const { checkReservationRoute } = routes;

const SpecificTrain = () => {

    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies([]);
    const [user, setUser] = useState();
    const location = useLocation();
    const [state] = useState(location.state);
    const [resData,setResData] = useState();
    const [err,setErr] = useState({ 
      show: false,
      incorrectfield: ''
    });

    const fetchRes = () => {
        fetch(`${checkReservationRoute}?trainId=${state.trainId}`, {
                method: 'GET',
                headers: { Accept: 'application/json','Content-Type': 'application/json'},
                credentials: 'include',
            })
        .then((res) => res.json())
        .then((json) => {
            if (json.error === false) {
              setResData({
                  resuser: json.resuser
              })
            } else {
              setErr({
                show: true,
                incorrectfield: 'Error while loading data'
              })
            }
        })
        .catch(() => {
          setErr({
            show: true,
            incorrectfield: 'Error while loading data'
          })
        })    
    }

    useEffect(() => {
      fetchRes();
      setUser({
        name: localStorage.getItem('username'),
        type: localStorage.getItem('type'),
        id: localStorage.getItem('id'),
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
      
    const handleClose = () => {
      setErr({
        show: false,
        incorrectfield: ''
      })
    }  

    const authCallback = () => {
      setUser({
        name: localStorage.getItem('username'),
        type: localStorage.getItem('type'),
        id: localStorage.getItem('id'),
      });
    }

    return (
        <div className="bg-warning wrapper">
            {user && <Top
              authCallback = {authCallback}
              user = {user.name}
              type = {user.type}
            />}
            <div className='details'>    
              <div className='row'>
                <div className='col'></div>
                <div className='col-6'>  
                  <h1>Train Details</h1>    
                  <p>Id: {state.trainId}</p>
                  <p>From: {state.from}</p>
                  <p>To: {state.to}</p>
                  <p>Weekday: {state.weekday}</p>
                  <p>Hour: {state.hour}</p>
                  <p>Ticketprice: {state.ticketprice}</p>
                  <p>Traintype: {state.traintype}</p>
                </div> 
                <div className='col'></div> 
              </div>
            {resData && <Res
                        id={user.id}
                        name={user.name}
                        resuser={resData.resuser}
                        callback={fetchRes}
                        />}
            <div className="mb-6"></div>            
            </div>            
            <Modal show={err.show} onHide={handleClose} centered>
              <ModalHeader closeButton>
                <ModalTitle>Error</ModalTitle>
              </ModalHeader>
              <ModalBody>{err.incorrectfield}</ModalBody>
              <ModalFooter>
                <Button variant="primary" onClick={handleClose}>
                  OK
                </Button>
              </ModalFooter>
            </Modal>            
        </div>
    )
}

export default SpecificTrain;
