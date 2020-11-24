import React, { Component } from 'react';

import styled from 'styled-components';

const Wrapper = styled.section`
  justify-content: center;
  width: 100%;
  padding: 4em;
  background: rgba(70,130,180,1);
  /* border: 1px red solid; */
`;

const ProductWrapper = styled.section`
  background-color: rgba(255,255,255,.1);
  border-radius: 5px;
  padding: 1%;
`;

const Button = styled.button`
  border: none;
  border-radius: 3px;

  :hover {
    background-color: rgba(0,0,0,.5);
    color: white;
    transition: .3s;
  }
`;

class Main extends Component {

  handleSubmit = (event) => {
    event.preventDefault()
    const name = this.productName.value
    const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether') 
    this.props.createProduct(name, price)
  }
  
    render() {
      return (
        <Wrapper>
          <div id='content'>
            <h1>Add Product</h1>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group mr-sm-2'>
                <input
                  id="productName"
                  type='text'
                  ref={(input) => { this.productName = input }}
                  className='form-control'
                  placeholder='Product Name'
                  required />
              </div>
              <div className='form-group mr-sm-2'>
                <input
                  id="productPrice"
                  type='text'
                  ref={(input) => { this.productPrice = input }}
                  className='form-control'
                  placeholder='Product Price'
                  required />
              </div>
              <Button type='submit' >Add Product</Button>
            </form>
            <p>&nbsp;</p>
            <ProductWrapper>
            <h2>Buy Product</h2>
              <table className='table'>
                <thead>
                  <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Name</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Owner</th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody id='productList'>
                  { this.props.products.map((product, key) => {
                    if(!product.purchased){
                      return(
                        <tr key={key}>
                          <th scope='row'>{product.id.toString()}</th>
                          <td>{product.name}</td>
                          <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                          <td>{product.owner}</td>
                          <td>
                            { !product.purchased
                              ? <Button 
                                  className='buyButton' 
                                  name={product.id}
                                  value={product.price}
                                  onClick={(event) => {
                                    this.props.purchaseProduct(event.target.name, event.target.value)
                                  }}
                                >
                                  Buy
                                </Button> 
                              : <span role='img' aria-label='checked' >✔️ Sold</span>                   
                            }
                          </td>
                        </tr>
                      )
                    } else {
                      return null
                    }

                  })}
                </tbody>
              </table>
              <h2>Purchased Products</h2>
              <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Name</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Owner</th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody id='productList'>
                    { this.props.products.map((product, key) => {
                      if(product.purchased){
                        return(
                          <tr key={key}>
                            <th scope='row'>{product.id.toString()}</th>
                            <td>{product.name}</td>
                            <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                            <td>{product.owner}</td>
                            <td>
                              { !product.purchased
                                ? <button 
                                    className='buyButton' 
                                    name={product.id}
                                    value={product.price}
                                    onClick={(event) => {
                                      this.props.purchaseProduct(event.target.name, event.target.value)
                                    }}
                                  >
                                    Buy
                                  </button> 
                                : <span role='img' aria-label='checked'>✔️ Sold</span>                   
                              }
                            </td>
                          </tr>
                        )
                      } else {
                        return(
                          null
                        )
                      }
                    })}
                  </tbody>
              </table>
            </ProductWrapper>
          </div>
        </Wrapper>
      );
    }
  }
  
  export default Main;