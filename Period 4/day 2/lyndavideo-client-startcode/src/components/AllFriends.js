import React from "react";
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const USERS = gql`
{
  users{
    name
    username
    role
  }
}
`

export default function All() {
    //const { loading, error, data, networkStatus } = useQuery(USERS);
    const { loading, error, data, networkStatus } = useQuery(USERS, {fetchPolicy: "no-cache" });
    //const { loading, error, data, networkStatus } = useQuery(USERS, { pollInterval: 15000 });
    if (loading) return (<h3>Loading...</h3>)
    if (error) return <p> {JSON.stringify(error)}</p>
    if (!data) return <p>No Data</p>

    return data.users.map((f,i) => {
        return <p key={i}><b>Name:</b> {f.name}, <b>Username:</b> {f.username}, <b>Role:</b> {f.role}</p>
    })

}