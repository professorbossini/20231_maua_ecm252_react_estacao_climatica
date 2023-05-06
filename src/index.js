import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'
export default class App extends React.Component{
  

  state = {
    latitude: null,
    longitude: null,
    estacao: null,
    data: null,
    icone: null,
    mensagemDeErro: null
  }
  
  componentDidMount(){
    this.obterLocalizacao()
  }

  componentDidUpdate(){

  }

  componentWillUnmount(){

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
    return (
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            {
              (!this.state.mensagemDeErro && !this.state.latitude) ?
                <Loading/>
              :
              this.state.mensagemDeErro ?
                <p className='border rounded p-2 fs-1 text-center'>
                  É preciso dar permissão.
                </p>
              :
                <EstacaoClimatica 
                  icone={this.state.icone}
                  estacao={this.state.estacao}
                  latitude={this.state.latitude}
                  longitude={this.state.longitude}
                  mensagemDeErro={this.state.mensagemDeErro}
                  obterLocalizacao={this.obterLocalizacao}
                />
            }
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