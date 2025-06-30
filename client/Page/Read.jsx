import React from 'react'
import { useState } from 'react'

const Read = () => {
    const [user,setUser] = useState([])

    fetch('http://localhost:3500/users')
    .then(res => res.json())
    .then(data => setUser(data))

  return (
    <div>
        {
            user.map((item,i) => (
                <h2 key={i}>{item.name}</h2>
            ))
        }
    </div>
  )
}

export default Read