import React, { Component } from 'react'
import BookmarksContext from '../BookmarksContext'
import config from '../config'
import './EditBookmark.css'

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

class EditBookmark extends Component {
  static contextType = BookmarksContext

  state = {
    title: '',
    url: '',
    description: '',
    rating: '',
    error: null,
  }

  handleSubmit = () => { }

  componentDidMount() {
    const bookmarkId = this.props.match.params.bookmarkId

    fetch(`https://localhost:8000/api/bookmark/${bookmarkId}`, {
      method: 'GET'
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error
          })
        }

        return res.json()
      })
      .then(responseData => {
        // this.setState({
        //   title,
        //   url,
        //   description,
        //   rating
        // })
        debugger;
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