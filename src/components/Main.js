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
        <h2>Latest Posts</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Status</th>
              <th scope="col">Author</th>
              <th scope="col">Tips</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="postList">
            { this.props.posts.map((post, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{post.id.toString()}</th>
                  <td>{post.content}</td>
                  <td>{post.author}</td>
                  <td>{window.web3.utils.fromWei(post.tipAmount.toString())}</td>
                  <td>
                    <button
                      name={post.id}
                      onClick={(event) => {
                        let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                        this.props.tipPost(event.target.name, tipAmount)
                      }}
                    >
                      Tip 0.1 ETH
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;
