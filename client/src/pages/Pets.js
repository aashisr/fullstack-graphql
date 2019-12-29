import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

// MAke a grapgql query to fetch all the pets
const ALL_PETS = gql`
  query getAllPets {
    pets {
      id
      name
      type
      img
    }
  }
`;

// GraphQL mutation for adding a pet
const ADD_PET = gql`
  mutation createAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
    }
  }
`;

export default function Pets() {
  // Causes the component to rerender when any of the states below changes
  const [modal, setModal] = useState(false)
  // Get all the pets with useQuery hook and store in a state
  const { data, loading, error } = useQuery(ALL_PETS);
  console.log('Loading is ', loading);
  console.log('Error is ',error);
  console.log('Data is ', data);

  // UseMutation hook for adding a pet
  // useMutation hook does not mutate, instead we need to call the first function below (createPet) to execute a mutation
  const [createPet, newPet] = useMutation(ADD_PET, {
    // Update the cache so that it rerenders the view once the data is added
    update(cache, { data: { addPet } }) {
      // Find the query from cache to update the cache
      const { pets } = cache.readQuery({ query: ALL_PETS });
      // Update the query in the cache 
      cache.writeQuery({
          query: ALL_PETS,
          data: { pets: [addPet, ...pets] }
      });
    }
  });
  console.log('Loading in mutation is ', newPet.loading);
  console.log('data in mutation is ', newPet.data);
  console.log('error in mutation is ', newPet.error);

  if (loading || newPet.loading) return <Loader />;
  if (error || newPet.error) return <p>Error !!</p>;

  const onSubmit = input => {
    console.log(input);
    setModal(false);
    createPet({ variables: { newPet: input } });
    console.log('newPet is ', newPet);
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
