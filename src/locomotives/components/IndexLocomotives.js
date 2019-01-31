import React, { component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import NewLocomotive from './NewLocomotive.js'
import UpdateLocomotive from './UpdateLocomotive.js'

class IndexLocomotives extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: props.user,
      locomotives: []
    }
  }
  async componentDidMount() {
    const response = await axios.get(apiUrl + '/locomotives', {headers: {'Authorization': `Token token=${this.state.user.token}`}})
    this.setState({locomotives: response.data.locomotives})
  }

  async deleteLocomotive(event, locomotiveId) {
    event.preventDefault()
    await axios.delete(apiUrl + '/locomotives/' + `${locomotiveId}`, {headers: {'Authorization': `Token token=${this.state.user.token}`}})
    this.setState({locomotives: this.state.locomotives.filter(locomotive => locomotive.id !== locomotiveId)})
  }

  render() {
    const { user } = this.props
    const locomotiveRows = this.state.locomotives.map(locomotive => {
      const { id, builder, year } = locomotive
      return (
        <tr key={id} className="table-info">
          <td className="table-primary">
            <Link to={`/locomtives/${id}`}>{ builder }</Link>
          </td>
          <td className="table-primary">
            <Link to={`/locomotives/${id}`}>{ year }</Link>
          </td>
          <td>
            <Link to={`/locomotives/${locomotive.id}/update`}>update</Link> | <a href="" onClick={(event) => this.deleteLocomotive(event, locomotive.id)}>delete</a>
          </td>
        </tr>
      )
    })

    return (
      <React.Fragment>
        <div className="IndexLocomotives">
          <h1>Locomotives</h1>
          <h3 style={{display: 'inline-block'}}>
            <Link to="/NewLocomotive" className="btn btn-primary">Add Locomotive</Link>
          </h3>
          <table className="table">
            <tbody>
              {locomotiveRows}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    )
  }
}

export default IndexLocomotives
