import React, { Component } from 'react'
import loading from '/Users/dhiraj/Desktop/NewsApp_codeWithHarry/src/loading.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center' style={{position:'realative'}}>
          <img style={{position:'absolute', width: '100px', aspectRatio: '1', zIndex:'2'}} src={loading} alt="loading" />
      </div>
    )
  }
}
