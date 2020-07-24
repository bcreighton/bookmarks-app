import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BookmarksContext from '../BookmarksContext'
import config from '../config'
import './EditBookmark.css'

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static contextType = BookmarksContext

  state = {
    id: '',
    title: '',
    url: '',
    description: '',
    rating: '',
    error: null,
  }

  handleChangeTitle = e => {
    this.setState({ title: e.target.value })
  }

  handleChangeUrl = e => {
    this.setState({ url: e.target.value })
  }
  handleChangeDescription = e => {
    this.setState({ description: e.target.value })
  }
  handleChangeRating = e => {
    this.setState({ rating: e.target.value })
  }

  handleSubmit = () => {
    e.preventDefault()

    const { bookmarkId } = this.props.match.params
    const { id, title, url, description, rating } = this.state
    const newBookmark = { id, title, url, description, rating }

    fetch(confg.API_ENDPOINT + `/${bookmarkId}`, {
      method: 'PATCH',
      body: JSON.stringify(newBookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(error => Promise.reject(error))
      })
  }

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId

    fetch(config.API_ENDPOINT + `${bookmarkId}`, {
      method: 'GET',
      headers: {
        'authorization': `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok)
          // get the error message from the response,
          return res.json().then(error => Promise.reject(error))

        return res.json()
      })
      .then(responseData => {
        this.setState({
          id: responseData.id,
          title: responseData.title,
          url: responseData.url,
          description: responseData.description,
          rating: responseData.rating,
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }


  render() {
    const { error } = this.state

    return (
      <section className='EditBookmark'>
        <h2>Edit</h2>
        <form
          className='EditBookmark_form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditBookmark_error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>

          <div>
            <label htmlFor='title'>
              Title
                {' '}
              <Required />
            </label>
            <input
              id='title'
              type='text'
              name='title'
              placeholder='Great website'
              required
              // value={title}
              onChange={this.handleChangeTitle}
            />
          </div>

          <div>
            <label htmlFor='url'>
              URL
                {' '}
              <Required />
            </label>
            <input
              id='url'
              type='url'
              name='url'
              placeholder='https://www.great-website.com/'
              required
              // value={url}
              onChange={this.handleChangeUrl}
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
                {' '}
              <Required />
            </label>
            <textArea
              id='description'
              name='description'
              // value={description}
              onChange={this.handleChangeDescription}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
                {' '}
              <Required />
            </label>
            <input
              id='rating'
              type='number'
              name='rating'
              min='1'
              max='5'
              required
              // defaultValue={rating}
              onChange={this.handleChangeRating}
            />
          </div>

          <div className='EditBookmark_buttons'>
            <button
              type='button'
              onClick={this.handleClickCancel}>
              Cancel
              </button>
            {' '}
            <button type='submit'>
              Update
              </button>
          </div>

        </form>
      </section>
    )
  }
}

export default EditBookmark;