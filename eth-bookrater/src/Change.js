import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'

class Change extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    constructor(props) {
        super(props)
        this.state = {
            no: '',
            rate: ''
        }
    }
    handleBook(e) {
        //e.preventDefault();
        this.setState({ no: e.target.value });
    }

    handleRate(e) {
        //e.preventDefault();
        this.setState({ rate: e.target.value });
    }

    changeRating(e){
        e.preventDefault()
        this.props.ChangeRate(this.state.no, this.state.rate);
    }


    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Change rating for a book</h5>
                    <form >
                        <div className="form-group">
                            <input type="text" className="form-control" id="no" placeholder="Enter a book no to be changed" value={this.state.no} onChange={this.handleBook.bind(this)}></input>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control" id="rate" placeholder="Enter the new rating" value={this.state.rate} onChange={this.handleRate.bind(this)}></input>
                        </div>
                        <button className='btn btn-secondary btn-block' onClick={this.changeRating.bind(this)}>GO</button>
                    </form>
                </div>
            </div>);
    }

}


export default Change;