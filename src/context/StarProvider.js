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

  render() {
    const { Provider } = StarContext;
    const { children } = this.props;
    return (
      <Provider
        value={ {
          ...this.state,
          requisitandoPlanetas: this.requisitandoPlanetas,
          handleChange: this.handleChange,
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
