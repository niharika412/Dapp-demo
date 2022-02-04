import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'
import Change from './Change'
class App extends Component {
  componentDidMount() {
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    this.setState({
      account: '',
      taskCount: 0,
      ratedBooks: [],
      new: ''
    });
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const bkRater = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS)
    this.setState({ bkRater })
    const taskCount = await bkRater.methods.taskCount().call()
    this.setState({ taskCount })
    for (var i = 1; i <= taskCount; i++) {
      const task = await bkRater.methods.ratedBooks(i).call()
      this.setState({
        ratedBooks: [...this.state.ratedBooks, task]
      })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      taskCount: 0,
      ratedBooks: [],
      new: '',
      rate: 0
    }
  }


  handleAddBook(e) {
    //e.preventDefault();
    this.setState({ new: e.target.value });
  }

  handleRateBook(e) {
    //e.preventDefault();
    this.setState({ rate: e.target.value });
  }

  async addNew(e) {
    e.preventDefault();
    const task = await this.state.bkRater.methods.createTask(this.state.new, this.state.rate).send({ from: this.state.account });
    this.loadBlockchainData();
  }

  async deleteBook(tid, e) {
    console.log(this.state.bkRater)
    const del = await this.state.bkRater.methods.deleteRating(tid).send({ from: this.state.account });
    this.loadBlockchainData();
  }


  render() {
    const rate = "⭐";
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <h2 className="navbar-brand col-sm-3 col-md-2 mr-0" >Book Rater Application</h2>
        </nav>
        <div className="jumbotron">
          <div>
            <main role="main" className="justify-content-center">
              <div id="loader" className="text-center">
                <p className="text-center">Loading...</p>
              </div>
              <div className='row'>
                <div className='col-3'>
                  <div id="content">
                    <ul>
                      {this.state.ratedBooks.map((task, key) => {
                        if (task.content) {
                          let rating = rate.repeat(task.rating);
                          return <div className="taskTemplate" className="checkbox" key={key}>
                            <button className="content btn btn-secondary" onClick={this.deleteBook.bind(this, task.id)}>{task.content} = {rating}</button>
                          </div>;
                        }
                        return
                      })}
                    </ul>
                    <ul id="completedTaskList" className="list-unstyled">
                    </ul>
                  </div>
                </div>
                <div className='col-5'>
                  <div className="card">
                    <div className="card-header">
                      Featured
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">Add a New Book</h5>
                      <form>
                        <div className="form-group">
                          <input type="text" className="form-control" id="addBook" placeholder="Enter a book to be added" value={this.state.new} onChange={this.handleAddBook.bind(this)}></input>
                        </div>
                        <br></br>
                        <div className='form-group'>
                          <label htmlFor='rating'>Add a rating for the book</label>
                          <input type="number" className="form-control" id="rating" value={this.state.rate} onChange={this.handleRateBook.bind(this)}></input>
                        </div>
                        <button className="btn btn-primary " onClick={this.addNew.bind(this)}>Submit</button>
                      </form>
                    </div>
                  </div>
                  </div>
                  <div className='col-4'>
                  <Change ratedBooks={this.state.ratedBooks} reload={this.loadBlockchainData}></Change>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;