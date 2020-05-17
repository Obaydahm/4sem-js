import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"
import AddFriend from "./AddFriend"

const GET_FRIEND = gql`
  query getOneFriend($id:ID!){
  getOneFriend(id:$id){
    id
    firstname
    lastname
    language
    gender
    age
    email
  }
}
`

export default function FindFriend() {
  const [id, setId] = useState("")
  const [getFriend, { loading, error, data }] = useLazyQuery(GET_FRIEND);

  const fetchFriend = () => {
    // if (id === "" || id.length !== 24) {
    //   return;
    // }
    alert(`Find friend with id: ${id}`)
  }

  return (
    <div>
      ID:<input type="txt" value={id} onChange={e => { setId(e.target.value) }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br/>
      <br/>

      <h2>Fetch a friend using the provided id</h2>

    </div>)
}
