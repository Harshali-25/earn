import React, { useState } from 'react';
import './App.css';
import * as yup from 'yup';
function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const userSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string(),
    email: yup.string().email("Invalid email format").required("Email is required"),

    password: yup.string().min(8, "Password must be at least 8 characters").required(),
    age: yup.string(),
    mobile: yup.string(),
  });

  async function validateForm(e) {
    e.preventDefault();

    let dataObject = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      age: age,
      mobile: mobile,
    };

    const isValid = await userSchema.isValid(dataObject);

    if (isValid) {
      alert('Form is Valid');
    } else {
      alert('Form is Invalid');
    }
  }

  return (
    <div className="main">
      <form onSubmit={validateForm}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input 
          placeholder="Age" 
          value={age}
          onChange={(e) => setAge(e.target.value)} 
        />

        <input 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <br></br>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;