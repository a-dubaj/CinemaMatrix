import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getUserSelector } from './../../redux/selectors/authSelector';
import { getUserInfoAction, logoutAction } from '../../redux/actions/authActions';

function Header() {
    const user = useSelector(getUserSelector);
    const isLogined = user ? true : false;
    const dispatch = useDispatch();
    const history = useHistory();

    const loginOnClick = () => {
        history.push('/login');
    };

    const registerOnClick = () => {
        history.push('/register');
    };

    const onLogout = (e) => {
        e.preventDefault();
        dispatch(logoutAction());
        history.push('/');
    };

    useEffect(() => {
        if (isLogined) {
            dispatch(getUserInfoAction());
        }
    }, [dispatch, isLogined]);

    return (
        <div className="container">
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <a
                    href="/"
                    className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                </a>
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <Link to="/" className="nav-link px-4 link-dark fw-bold menu-link">
                            Strona główna
                        </Link>
                    </li>
                    <li>
                        <Link to="/cineplexs" className="nav-link px-4 link-dark fw-bold menu-link">
                            Kino
                        </Link>
                    </li>
                    <li>
                        <a
                            href="/movies"
                            className="nav-link px-4 link-dark fw-bold menu-link dropdown-toggle"
                            data-bs-toggle="dropdown">
                            Film
                        </a>
                        <ul className="dropdown-menu">
                            <li>
                                <Link className="dropdown-item" to="/movies/now-showing">
                                    Teraz grane
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="/movies/coming-soon">
                                    Niedługo w kinie
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
                <div className="col-md-3 text-end">
                    {!user ? (
                        <>
                            <button
                                type="button"
                                onClick={loginOnClick}
                                className="btn btn-outline-primary me-2 color-outline-primary">
                                Zaloguj
                            </button>
                            <button
                                type="button"
                                onClick={registerOnClick}
                                className="btn btn-primary color-primary">
                                Rejestracja
                            </button>
                        </>
                    ) : (
                        <div className="dropdown">
                            <button
                                className="dropdown-toggle btn btn-color-profile"
                                type="button"
                                id="dropdownMenuProfile"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <div>
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        width={36}
                                        height={36}
                                        className="rounded-circle img-cover"
                                    />
                                    <span className="text-center ms-1 mx-auto">{user.fullname}</span>
                                </div>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuProfile">
                                <li>
                                    <Link className="dropdown-item" to="/profile">
                                        Dane osobowe
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/history">
                                        Historia rezerwacji
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/change-password">
                                        Zmień hasło
                                    </Link>
                                </li>
                                <li>
                                    <a className="dropdown-item" onClick={onLogout} href="/logout">
                                        Wyloguj
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Header;