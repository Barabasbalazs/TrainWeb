import { useState,useEffect } from 'react';
import '../styles/views/MainPage.css';
import Lines from '../components/MainPageComps/LineWrapper';
import SearchBar from '../components/MainPageComps/SearchBar';
import TopWrapper from '../components/LoginComps/TopWrapper';
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Button} from 'react-bootstrap';
import routes from '../router/index';

const { trainsRoute, searchTrainRoute } = routes;

const MainPage = () => {
  const [state, setState] = useState();
  // eslint-disable-next-line no-unused-vars
  // const [cookies, setCookie, removeCookie] = useCookies([]);
  const [user, setUser] = useState();
  const [err,setErr] = useState({ 
    show: false,
    incorrectfield: ''
    });

  //need to get if user is logged in as well
  const getLines = async () => {
      await fetch(trainsRoute, {
          method: 'GET',
          headers: { Accept: 'application/json','Content-Type': 'application/json'},
          credentials: 'include'
          
      })
        .then((res) => res.json())
        .then((jsonobj) => {
          if (jsonobj.error === false) {
            setState({traindata: jsonobj.lines});
          } else {
            setErr({
              show: true,
              incorrectfield: 'Not able to load data from Trains'
            })
          }
        })
        .catch(() => {
          setErr({
            show: true,
            incorrectfield: 'Not able to load data from Trains'
          })
        })  
  }
  
  useEffect(() => {
    getLines();
    setUser({
      name: localStorage.getItem('username'),
      type: localStorage.getItem('type'),
      id: localStorage.getItem('id'),
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  //improve the search 
  const searchLines = (recieved) => {
    if (recieved.minprice !== '' && recieved.maxprice !== '' && recieved.minprice >= 0 && recieved.maxprice >= 0)
      fetch(`${searchTrainRoute}/?from=${recieved.from}&to=${recieved.to}&min=${recieved.minprice}&max=${recieved.maxprice}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
        .then((resp) => resp.json())
        .then((json) => {
          setState({traindata: json.found})
        })
        .catch(() => {
          setErr({
            show: true,
            incorrectfield: 'Not able to load data'
          })
        });     
  }

  const handleClose = () => {
    setErr({
      show: false,
      incorrectfield: ''
    })
  }

  const reloadTrains = () => {
    getLines();
  }

  const authCallback = () => {
    setUser({
      name: localStorage.getItem('username'),
      type: localStorage.getItem('type'),
      id: localStorage.getItem('id'),
    });
  }

  return (
    <div className="wrapper bg-warning"> 
      {user && <TopWrapper
        authCallback = {authCallback}
        user = {user.name}
        type = {user.type}
      />}
      <SearchBar
        submitSearch={searchLines}
      />
      {(state && user) && <Lines
                traindata = {state.traindata}
                userid = {user.id}
                type = {user.type}
                callback = {reloadTrains}
                />}
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
  );
}

export default MainPage;
