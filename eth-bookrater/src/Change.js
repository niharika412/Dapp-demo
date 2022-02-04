import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

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
        const {ratedBooks,reload}=props
    }
    handleBook(e) {
        //e.preventDefault();
        this.setState({ no: e.target.value });
    }

    handleRate(e) {
        //e.preventDefault();
        this.setState({ rate: e.target.value });
    }

    changeRating(e) {
        e.preventDefault()
        console.log(this.props);
        this.ChangeRate(this.state.no, this.state.rate, e);
    }

    async ChangeRate(id, rate, e) {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const bkRater = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
        this.setState({ bkRater })
        console.log("Changing rating for book no:" + id.toString());
        const chg = await this.state.bkRater.methods.changeRating(id, rate).send({ from: this.state.account });
        
        this.props.reload()

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