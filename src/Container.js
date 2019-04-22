import React, { Component } from 'react';
import Clima from './Clima';

/**
 * Endereço da API
 * {1} Cidade
 * {2} País
 */
const API = "http://api.openweathermap.org/data/2.5/weather?q={1},{2}&appid=d91415cb9dc1f39c0153d04eca192982&units=metric";


class Container extends Component {

	constructor() {
		super();
		this.state = {
			climas: [],
			pais: '',
			clima_temporario: {
				pais: '',
				cidade: ''
			},
			erro: false,
			cidadeSelecionada: ''
		};

		// Adicionando 5 modelos padrões

		let cidades = ['Caruaru', 'Recife', 'Sao Paulo', 'Curitiba', 'Rio de Janeiro'];

		cidades.forEach((cidade, i) => {
			fetch(API.replace("{1}", cidade).replace("{2}", "BR"))
				.then(results => {
					return results.json();
				}).then(data => {
					this.state.climas.push({
						img: data.weather[0].icon,
						cidade: data.name,
						pais: data.sys.country,
						temperatura: data.main.temp,
						umidade: data.main.humidity,
						vento: data.wind.speed,
						nuvens: data.clouds.all
					});

					this.setState(this.state);
				});
		});

		// ----

		this.adicionarClima = this.adicionarClima.bind(this);
		this.alterarPais = this.alterarPais.bind(this);
		this.alterarCidade = this.alterarCidade.bind(this);
	}

	/**
	 * Método que adiciona um objeto com as informações do Clima ao this.state de acordo com
	 * o País e Cidade selecionados
	 * @param {*} e 
	 */

	adicionarClima(e) {
		e.preventDefault();

		let tempClima = this.state.clima_temporario;
		let state = this.state;

		if (tempClima.pais.length === 0 || tempClima.cidade.length === 0) {
			//País ou Cidade não foi selecionado
			state.erro = true;
			this.setState(state)
		} else {
			fetch(API.replace("{1}", tempClima.cidade).replace("{2}", tempClima.pais))
				.then(results => {
					return results.json();
				}).then(data => {
					state.climas.push({
						img: data.weather[0].icon,
						cidade: data.name,
						pais: data.sys.country,
						temperatura: data.main.temp,
						umidade: data.main.humidity,
						vento: data.wind.speed,
						nuvens: data.clouds.all
					});

					state.erro = false;
					this.setState(state);
				});
		}
	}

	/**
	 * Altera o país do clima_temporario
	 * Altera o valor do país atual no state
	 */
	alterarPais(e) {
		let state = this.state;
		state.pais = e.target.value;
		state.clima_temporario = {
			pais: e.target.value,
			cidade: ''
		};
		state.cidadeSelecionada = '';
		this.setState(state);
	}

	/**
	 * Altera a cidade do clima_temporario
	 */
	alterarCidade(e) {
		let state = this.state;
		state.cidadeSelecionada = state.clima_temporario.cidade = e.target.value;
		this.setState(state);
	}

	render() {
		let json = require('./city.list.json');

		let paises = new Set();
		let cidades = new Set();

		// Adiciona os países ao Set
		for (let obj in json) {
			let country = json[obj].country;
			if (country.length > 0) {
				paises.add(json[obj].country);
			}
		}

		if (this.state.pais !== '') {
			// Adiciona as cidades de acordo com o país informado no state
			for (let obj in json) {
				if (json[obj].country === this.state.pais) {
					cidades.add(json[obj].name);
				}
			}
		}

		return (
			<div className="container-fluid">
				<form onSubmit={this.adicionarClima} className="col-12">
					<div className="grupo-select">
						<span>Países</span>
						<select className="custom-select" onChange={this.alterarPais}>
							<option value="">Selecione um país</option>
							{Array.from(paises).sort().map((value, index) => {
								return <option value={value}>{value}</option>

							})}
						</select>
					</div>

					<div className="grupo-select">
						<span>Cidades</span>
						<select className="custom-select" onChange={this.alterarCidade} value={this.state.cidadeSelecionada}>
							<option value="">Selecione uma cidade</option>
							{Array.from(cidades).sort().map((cidade, index) => {
								return <option value={cidade}>{cidade}</option>

							})}
						</select>
					</div>
					<br></br>

					{(() => {
						if (this.state.erro) {
							return <div>Escolha um país e uma cidade!</div>
						}
					})()}

					<button className="btn btn-success">Adicionar</button>
				</form>

				<div className="climas col-12 row">
					{this.state.climas.map((clima, index) => {
						return <Clima clima={clima} />
					})}
				</div >

			</div>
		);
	}
}

export default Container;
