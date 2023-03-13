// React
import React from 'react'
import { ReactElement, ReactNode } from 'react'
// Redux
import { Provider } from 'react-redux'
import { configureStore, PreloadedState, Store } from '@reduxjs/toolkit'
// Testing Library
import { render, RenderOptions } from '@testing-library/react-native'
// Store
import { rootReducer, RootState } from '../../src/store'
// Models
import { GlobalContextType, SearchContextType } from '../../src/models/context'
// Contexts
import GlobalContext from '../../src/contexts/GlobalContext'
import SearchContext from '../../src/contexts/SearchContext'
// Constants
import { defaultGlobalContextValue, defaultSearchContextValue, initialStoreState } from './data'

interface ExtendedRenderOptions extends RenderOptions {
  preloadedState?: PreloadedState<RootState>
  store?: Store
  globalContextValue?: GlobalContextType
  searchContextValue?: SearchContextType
}

export const renderWithProvider = (
  component: ReactElement,
  {
    preloadedState = initialStoreState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = ({ children }: { children: ReactNode }): JSX.Element => {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper, ...renderOptions }) }
}

export const renderWithProviderAndContexts = (
  component: ReactElement,
  {
    preloadedState = initialStoreState,
    globalContextValue = defaultGlobalContextValue,
    searchContextValue = defaultSearchContextValue,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const wrapper = ({ children }: { children: ReactNode }): JSX.Element => {
    return (
      <Provider store={store}>
        <GlobalContext.Provider value={globalContextValue}>
          <SearchContext.Provider value={searchContextValue}>{children}</SearchContext.Provider>
        </GlobalContext.Provider>
      </Provider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(component, { wrapper, ...renderOptions }) }
}
