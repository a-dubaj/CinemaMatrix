import $ from 'jquery';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import './styles.scss';

function Navbar() {
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmitLogout = () => {
        dispatch(logout());
        history.push('/auth/login');
    };

    useEffect(() => {
        let btn = document.querySelector('#btn');
        let sidebar = document.querySelector('.sidebar');
        let searchBtn = document.querySelector('.bx-search');

        btn.onclick = function () {
            sidebar.classList.toggle('active');
        };
        searchBtn.onclick = function () {
            sidebar.classList.toggle('active');
        };

        const pathname = window.location.pathname;
        let currentElement = $(`a[href="${pathname}"]`);
        currentElement.addClass('active');

        $('.nav_list li a').bind('click', function () {
            $('.nav_list li a').removeClass('active');
            $(this).addClass('active');
        });
    });

    return (
        <div className="sidebar">
            <div className="logo_content">
                <div className="logo">
                    <i className="bx camera-movie"></i>
                    <div className="logo_name">Cinema Matrix</div>
                </div>
                <i className="bx bx-menu" id="btn" />
            </div>
            <ul className="nav_list">
                <li>
                    <i className="bx bx-search" />
                    <input type="text" placeholder="Search..." />
                    <span className="tooltip"></span>
                </li>
                <li>
                    <Link to="/dashboard">
                        <span className="links_name"></span>
                    </Link>
                    <span className="tooltip"></span>
                </li>
                <li>
                    <Link to="/dashboard/movies">
                        <i className="bx bx-movie-play"></i>
                        <span className="links_name">Filmy</span>
                    </Link>
                    <span className="tooltip">Filmy</span>
                </li>
                <li>
                    <Link to="/dashboard/cineplexs">
                        <i className="bx bxs-collection"></i>
                        <span className="links_name">Kino</span>
                    </Link>
                    <span className="tooltip">Kino</span>
                </li>
                <li>
                    <Link to="/dashboard/cinemas">
                        <i className="bx bx-tv"></i>
                        <span className="links_name">Sale</span>
                    </Link>
                    <span className="tooltip">Sale</span>
                </li>
                <li>
                    <Link to="/dashboard/showtimes">
                        <i className="bx bx-time-five"></i>
                        <span className="links_name">Seanse</span>
                    </Link>
                    <span className="tooltip">Seanse</span>
                </li>
                <li>
                    <Link to="/dashboard/tickets">
                        <i className="bx bxs-coupon"></i>
                        <span className="links_name">Bilety</span>
                    </Link>
                    <span className="tooltip">Bilety</span>
                </li>
                <li>
                    <Link to="/dashboard/users">
                        <i className="bx bx-user" />
                        <span className="links_name">Użytkownicy</span>
                    </Link>
                    <span className="tooltip">Użytkownicy</span>
                </li>
                <li>
                    <Link to="/dashboard/statistics">
                        <span className="links_name"></span>
                    </Link>
                    <span className="tooltip"></span>
                </li>
                <li>
                    <Link to="/dashboard/settings">
                        <span className="links_name"></span>
                    </Link>
                    <span className="tooltip"></span>
                </li>
            </ul>
            <div className="profile_content">
                <div className="profile">
                    <div className="profile_details">
                        <div className="name_job">
                            <div className="name">Admin</div>
                            <div className="job">Panel administracyjny</div>
                        </div>
                    </div>
                    <Link to="/" onClick={onSubmitLogout}>
                        <i className="bx bx-log-out" id="log_out" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;