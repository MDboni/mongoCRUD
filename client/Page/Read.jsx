import React from 'react'
import { useState,useEffect } from 'react'

const Read = () => {
    const [user,setUser] = useState([])

    useEffect(() => {
    fetch('http://localhost:3500/users')
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

    const DeletHandel = _id => {
        console.log(_id);

        fetch(`http://localhost:3500/users/${_id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then( data => {
            console.log(data);

            if (data.deletedCount>0) {
               alert('delet success')
      }
        })
  
    }

  return (
    <div>
        {
            user.map((item,i) => (
                <h2 key={i}>{item.name}{item._id}<button onClick={ () => DeletHandel(item._id)}>X</button></h2>
            ))
        }
    </div>
  )
}

export default Read