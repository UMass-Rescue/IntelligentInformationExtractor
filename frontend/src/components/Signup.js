import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";

const fields=signupFields;

const BACKEND_URL='http://127.0.0.1:5000'
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)

    if (signupState.password !== signupState['confirm-password']) {
      setPasswordsMatch(false);
      return; // Prevent further execution if passwords don't match
     }
    console.log(signupState)


      // Passwords match, proceed with account creation
    setPasswordsMatch(true);
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=()=>{
    // let signupFields={
    //   username:signupState['username'],
    //   email:signupState['email-address'],
    //   password:signupState['password']
    //  };
     let signupFields= new FormData();
     signupFields.append('username',signupState['username']);
     signupFields.append('email',signupState['email-address']);
     signupFields.append('password',signupState['password']);
    
    const endpoint= `${BACKEND_URL}/auth/signup`;
    fetch(endpoint,
      {
      method:'POST',
      // headers: {
      // 'Content-Type': 'application/json'
      // },
      body:signupFields
      }).then(response=>response.json())
      .then(data=>{
          console.log(data)
          //API Success from LoginRadius Login API
      })
      .catch(error=>console.log(error))

  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
        </div>
        {!passwordsMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}

         

      </form>
    )
}