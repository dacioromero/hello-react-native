import React, { ComponentType, ReactElement, Component } from "react";
import { Text } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const cache = new InMemoryCache();
const link = createHttpLink({ uri: 'https://countries.trevorblades.com/' })
const client = new ApolloClient({ cache, link })

interface ErrorBoundaryState {
  errorMsg?: string
}

class ErrorBoundary extends Component {
  static getDerivedStateFromError (error: Error): ErrorBoundaryState {
    return { errorMsg: error.message }
  }

  state: ErrorBoundaryState = {}

  render () {
    const { errorMsg } = this.state

    if (errorMsg) return <Text>{errorMsg}</Text>

    return this.props.children
  }
}

export default function withRoot<TProps>(Component: ComponentType<TProps>): ComponentType<TProps> {
  function WithRoot (props: TProps): ReactElement {
    return (
      <ApolloProvider client={client}>
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
      </ApolloProvider>
    )
  }

  WithRoot.displayName = `WithRoot(${Component.displayName || Component.name})`

  return WithRoot
}
