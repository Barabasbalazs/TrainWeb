import { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = (props) => {
    const [state,setState] = useState({
        from:'',
        to:'',
        minprice: 0,
        maxprice: 100000000,
    })

    const changeFrom = (e) => {
        setState((prevState) => {
            return {
                from: e.target.value,
                to: prevState.to,
                minprice: prevState.minprice,
                maxprice: prevState.maxprice
            }
        })
    }

    const changeTo = (e) => {
        setState((prevState) => {
            return {
                from: prevState.from,
                to: e.target.value,
                minprice: prevState.minprice,
                maxprice: prevState.maxprice
            }
        })
    }

    const changeMin = (e) => {
        setState((prevState) => {
            return {
                from: prevState.from,
                to: prevState.to,
                minprice: e.target.value,
                maxprice: prevState.maxprice
            }
        })
    }

    const changeMax = (e) => {
        setState((prevState) => {
            return {
                from: prevState.from,
                to: prevState.to,
                minprice: prevState.minprice,
                maxprice: e.target.value
            }
        })
    }

    const submitSearch = () => {
        props.submitSearch(state)
    };

    return(
        <div className="row bg-warning mt-6">
        <div className='col'></div>    
        <Form className='col-6 search'>
            <Form.Group controlId="from text-light">
                <Form.Label>Departure From</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Departing Station"
                    onChange={changeFrom}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="to">
                <Form.Label>Arriving To</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Arriving Station" 
                    onChange={changeTo}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="minprice">
                <Form.Label>Minimum Price</Form.Label>
                <Form.Control 
                    type="number"
                    onChange={changeMin}
                    value={state.minprice}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="maxprice">
                <Form.Label>Maximum Price</Form.Label>
                <Form.Control 
                    type="number"
                    onChange={changeMax}
                    value={state.maxprice}> 
                </Form.Control>
            </Form.Group>
            <br/>
            <Button onClick={submitSearch} className='mb-md'>Search</Button>
            <br/>
        </Form>
        <div className='col'></div>
        </div>
    )
}

export default SearchBar;