import React, { useContext, useEffect } from 'react'
import { FilterContext } from '../../contexts/FilterContext'
import { useGetAllCharactersQuery } from '../../generated/graphql'
import { ICharacter } from '../../types/character'
import Spinner from '../Spinner'
import CharacterCard from './CharacterCard'
import './style.scss'

function Characters() {
  const { loading, called, data, refetch } = useGetAllCharactersQuery({
    errorPolicy: 'all',
  })

  const characters = data?.characters?.results || []

  const { name, gender, species } = useContext(FilterContext)

  useEffect(() => {
    refetch({
      filter: {
        gender,
        name,
        species,
      },
    })
  }, [name, gender, species])

  return (
    <div className="content">
      <div className="container-header content__header">
        <div className="right">{data?.characters?.info?.count} Results</div>
      </div>
      <div className="charactersGrid">
        {loading && <Spinner locate="center" />}
        {called &&
          !loading &&
          characters.map((character) => (
            <CharacterCard
              key={character?.id as string}
              character={character as ICharacter}
            />
          ))}
      </div>
    </div>
  )
}

export default Characters
