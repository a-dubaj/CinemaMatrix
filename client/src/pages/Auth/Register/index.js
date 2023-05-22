import React, { useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { registerAction } from '../../../redux/actions/authActions';

function Register() {
    const { register, handleSubmit } = useForm();
    const email = useSelector((state) => state.auth.email);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (data) => {
        data.birthday = moment(data.birthday).format('YYYY-MM-DD');
        dispatch(registerAction(data));
    };

    const isNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    };

    useEffect(() => {
        if (email) {
            history.push('/enter-code', [email, false]);
        }
    }, [history, email]);

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            <div className="row align-items-center g-lg-5">
                <div className="col-lg-7 text-start">
                    <p className="text-lg-start mt-3 fw-bold">
                        Ogólnie informacje o
                        repertyuarach, najnowsze zwiatsuny filmów.
                    </p>
                </div>
                <div className="col-md-10 mx-auto col-lg-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="p-4 p-md-5 border rounded-3 bg-light">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="nameInput"
                                {...register('fullname')}
                                placeholder="Trần Dần"
                            />
                            <label htmlFor="nameInput">Imię i nazwisko</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                maxLength="10"
                                className="form-control"
                                id="phoneInput"
                                onInput={isNumber}
                                {...register('phone')}
                                placeholder="5xxxxxxxx"
                            />
                            <label htmlFor="phoneInput">Numer telefonu</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                {...register('email')}
                                placeholder="name@example.com"
                            />
                            <label htmlFor="emailInput">Adres email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                autoComplete="password"
                                {...register('password')}
                                placeholder="Password"
                            />
                            <label htmlFor="passwordInput">Hasło</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="date"
                                className="form-control"
                                id="birthdayInput"
                                {...register('birthday')}
                                placeholder="2000-07-10"
                            />
                            <label htmlFor="birthdayInput">Data urodzenia</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                id="addressInput"
                                {...register('address')}
                                placeholder="HCM"
                            />
                            <label htmlFor="addressInput">Adres zamieszkania</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary color-primary" type="submit">
                            Rejestracja
                        </button>
                        <hr className="my-4" />
                        <p className="d-flex justify-content-between">

                        </p>
                        <div className="d-flex justify-content-center">
                            <Link className="text-link color-link-primary" to="/login">
                                <span className="color-link">Masz już konto? </span>
                                <span>Zaloguj się</span>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;