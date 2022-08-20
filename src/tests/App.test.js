import React from 'react';
import { screen } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import Table from '../components/Table';
import userEvent from '@testing-library/user-event'
import App from '../App';



test('Se ao entrar na página aparece um input de pesquisa', () => {
    renderWithContext(<Table />);
  const elemento = screen.getByRole('textbox');
  expect(elemento).toBeInTheDocument();
  });
test('Se as informações dos planets são exibidas assim que a API é carregada.', async () => {
  await renderWithContext(<App />);
  const PlanetaUm = await screen.findByText(/tato/i);
  await expect(PlanetaUm).toBeInTheDocument();
})  

test('Se ao digitar no input, os planets digitados são exibidos', async () => {
  await renderWithContext(<App />);
  const PlanetaUm = await screen.findByText(/tato/i);
 await expect(PlanetaUm).toBeInTheDocument();
  const elemento = await screen.getByRole('textbox')
  userEvent.type(elemento, 'Tat')
  const tatoo = await screen.findByRole('cell', {
    name: /tatooine/i
  })
 await expect(tatoo).toBeInTheDocument();
  console.log(screen.logTestingPlaygroundURL());
  
  })

  test('Se o filtro de planets está funcionando', async () => {
    await renderWithContext(<App />);
    const filtro = screen.getByRole('button', {
      name: /filtrar/i
    })
    const hoth = await screen.findByRole('cell', {
      name: /Hoth/i
    })
    userEvent.click(filtro);
  expect(hoth).not.toBeInTheDocument();
})

test('Se tem o texto do filtro', () => {
  renderWithContext(<App />);
  const filtro = screen.getByRole('button', {
    name: /filtrar/i
  })
  userEvent.click(filtro);
  const text = screen.getByText(/maior que 0/i)
  userEvent.click(filtro);
  expect(text).toBeInTheDocument();
})

test('Se ao clicar em filtrar, é adicionado um parágrafo' , () => {
  renderWithContext(<App />);
  const filtro = screen.getByRole('button', {
    name: /filtrar/i
  })
  userEvent.click(filtro);
  userEvent.click(filtro);
  userEvent.click(filtro);
  const ola = screen.getAllByText(/maior que 0/i)

  expect(ola.length).toBe(3);
})


test('Se o filtro de comparação menor está funcionando', async () => {
  await renderWithContext(<App />);
  const filtro = await screen.getByRole('button', {
    name: /filtrar/i
  })
  const comparacao = await screen.getByTestId('comparison-filter')
  await userEvent.selectOptions((comparacao), 'menor que')
  await expect(screen.getByRole('option', {name: 'menor que'}).selected).toBe(true)
  await userEvent.click(filtro)
  const planets = await findAllByTestId('planet-name')
  await expect(planets).not.toBeInTheDocument();
})