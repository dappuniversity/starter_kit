import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <p>&nbsp;</p>
        <form onSubmit={(event) => {
          event.preventDefault()
          const content = this.postContent.value
          this.props.createPost(content)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="postContent"
              type="text"
              ref={(input) => { this.postContent = input }}
              className="form-control"
              placeholder="What's on your mind?"
              required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Share</button>
        </form>
        <p>&nbsp;</p>
        { this.props.posts.map((post, key) => {
          return(
            <div className="card mb-4" key={key} >
              <div className="card-header">
                <img
                  className="mr-2"
                  width='30'
                  height='30'
                  src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                />
                <small className="text-muted">{post.author}</small>
              </div>
              <ul id="postList" className="list-group list-group-flush">
                <li className="list-group-item">
                  <p>{post.content}</p>
                </li>
                <li key={key} className="list-group-item py-2">
                  <small className="float-left mt-1 text-muted">
                    TIPS: {window.web3.utils.fromWei(post.tipAmount.toString())} ETH
                  </small>
                  <button
                    className="btn btn-link btn-sm float-right pt-0"
                    name={post.id}
                    onClick={(event) => {
                      let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                      this.props.tipPost(event.target.name, tipAmount)
                    }}
                  >
                    <span>
                      TIP 0.1 ETH
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          )
        })}
      </div>
    );
  }
}

export default Main;
