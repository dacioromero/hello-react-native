import React, { FC } from 'react';
import { Text, View, ActivityIndicator, StyleSheet, FlatList } from 'react-native'
import withRoot from './withRoot';
import { useCountriesQuery, CountryInfoFragment } from './generated/graphql';

const countryStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    textAlign: 'left'
  }
})

const Post: FC<CountryInfoFragment> = ({ name, languages }) => {
  return (
    <View>
      <Text
        accessibilityRole='header'
        aria-level='2'
        style={countryStyles.title}
      >
        {name}
      </Text>
      {languages.length > 0 && (
        <FlatList
          data={languages}
          renderItem={({ item: language }) => (
            <Text key={language.id}>- {language.name}</Text>
          )}
        />
      )}
    </View>
  )
}

const appStyles = StyleSheet.create({
  view: {
    alignSelf: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 500
  }
})

const App: FC = () => {
  const { loading, error, data } = useCountriesQuery()

  if (loading) return <ActivityIndicator />

  if (error) return null

  if (data) {
    return (
      <View style={appStyles.view}>
        {data.countries.map(country => {
          if (!country) return null

          return <Post key={country.id} {...country} />
        })}
      </View>
    )
  }

  return null
}

export default withRoot(App)
