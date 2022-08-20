// funcionalidades e paradas que o lint exige XD
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
      filtrosAntigos: [],
      click: -1,
      maisPlanetas: [],
      selectFiltros: [
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water'],
    };
  }

  apagandoFiltros = async () => {
    const { selectFiltros, filtro } = this.state;
    const novosFiltros = await selectFiltros.filter((get) => get !== filtro);
    this.setState({ selectFiltros: novosFiltros }, () => (
      this.setState({ filtro: novosFiltros[0] })));
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

moreFilter = () => {
  const { filtrosAntigos, click } = this.state;
  const elemento = filtrosAntigos[click];
  const { numero, filtro, comparacao, PlanetasFiltradosInput } = elemento;
  const maior = PlanetasFiltradosInput.filter((get) => (
    Number(get[filtro]) > Number(numero)));
  const menor = PlanetasFiltradosInput.filter((get) => (
    Number(get[filtro]) < Number(numero)));
  const igual = PlanetasFiltradosInput.filter((get) => (
    Number(get[filtro]) === Number(numero)));

  switch (comparacao) {
  case 'maior que':
    this.setState({ maisPlanetas: maior }, () => (
      this.setState({ clicado: true })));
    break;
  case 'menor que':
    this.setState({ maisPlanetas: menor }, () => (
      this.setState({ clicado: true })));
    break;
  case 'igual a':
    this.setState({ maisPlanetas: igual }, () => (
      this.setState({ clicado: true })));
    break;
  default:
  }
}

salvandoValoresAntigo = () => {
  const {
    numero,
    comparacao,
    filtro,
    PlanetasFiltradosInput,
  } = this.state;

  this.setState((prev) => (
    {
      filtrosAntigos: [...prev.filtrosAntigos, {
        numero,
        comparacao,
        filtro,
        PlanetasFiltradosInput,
      }] }), () => this.moreFilter());
}

  handleClick = () => {
    const {
      planetasInfo,
      numero,
      comparacao,
      filtro,
    } = this.state;
    this.setState((prev) => ({ click: prev.click + 1 }));
    const maior = planetasInfo.filter((get) => (
      Number(get[filtro]) > Number(numero)));
    const menor = planetasInfo.filter((get) => (
      Number(get[filtro]) < Number(numero)));
    const igual = planetasInfo.filter((get) => (
      Number(get[filtro]) === Number(numero)));
    switch (comparacao) {
    case 'maior que':
      this.setState({ PlanetasFiltradosInput: maior }, () => (
        this.salvandoValoresAntigo()
      ));
      break;
    case 'menor que':
      this.setState({ PlanetasFiltradosInput: menor }, () => (
        this.salvandoValoresAntigo()
      ));
      break;
    case 'igual a':
      this.setState({ PlanetasFiltradosInput: igual }, () => (
        this.salvandoValoresAntigo()
      ));
      break;
    default:
      return this.setState({ PlanetasFiltradosInput: planetasInfo }, () => (
        this.setState({ clicado: true })));
    }
    this.setState({ clicado: true });
    this.apagandoFiltros();
  }

  handleClick2 = () => {
    const {
      filtrosAntigos,
      numero,
      comparacao,
      filtro,
      click,
    } = this.state;
    this.setState((prev) => ({ click: prev.click + 1 }));
    const maior = filtrosAntigos[click].PlanetasFiltradosInput.filter((get) => (
      Number(get[filtro]) > Number(numero)));
    const menor = filtrosAntigos[click].PlanetasFiltradosInput.filter((get) => (
      Number(get[filtro]) < Number(numero)));
    const igual = filtrosAntigos[click].PlanetasFiltradosInput.filter((get) => (
      Number(get[filtro]) === Number(numero)));
    switch (comparacao) {
    case 'maior que':
      this.setState({ PlanetasFiltradosInput: maior }, () => (
        this.salvandoValoresAntigo()
      ));
      break;
    case 'menor que':
      this.setState({ PlanetasFiltradosInput: menor }, () => (
        this.salvandoValoresAntigo()
      ));
      break;
    case 'igual a':
      this.setState({ PlanetasFiltradosInput: igual }, () => (
        this.salvandoValoresAntigo()
      ));
      break;
    default:
      return this.setState({ PlanetasFiltradosInput: planetasInfo }, () => (
        this.setState({ clicado: true })));
    }
    this.setState({ clicado: true });
    this.apagandoFiltros();
  }

  handleTR = (param) => (param.map((get) => (
    <tr key={ get.name }>
      <td data-testid="planet-name">{get.name}</td>
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
  )

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
          handleTR: this.handleTR,
          handleClick2: this.handleClick2,
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
