import React, { useContext, useEffect } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const {
    planetasInfo,
    requisitandoPlanetas,
    handleChange,
    filterByName,
    planetasFiltrados,
    numero,
    comparacao,
    filtro,
    clicado,
    handleClick,
    handleTR,
    filtrosAntigos,
    PlanetasFiltradosInput,
    maisPlanetas,
    click,
    handleClick2,
    selectFiltros,
  } = useContext(StarContext);

  useEffect(() => { requisitandoPlanetas(); }, []);

  function odeioOLint() {
    if (filterByName.length > 0) {
      return handleTR(planetasFiltrados);
    }

    if (clicado === true) {
      return handleTR(PlanetasFiltradosInput);
    }
    if (click > 0) {
      return handleTR(maisPlanetas);
    }

    return handleTR(planetasInfo);
  }

  function handleClicks() {
    if (click > 0) { return handleClick2(); }
    return handleClick();
  }

  return (
    <div>
      <input
        name="filterByName"
        type="text"
        value={ filterByName }
        data-testid="name-filter"
        onChange={ handleChange }
      />
      <select
        name="filtro"
        data-testid="column-filter"
        value={ filtro }
        onChange={ handleChange }
      >
        {selectFiltros.map((get) => (<option key={ get }>{get}</option>))}
      </select>
      <select
        name="comparacao"
        data-testid="comparison-filter"
        value={ comparacao }
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        type="number"
        name="numero"
        data-testid="value-filter"
        onChange={ handleChange }
        value={ numero }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClicks }
      >
        Filtrar

      </button>
      <div>
        {
          filtrosAntigos.map((get) => (
            <p key={ `${get.comparacao}${get.numero}` }>
              {`${get.filtro}  ${get.comparacao} ${get.numero}`}
            </p>
          ))
        }
      </div>
      <table>
        <tr>
          <th>name</th>
          <th>rotation period</th>
          <th>orbital period</th>
          <th>diamter</th>
          <th>climate</th>
          <th>gravity</th>
          <th>terrain</th>
          <th>surface water</th>
          <th>population</th>
          <th>films</th>
          <th>created</th>
          <th>edited</th>
          <th>URL</th>
        </tr>
        {
          odeioOLint()
        }
      </table>
    </div>
  );
}

export default Table;
