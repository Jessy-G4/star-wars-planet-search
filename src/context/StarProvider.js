// funcinalidades e paradas que o lint exige XD
import React from 'react';
import PropTypes from 'prop-types';

// importações;
import StarContext from './StarContext';

class StarProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      planetasInfo: [],
      filterByName: '',
      planetasFiltrados: [],
      numero: 0,
      comparacao: 'maior que',
      filtro: 'population',
      PlanetasFiltradosInput: [],
      clicado: false,
    };
  }

  requisitandoPlanetas = async () => {
    const resposta = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await resposta.json();
    this.setState({ planetasInfo: data.results.filter((get) => (
      delete get.residents
    )) });
  }

  filtrarPlanetas = () => {
    const { filterByName, planetasInfo } = this.state;
    const resultado = planetasInfo.filter((get) => get.name.includes(filterByName));
    this.setState({ planetasFiltrados: resultado });
  }

  handleChange = (evento) => {
    const { name, value } = evento.target;
    this.setState({ [name]: value }, () => this.filtrarPlanetas());
  }

  handleClick = () => {
    const {
      planetasInfo,
      numero,
      comparacao,
      filtro,
    } = this.state;
    const maior = planetasInfo.filter((get) => (
      Number(get[filtro]) > Number(numero)));
    const menor = planetasInfo.filter((get) => (
      Number(get[filtro]) < Number(numero)));
    const igual = planetasInfo.filter((get) => (
      Number(get[filtro]) === Number(numero)));
    switch (comparacao) {
    case 'maior que':
      this.setState({ PlanetasFiltradosInput: maior }, () => (
        this.setState({ clicado: true })));
      break;
    case 'menor que':
      this.setState({ PlanetasFiltradosInput: menor }, () => (
        this.setState({ clicado: true })));
      break;
    case 'igual a':
      this.setState({ PlanetasFiltradosInput: igual }, () => (
        this.setState({ clicado: true })));
      break;
    default:
      return this.setState({ PlanetasFiltradosInput: planetasInfo }, () => (
        this.setState({ clicado: true })));
    }
  }

  PlanetasFiltradosInputFunc = () => {
    const { PlanetasFiltradosInput } = this.state;
    return (PlanetasFiltradosInput.map((get) => (
      <tr key={ get.name }>
        <td>{get.name}</td>
        <td>{get.rotation_period}</td>
        <td>{get.orbital_period}</td>
        <td>{get.diameter}</td>
        <td>{get.climate}</td>
        <td>{get.gravity}</td>
        <td>{get.terrain}</td>
        <td>{get.surface_water}</td>
        <td>{get.population}</td>
        <td>{get.films}</td>
        <td>{get.created}</td>
        <td>{get.edited}</td>
        <td>{get.url}</td>
      </tr>
    ))
    );
  }

  render() {
    const { Provider } = StarContext;
    const { children } = this.props;
    return (
      <Provider
        value={ {
          ...this.state,
          requisitandoPlanetas: this.requisitandoPlanetas,
          handleChange: this.handleChange,
          handleClick: this.handleClick,
          PlanetasFiltradosInputFunc: this.PlanetasFiltradosInputFunc,
        } }
      >
        {children}
      </Provider>
    );
  }
}

StarProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default StarProvider;
