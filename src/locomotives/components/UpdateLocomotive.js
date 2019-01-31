import React from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { handleErrors } from '../../auth/api.js'
import messages from '../../auth/messages.js'

class UpdateLocomotive extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locomotive: {
        builder: '',
        year: '',
        edited: false
      },
      flashMessage: ''
    }
    this.locomotive = this.state.locomotive
  }

  handleChange = (event) => {
    const newLocomotive = { ...this.state.locomotive, [event.target.name]: event.target.value }
    this.setState({locomotive: newLocomotive})
  }

  handleUpdate = (event, user, edited) => {
    event.preventDefault()
    const { id } = this.props
    const { builder, year } = this.state.locomotive

    return fetch(apiUrl + `/locomotives/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Token token=${user.token}`
      },
      body: JSON.stringify({
        locomotive: {
          builder: builder,
          year: year
        }
      })
    })
      .then(handleErrors)
      .then(()=>{
        this.setState({ edited: true })
        this.props.history.push('/locomotives')
      })
  }

  render() {
    if (this.state.edited === true) {
      return <Redirect to='/locomotives' />
    }
    const {builder, year} = this.state
    const { id, user } = this.props
    return (
      <div className="IndexLocomotives">
        <h2>Edit Locomotive</h2>
        <p>{this.state.flashMessage}</p>
        <form>
          <input name='builder' type="text" value={this.state.locomotive.builder} onChange={this.handleChange} placeholder='Builder' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
          <input name='year' type="text" value={this.state.locomotive.year} onChange={this.handleChange} placeholder='Year' style={{border:'solid 1px #000', width:'240px', marginLeft:'20px'}}/>
          <button type="submit" onClick={(event) => this.handleUpdate(event, user)}>Update</button>
        </form>
      </div>
    )
  }
}

export default withRouter(UpdateLocomotive)
