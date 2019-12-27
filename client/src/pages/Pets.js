import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

// MAke a grapgql query to fetch all the pets
const getAllPetsQuery = gql`
  query getAllPets {
    pets {
      id
      name
    }
  }
`;

export default function Pets () {
  const [modal, setModal] = useState(false)
  // Get all the pets with useQuery hook and store in a state
  const { data, loading, error } = useQuery(getAllPetsQuery);
  console.log(loading);
  console.log(data);

  if (loading) return '<div></div>';

  const onSubmit = input => {
    setModal(false)
  }
  
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}
