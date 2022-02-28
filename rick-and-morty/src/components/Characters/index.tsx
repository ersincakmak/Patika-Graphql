import React, { useContext, useEffect, useState } from 'react'
import { TiArrowLeft, TiArrowRight } from 'react-icons/ti'
import ReactPaginate from 'react-paginate'
import { FilterContext } from '../../contexts/FilterContext'
import { useGetAllCharactersQuery } from '../../generated/graphql'
import { ICharacter } from '../../types/character'
import Spinner from '../Spinner'
import CharacterCard from './CharacterCard'
import Error from './Error'
import './style.scss'

function Characters() {
  const [page, setPage] = useState(0)

  const { loading, called, data, refetch } = useGetAllCharactersQuery({
    errorPolicy: 'all',
  })

  const characters = data?.characters?.results || []

  const { name, gender, species } = useContext(FilterContext)

  useEffect(() => {
    setPage(0)
    refetch({
      filter: {
        gender,
        name,
        species,
      },
      page: page + 1,
    })
  }, [name, gender, species])

  useEffect(() => {
    refetch({
      filter: {
        gender,
        name,
        species,
      },
      page: page + 1,
    })
  }, [page])

  return (
    <div className="content">
      <div className="container-header content__header">
        <div className="right">{data?.characters?.info?.count} Results</div>
      </div>
      {!loading && called && characters.length < 1 && <Error />}
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
      {data?.characters?.info && (
        <ReactPaginate
          pageCount={data.characters.info.pages as number}
          initialPage={page}
          forcePage={page}
          breakLabel="..."
          className="pagination"
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          pageClassName="page"
          previousLabel={<TiArrowLeft />}
          nextLabel={<TiArrowRight />}
          onPageChange={({ selected }) => setPage(selected)}
        />
      )}
    </div>
  )
}

export default Characters
