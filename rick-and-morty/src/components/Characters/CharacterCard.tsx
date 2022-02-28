import React from 'react'
import { ICharacter } from '../../types/character'

interface Props {
  character: ICharacter
}

function CharacterCard({ character }: Props) {
  const { image, location, name, species } = character
  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt={name} />
      </div>
      <div className="card__info">
        <p className="card__text card__text--species">{species}</p>
        <p className="card__text card__text--name">{name}</p>
        <p className="card__text card__text--location">{location.name}</p>
      </div>
    </div>
  )
}

export default CharacterCard
