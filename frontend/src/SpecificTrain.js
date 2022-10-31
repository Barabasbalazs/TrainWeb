import { useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Top from './components/LoginComps/Top';
import Res from './components/SpecificTrainComps/Res';
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Button} from 'react-bootstrap';
import './SpecificTrain.css';

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

    const fetchUser = () => {
        fetch(`http://localhost:8080/?auth=${cookies.token}`, {
                method: 'POST',
                headers: { Accept: 'application/json','Content-Type': 'application/json'},
                credentials: 'same-origin',
            })
              .then((res) => res.json())
              .then((json) => {
                setUser({
                  name: json.name,
                  id: json.id,
                  type: json.type
                })
              })
              .catch(() => {
                setErr({
                  show: true,
                  incorrectfield: 'Error while loading data'
                })
              })
    }

    const fetchRes = () => {
        fetch(`http://localhost:8080/checkres?trainId=${state.trainId}`, {
                method: 'GET',
                headers: { Accept: 'application/json','Content-Type': 'application/json'},
                credentials: 'same-origin',
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

    const loadUser = () => {
        if (cookies.token) {
            fetchUser();
          } else {
            setUser({
              name: '',
              id: '',
            });
          }
    }

    useEffect(() => {
        loadUser();
        fetchRes();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      const logOut = () => {
        removeCookie('token', { path: '/'});
        setUser({
          name: '',
          id: '',
          type: ''
        })
      }
    
      const loggedIn = async (newtoken) => {
        fetch(`http://localhost:8080/?auth=${newtoken}`, {
                method: 'POST',
                headers: { Accept: 'application/json','Content-Type': 'application/json'},
                credentials: 'same-origin',
            })
              .then((res) => res.json())
              .then((json) => {
                setUser({
                  name: json.name,
                  id: json.id,
                  type: json.type
                })
              })
              .catch(() => {
                setErr({
                  show: true,
                  incorrectfield: 'Error while loading data'
                })
              })
      }  
      
    const handleClose = () => {
      setErr({
        show: false,
        incorrectfield: ''
      })
    }  

    return (
        <div className="bg-warning wrapper">
            {user && <Top 
                  user={user.name} 
                  logOut={logOut}
                  logIn={loggedIn}
                  type={user.type}
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
