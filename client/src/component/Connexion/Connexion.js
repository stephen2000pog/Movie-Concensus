
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import '../../css/Authentication.css'
import { useNavigate } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { useAuthContext } from '../../hooks/useAuthContext'

function Connexion() {
  //Used : https://leanylabs.com/blog/form-validation-in-react for the form validation
  //Used : https://codesandbox.io/p/sandbox/showhide-password-on-toggle-in-react-hooks-95qcz?file=%2Fsrc%2FApp.js and
  //          https://dev.to/annaqharder/hideshow-password-in-react-513a to hide/show the password with eye icon
  //Used : https://www.youtube.com/@NetNinja MERN Authentication tutorials and https://www.youtube.com/@WebDevSimplified JWT Authentication tutorials for authentication
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const [response, setResponse] = useState();
  const [ptype, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const { dispatch } = useAuthContext()

  const handleToggle = () => {
    if (ptype === 'password') {
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

  const validateFormat = (inputValues) => {
    let errors = {};
    if (!validateEmailFormat(inputValues.email))
      errors.email = "Adresse courriel invalide";
    if (!validatePSWFormat(inputValues.password))
      errors.password = "Mot de passe invalide";
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
    const finishSubmit = async () => {
      await axios.post('http://localhost:5000/login', {
        email: inputFields.email,
        password: inputFields.password
      })
        .then(res => {
          if (res.data.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data))
            // update the auth context
            dispatch({ type: 'LOGIN', payload: res.data })
            setSubmitting(false)
            navigate('/')
          } else {
            setSubmitting(false)
            setResponse(res.data.msg)
          }
        })
        .catch(err => {
          console.log("Erreur lors de la récupération du compte", err)
          setSubmitting(false)
        })
    }
    if (Object.keys(errors).length === 0 && submitting) {
      finishSubmit();
    }
  }, [inputFields, errors, submitting, navigate, response, dispatch]);
  return (
    <div className="App-header">
      <h1 className='titleauth'>Connectez-vous avec votre compte Movies Consensus</h1>
      <form id='form' onSubmit={handleSubmit} className='connection'>
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
          type={ptype === 'password' ? 'password' : 'text'}
          name='password'
          value={inputFields.password}
          onChange={handleChange}
          placeholder='Mot de passe'
        />
        <span onClick={handleToggle}>
          <Icon className="p-viewer" icon={icon} size={27} />
        </span>
        <br />
        <input type='submit' value="Connexion" />
        {errors.email ? (
          <p className='error'>
            {errors.email}
          </p>
        ) : null}
        {errors.password !== response ? (
          <p className='error'>
            {errors.password}
          </p>
        ) : null}
        {response !== '' ? (
          <p className='error'>
            {response}
          </p>
        ) : null}
      </form>
      <p className='prompt'>Pas de compte? <Link to="/create-account">Créez-en un</Link></p>
      <p className='prompt'><Link to="/connexion">Mot de passe oublié?</Link></p>
    </div >
  );
}

export default Connexion;