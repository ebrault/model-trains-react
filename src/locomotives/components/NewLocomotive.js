import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Link, withRouter, Redirect } from 'react-router-dom'

class NewLocomotive extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      locomotive: {
        builder: '',
        year: '',
        new: false
      },
      flashMessage: ''
    }
    this.locomotive = this.state.locomotive
  }

  async componentDidMount() {
    const response = await axios.get(apiUrl + '/locomotives/' + `${this.state.match.params.id}`,
      {
        headers:
        {
          'Content-Type': 'application/json',
          'Authorization': `Token token=${this.state.user.token}`
        }
      }
    )
    this.setState({locomotive: response.data.locomotive})
  }

  handleChange = (event) => {
    const newLocomotive = {...this.state.locomotive, [event.target.name]: event.target.value}
    this.setState({locomotive: newLocomotive})
  }

  handleSubmit = async (event, user) => {
    event.preventDefault()

    const locomotiveParams = JSON.stringify({locomotive: this.state.locomotive})
    await axios.post(apiUrl + '/locomotives',
      locomotiveParams,
      {
        headers:
          {
            'Content-Type': 'application/json',
            'Authorization': `Token token=${this.state.user.token}`
          }
      }
    )

    this.props.history.push('/locomotives')
  }

  render() {
    const { id, user } = this.props
    const { locomotive } = this.state
    if(this.state.new === true) {
      return <Redirect to='/locomotives'/>
    }
    return(
      <React.Fragment>
        <div className="IndexLocomotives">
          <h1>New Locomotive</h1>
          <p>{this.state.flashMessage}</p>
          <form>
            <input name='builder' type="text" value={this.state.locomotive.builder} onChange={this.handleChange} placeholder='Builder' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <input name='year' type="text" value={this.state.locomotive.year} onChange={this.handleChange} placeholder='Year' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
            <button type='submit' onClick={(event) => this.handleSubmit(event, user)}>Create</button>
          </form>
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter (NewLocomotive)
