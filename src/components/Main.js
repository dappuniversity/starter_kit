import React, { Component } from 'react';

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
            <div class="card mb-4" >
              <div class="card-header">
                <small className="text-muted">{post.author}</small>
              </div>
              <ul id="postList" class="list-group list-group-flush">
                <li key={key} class="list-group-item">
                  <p>{post.content}</p>
                </li>
                <li key={key} class="list-group-item py-0">
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
