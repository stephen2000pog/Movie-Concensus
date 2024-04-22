import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/Authentication.css'
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

export default function Authentication() {

  //Utilisé : https://leanylabs.com/blog/form-validation-in-react pour la validation du formulaire
  const [inputFields, setInputFields] = useState({
    email: "",
    username: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [response, setResponse] = useState({});
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }

  function validateEmailFormat(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  function validatePSWFormat(password) {
    var re = /^[A-Za-z0-9!@#$%?&*]{6,15}$/
    return re.test(password)
  }

  function validateUsername(username) {
    var re = /^[A-Za-z0-9._]{4,25}$/;
    return re.test(username);
  }
  const validateFormat = (inputValues) => {
    let errors = {};
    if (!validateEmailFormat(inputValues.email))
      errors.email = "Format courriel : example@example.example";
    if (!validatePSWFormat(inputValues.password))
      errors.password = "Mot de passe : de 6 à 15 caractères. Acceptés : Aa-Zz, 0-9 et !@#$%?&*";
    if (!validateUsername(inputValues.username))
      errors.username = "Nom d'utilisateur : de 4 à 25 caractères. Acceptés : Aa-Zz, 0-9, . et _";
    return errors;
  }

  const handleChange = (e) => {
    setInputFields({ ...inputFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validateFormat(inputFields));
    setSubmitting(true);
  };

  useEffect(() => {
    const finishSubmit = () => {
      axios.post('http://localhost:5000/signup', {
        username: inputFields.username,
        email: inputFields.email,
        password: inputFields.password
      })
        .then(res => {
          if (res.data === "User added!") {
            navigate('/connexion');
            alert('Votre compte a été créé avec succès');
          }
          setResponse(res.data);
        })
        .catch(err => {
          console.log("Dans frontend", err)
        })
      setSubmitting(false);
    }
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [inputFields, errors, submitting, navigate, response]);

  return (
    <div className="App-header">
      <h1 className='titleauth'>Créer un compte</h1>
      <form id='form' onSubmit={handleSubmit} className='create-account'>
        <input
          className='identification'
          type='text'
          name='username'
          value={inputFields.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
        />
        <br />
        <input
          className='identification'
          type='text'
          name='email'
          value={inputFields.email}
          onChange={handleChange}
          placeholder='Adresse courriel'
        />
        <br />
        <input
          className='identification'
          type={type === 'password' ? 'password' : 'text'}
          name='password'
          value={inputFields.password}
          onChange={handleChange}
          placeholder='Mot de passe'
        />
        <span onClick={handleToggle}>
          <Icon className="p-viewer" icon={icon} size={30} />
        </span>
        <br />
        <input type='submit' value="Créer votre compte" />
      </form>
      {errors.username ? (
        <p className='error'>
          {errors.username}
        </p>
      ) : null}
      {errors.email ? (
        <p className='error'>
          {errors.email}
        </p>
      ) : null}
      {errors.password ? (
        <p className='error'>
          {errors.password}
        </p>
      ) : null}
      {response.username ? (
        <p className='error'>
          {response.username}
        </p>
      ) : null}
      {response.email ? (
        <p className='error'>
          {response.email}
        </p>
      ) : null}
      {response.password ? (
        <p className='error'>
          {response.password}
        </p>
      ) : null}
    </div>
  )
}