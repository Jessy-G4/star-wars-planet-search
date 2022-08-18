import React from 'react'
import { render } from '@testing-library/react'
import StarContext from '../context/StarContext' // meu context
import StarProvider from '../context/StarProvider' // meu provider

const renderWithContext = (component) => {
  return {
    ...render(
        <StarProvider value={ StarContext }>
            {component}
        </StarProvider>)
  }
}
export default renderWithContext;