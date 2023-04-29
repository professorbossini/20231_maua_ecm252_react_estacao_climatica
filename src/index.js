import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
export default class App extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      estacao: null,
      data: null,
      icone: null,
      mensagemDeErro: null
    }
  }

  obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    //21/06
    //new Date(ano, mes, dia): mes começa do zero
    const d1 = new Date(anoAtual, 5, 21)
    //24/09
    const d2 = new Date(anoAtual, 8, 24)
    //22/12
    const d3 = new Date (anoAtual, 11, 22)
    //21/03
    const d4 = new Date (anoAtual, 2, 21)
    const sul = latitude < 0
    if (data >= d1 && data < d2)
      return sul ? 'Inverno' : 'Verão'
    if (data >= d2 && data < d3)
      return sul ? 'Primavera' : 'Outono'
    if (data >= d3 && data < d4)
      return sul ? 'Verão' : 'Inverno'
    return sul ? 'Outono' : 'Primavera'
  }

  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        //extrair a data do sistema
        let data = new Date()
        //calcular a estação climática do usuário
        let estacao = this.obterEstacao(data, position.coords.latitude)
        //decidir qual ícone exibir
        let icone = this.icones[estacao]
        //atualizar o estado do componente
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          estacao,
          data: data.toLocaleTimeString(),
          icone
        })
      },
      (erro) => {this.setState({mensagemDeErro: 'Tente novamente mais tarde'})}
    )
  }
  icones = {
    'Primavera': 'fa-seedling',
    'Verão': 'fa-umbrella-beach',
    'Outono': 'fa-tree',
    'Inverno': 'fa-snowman'  
  }

  //primavera: fa-seedling
  //inverno: fa-snowman

  render(){
    console.log(this.state)
    return (
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center border rounded mb-2" style={{height: '6rem'}}>
                  <i className={`fas fa-5x ${this.state.icone}`}></i>
                  <p className="w-75 ms-3 text-center fs-1">{this.state.estacao}</p>
                </div>
                <div>
                  <p className="text-center">
                    {
                      this.state.latitude ?
                        `Coordenadas: ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}`
                      :
                      this.state.mensagemDeErro ?
                        this.state.mensagemDeErro
                      :
                        `Clique no botão para saber a sua estação climática`
                    }  
                  </p>
                </div>
                {/* button.btn.btn-outline-primary.w-100.mt-2 */}
                <button 
                  className="btn btn-outline-primary w-100 mt-2"
                  onClick={this.obterLocalizacao}>
                  Qual a minha estação?
                </button>
              </div>
            </div>
          </div>
        </div>   
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)