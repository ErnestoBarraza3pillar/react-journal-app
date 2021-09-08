import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { startGoogleLogin, startLoginEmailPassword } from '../../context/actions/Auth'
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

const dispatch = useDispatch();
const {loading} = useSelector( state => state.ui )
const [ formValues, hanldeInputChange] = useForm({
    email: 'test@gmail.com',
    password: '123456'
});

const handleLogin = (e) =>{
    e.preventDefault();
    console.log(email,password)
    dispatch(startLoginEmailPassword(email, password))
}
const { email, password} = formValues;

const handleGoodleLogin = () => {
    dispatch ( startGoogleLogin() );
}
    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form 
                onSubmit={handleLogin}
                class="animate__animated animate__fadeIn animate__faster"
            >

                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={hanldeInputChange} 
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={hanldeInputChange} 
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disable={ loading ? 1 : 0 }
                >
                    Login
                </button>

                
                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick= {handleGoodleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account    
                </Link>

            </form>
        </>
    )
}
