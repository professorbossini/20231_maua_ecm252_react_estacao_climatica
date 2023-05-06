import React, { Component } from 'react'

export class Loading extends Component {
  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center border rounded p-3">
        <div 
          className="spinner-border text-primary"
          style={{width: '3rem', height: '3rem'}}>
            <span className="visually-hidden">Carregando...</span>
        </div>
        <p className='mt-4'>{this.props.mensagem}</p>
      </div>
    )
  }
}
Loading.defaultProps ={
  mensagem: 'Aguarde...'  
}

export default Loading