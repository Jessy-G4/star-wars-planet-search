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
    };
  }

  requisitandoPlanetas = async () => {
    const resposta = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
    const data = await resposta.json();
    this.setState({ planetasInfo: data.results });
  }

  render() {
    const { Provider } = StarContext;
    const { children } = this.props;
    return (
      <Provider
        value={ {
          ...this.state,
          requisitandoPlanetas: this.requisitandoPlanetas,
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
