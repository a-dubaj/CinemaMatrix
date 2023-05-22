import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { loginAction } from '../../../redux/actions/authActions';

function Login() {
    const { register, handleSubmit } = useForm();
    const isLogined = useSelector((state) => state.auth.isLogined);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        dispatch(loginAction(data));
    };

    useEffect(() => {
        if (isLogined) {
            history.push('/');
        }
    }, [history, isLogined]);

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <div className="row align-items-center g-lg-5">
                <div className="col-lg-7 text-start">
                    <p className="text-lg-start mt-3 fw-bold">
                       <br></br>Ogólnie informacje o
                        repertyuarach, najnowsze zwiatsuny filmów.
                    </p>
                </div>
                <div className="col-md-10 mx-auto col-lg-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="floatingInput"
                                {...register('email')}
                                placeholder="name@example.com"
                            />
                            <label htmlFor="floatingInput">Adres email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                autoComplete="password"
                                id="floatingPassword"
                                {...register('password')}
                                placeholder="Password"
                            />
                            <label htmlFor="floatingPassword">Hasło logowania</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary color-primary" type="submit">
                            Zaloguj się
                        </button>
                        <hr className="my-4" />
                        <p className="d-flex justify-content-between">

                        </p>
                        <div className="d-flex justify-content-between">
                            <Link className="text-link color-link" to="/forgot-password">
                                <span>Zapomniałeś hasła?</span>
                            </Link>
                            <Link className="text-link color-link-primary" to="/register">
                                <span>Rejestracja</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;