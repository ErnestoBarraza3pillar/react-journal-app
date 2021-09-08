import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import  validator  from "validator";
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../context/actions/Ui';
import { startRegisterLoginEmailPassword } from '../../context/actions/Auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const {msgError} = useSelector( state => state.ui )
    const [ formValues, hanldeInputChange] = useForm({
        username: 'Ernesto',
        email: 'ernestobarraza2014@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { username, email, password, password2} = formValues;

    const handleRegister = (e) =>{
        e.preventDefault();
        if (isFormValid()) {
            dispatch( startRegisterLoginEmailPassword (email,password,username))
        }

        console.log(username,email,password,password2)
       
    }

    const isFormValid = () =>{
        if (username.trim().length=== 0) {
            dispatch( setError ('Name is Required') )
            return false;
        }else if ( !validator.isEmail( email )) {
            dispatch( setError ('Email is not valid') )
            return false;
        }else if (password !== password2 || password.length < 5) {
            dispatch( setError ('Password is not valid') )
            return false;
        } 
        dispatch( removeError());
        return true;
    }
    


    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit={handleRegister}
                class="animate__animated animate__fadeIn animate__faster"
            >
                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            {msgError}
                        </div>
                    )
                }
                <input 
                    type="text"
                    placeholder="Name"
                    name="username"
                    className="auth__input"
                    autoComplete="off"
                    value={username}
                    onChange={hanldeInputChange} 
                />

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

                <input 
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={hanldeInputChange} 
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

               

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
