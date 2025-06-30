import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});

  const UpdateHandel = e => {
    e.preventDefault()
    const name = e.target.name.value
    const password = e.target.password.value
    const result= {name,password} 
    console.log(result);

     fetch(`http://localhost:3500/users/${id}`,{
        method:'PUT',
        headers:{
            'content-type': 'application/json'
        } ,
        body: JSON.stringify(result)
     })
    .then(res => res.json())
    .then( data => {
        console.log(data);
        if(data.modifiedCount === 1){
            alert('update success')
        }
    })
  }

  useEffect(() => {
    fetch(`http://localhost:3500/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <h2>update information: {user.name}</h2>
      <form onSubmit={UpdateHandel}>
         <input type="text" name="name" defaultValue={user?.name} /> <br />
         <input type="text" name="password" defaultValue={user?.password} /><br />
         <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default Update;
