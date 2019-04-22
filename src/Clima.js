import React, { Component } from 'react';

// Imagem do Clima de acordo com o código informado na API
const IMAGEM = "http://openweathermap.org/img/w/{1}.png";
// Imagem da Bandeira de acordo com o país
const FLAG = "https://www.countryflags.io/{1}/shiny/24.png";

class Clima extends Component {

	constructor() {
		super();
		this.removerClima = this.removerClima.bind(this);
	}

	// Remove o clima
	removerClima(e, i) {
		e.target.parentNode.remove();
	}

	render() {
		let clima = this.props.clima;

		return (
			<div className="clima col-md-3">
				<i className="far fa-trash-alt remover" onClick={this.removerClima}></i>
				<img className="tempo" src={IMAGEM.replace('{1}', clima.img)} alt=""></img>
				<div className="cidade"><i className="fas fa-city"></i> {clima.cidade} <img className="pais" src={FLAG.replace('{1}', clima.pais)} alt=""></img></div>
				<br></br>
				<div className="umidade"><i className="fas fa-tint"></i> {clima.umidade} %</div>
				<div className="vento"><i className="fas fa-wind"></i> {clima.vento} m/s</div>
				<div className="nuvens"><i className="fas fa-cloud"></i> {clima.nuvens} %</div>
				<div className="temperatura"><i class="fas fa-thermometer-half"></i> {clima.temperatura} °C</div>
			</div>
		);
	}
}

export default Clima;
