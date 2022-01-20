import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { TODO_LIST_ABI, TODO_LIST_ADDRESS } from './config'

class App extends Component {
  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
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
    ratedBooks: []
  }
}

render() {
  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="http://www.dappuniversity.com/free-download" target="_blank">Book Rater Application</a>
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
            <div id="content">
              <h3>Books available:</h3>
              <ul id="taskList" className="list-unstyled">
                { this.state.ratedBooks.map((task, key) => {
                  return(
                    <div className="taskTemplate" className="checkbox" key={key}>
                      <label>
                        <input type="checkbox" />
                        <span className="content">{task.content}</span>
                      </label>
                    </div>
                  )
                })}
              </ul>
              <ul id="completedTaskList" className="list-unstyled">
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
}

export default App;