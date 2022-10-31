import { useState,useEffect } from 'react';
import '../styles/views/MainPage.css';
import Lines from '../components/MainPageComps/Lines';
import SearchBar from '../components/MainPageComps/SearchBar';
import Top from '../components/LoginComps/Top';
import { useCookies } from 'react-cookie';
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalTitle, Button} from 'react-bootstrap';

const MainPage = () => {
  //needs to stay like this
  const [state, setState] = useState();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [user, setUser] = useState();
  const [err,setErr] = useState({ 
    show: false,
    incorrectfield: ''
    });

  //note to myself: store the user value separately
  //when logging in set cookie and user data separately-> can send it from TopLogin

  //need to get if user is logged in as well
  const getLines = async () => {
      await fetch('http://localhost:8080/lines', {
          method: 'GET',
          headers: { Accept: 'application/json','Content-Type': 'application/json'},
          credentials: 'same-origin',
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
              incorrectfield: 'Not able to load data'
            })
          })  
  }

  useEffect(() => {
    getLines();
    if (cookies.token) {
      fetchUser();
    } else {
      setUser({
        name: '',
        id: '',
        type: ''
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //improve the search 
  const searchLines = (recieved) => {
    if (recieved.minprice !== '' && recieved.maxprice !== '' && recieved.minprice >= 0 && recieved.maxprice >= 0)
      fetch(`http://localhost:8080/searchlines/?from=${recieved.from}&to=${recieved.to}&min=${recieved.minprice}&max=${recieved.maxprice}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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

  const logOut = () => {
    removeCookie('token', { path: '/'});
    setUser({
      name: '',
      id: '',
      type: '',
    })// something here
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
              incorrectfield: 'Not able to load data'
            })
          }) 
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

  return (
    <div className="wrapper bg-warning"> 
      {user && <Top 
                  user={user.name} 
                  logOut={logOut}
                  logIn={loggedIn}
                  type={user.type}
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
