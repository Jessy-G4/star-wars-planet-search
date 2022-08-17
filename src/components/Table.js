import React, { useContext, useEffect } from 'react';
import StarContext from '../context/StarContext';

function Table() {
  const {
    planetasInfo,
    requisitandoPlanetas,
    handleChange,
    filterByName,
    planetasFiltrados,
  } = useContext(StarContext);
  useEffect(() => { requisitandoPlanetas(); }, []);
  return (
    <div>
      <input
        name="filterByName"
        type="text"
        value={ filterByName }
        data-testid="name-filter"
        onChange={ handleChange }
      />
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
          filterByName.length > 0 ? planetasFiltrados.map((get) => (
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
            : planetasInfo.map((get) => (
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
        }
      </table>
    </div>
  );
}

export default Table;
