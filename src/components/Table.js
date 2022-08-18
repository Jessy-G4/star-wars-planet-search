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
    PlanetasFiltradosInputFunc,
  } = useContext(StarContext);

  useEffect(() => { requisitandoPlanetas(); }, []);

  function planetasInfoFunc() {
    return (planetasInfo.map((get) => (
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
    )));
  }

  function odeioOLint() {
    if (filterByName.length > 0) {
      return (planetasFiltrados.map((get) => (
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
      )));
    }

    if (clicado === true) {
      return PlanetasFiltradosInputFunc();
    }

    return planetasInfoFunc();
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
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
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
        onClick={ handleClick }
      >
        Filtrar

      </button>
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
