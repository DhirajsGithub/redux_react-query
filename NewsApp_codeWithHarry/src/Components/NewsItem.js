import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    // destructuring of the object s
    let { title, description, imageurl, newUrl, author, date, source } = this.props;
    return (
      <div className='container my-3'>
        <div className="card" style={{position:'relative'}}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'2',position:'absolute', left:'90%' }}>
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <img src={imageurl === null ? "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1435,w_2551,x_0,y_0/dpr_2.0/c_limit,w_740/fl_lossy,q_auto/v1648958045/SNL_mygini" : imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>

            <a href={newUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem