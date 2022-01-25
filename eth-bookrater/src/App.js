import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData()
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
      new: ''
    }
  }


  handleAddBook(e) {
    //e.preventDefault();
    this.setState({new: e.target.value });
  }

  async addNew(e){
    e.preventDefault();
    const task = await this.state.bkRater.methods.createTask(this.state.new,0).send({ from: this.state.account });
    this.loadBlockchainData();
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" target="_blank">Book Rater Application</a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small><a className="nav-link" href="#"><span id="account"></span></a></small>
            </li>
          </ul>
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
                        return (
                          <div className="taskTemplate" className="checkbox" key={key}>
                            <button className="content btn btn-secondary">{task.content}</button>
                          </div>
                        )
                      })}
                    </ul>
                    <ul id="completedTaskList" className="list-unstyled">
                    </ul>
                  </div>
                </div>
                <div className='col-9'>
                  <div className='card'>
                    <form>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1" >Add new Book</label>
                        <input type="text" className="form-control" id="addBook" placeholder="Enter a book to be added" value={this.state.new} onChange={this.handleAddBook.bind(this)}></input>
                        <small id="addBook" className="form-text text-muted">We'll never share your info with anyone else</small>
                      </div>
                      <button className="btn btn-primary" onClick={this.addNew.bind(this)}>Submit</button>
                    </form>
                  </div>
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