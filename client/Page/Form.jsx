

const Form = () => {
    const FHandel = e=>{
        e.preventDefault()
        const name = e.target.name.value
        const password = e.target.password.value
        const result = {name,password}
        console.log(result);
        
        fetch('http://localhost:3500/users',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        })
        .then(res => res.json())
        .then( data => {
            console.log(data);
            if(data.insertedId){
                alert('Data Created Success')
            }
            
        })
    }
  return (
    <div>
        <form onSubmit={FHandel}>
            <input type="text" name="name"  /><br />
            <input type="text" name="password"  /> <br />
            <input type="submit" value="add" />
        </form>
    </div>
  )
}

export default Form