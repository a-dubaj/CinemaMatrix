import React, { useState } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import { Container, Row, Image, Col } from 'react-bootstrap';
import Timer from './components/Timer';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createBookingAction } from '../../redux/actions/bookingActions';

function Payment() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [valueRadio, setValueRadio] = useState('atm');

    if (!location.state) {
        return <Redirect to="/movies/now-showing" />;
    }

    const { user = {}, showtime = {}, booking = {} } = location.state;

    const onPreviousButtonClick = () => {
        history.goBack();
    };

    const onPaymentButtonClick = () => {
        dispatch(createBookingAction({ user, showtime, booking }, history));
    };

    const onChangeRadioCheckbox = (e) => {
        setValueRadio(e.target.value);
    };

    return (
        <main className="flex-shrink-0">
            <Container className="w-75">
                <Row>
                    <h3 className="text-center">Płatność</h3>
                </Row>
                <Row>
                    <Col className="ps-2">
                        <h6>METODY PŁATNOŚCI</h6>
                        <div className="form-check d-flex align-items-center">
                            <input
                                className="form-check-input me-2"
                                name="exampleRadios"
                                id="atm-card"
                                type="radio"
                                value="atm"
                                checked={valueRadio === 'atm'}
                                onChange={onChangeRadioCheckbox}
                            />
                            <label className="form-check-label" htmlFor="atm-card">
                                <div className="d-flex justify-content-center align-items-center">
                                    <Image
                                        width={37}
                                        height={37}
                                        src="https://www.cgv.vn/media/catalog/product/placeholder/default/atm_icon.png"
                                    />
                                    <span className="ms-1">ATM</span>
                                </div>
                            </label>
                        </div>
                        <div className="form-check d-flex align-items-center mt-2">
                            <input
                                className="form-check-input me-2"
                                name="exampleRadios"
                                id="visa-card"
                                type="radio"
                                value="visa"
                                checked={valueRadio === 'visa'}
                                onChange={onChangeRadioCheckbox}
                            />
                            <label className="form-check-label" htmlFor="visa-card">
                                <div className="d-flex justify-content-center align-items-center">
                                    <Image
                                        width={37}
                                        height={37}
                                        src="https://www.cgv.vn/media/catalog/product/placeholder/default/visa-mastercard-icon.png"
                                    />
                                    <span className="ms-1">VISA, MASTER CARD</span>
                                </div>
                            </label>
                        </div>
                    </Col>
                    <Col className="count_down_clock me-2" xs={2}>
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <Timer initialMinute={5} />
                        </div>
                    </Col>
                </Row>
                <div className="row mt-3">
                    <div className="col-1 previous-button" onClick={onPreviousButtonClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill="currentColor"
                            className="bi bi-arrow-left"
                            viewBox="0 0 16 16">
                            <path
                                fillRule="evenodd"
                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                            />
                        </svg>
                    </div>
                    <div className="col px-0 d-flex">
                        <div>
                            <Image className="booking-movie-img" src={showtime.Movie.poster} />
                        </div>
                        <div className="ms-1">
                            <p className="fw-bold mb-0">{showtime.Movie.title}</p>
                            <p className="mb-0">{showtime.Movie.genre}</p>
                            <p className="mb-0">{showtime.Cinema.CinemaType.name}</p>
                        </div>
                    </div>
                    <div className="col-4 px-0 ms-5 d-flex justify-content-center">
                        <div>
                            <p className="mb-1">Kino:</p>
                            <p className="mb-1">Seans:</p>
                            <p className="mb-1">Sala kinowa:</p>
                            {booking.seats.length > 0 ? <p className="mb-1">Miejsce</p> : ''}
                        </div>
                        <div className="col">
                            <p className="fw-bold mb-1 ms-2">{showtime.Cinema.Cineplex.name}</p>
                            <p className="fw-bold mb-1 ms-2">
                                {moment(showtime.start_time).format('DD/MM/YYYY - HH:mm A')}
                            </p>
                            <p className="fw-bold mb-1 ms-2">{showtime.Cinema.name}</p>
                            {booking.seats.length > 0 ? (
                                <p className="fw-bold mb-1 ms-2">
                                    {booking.seats.map((seat, i) => {
                                        return i === 0 ? seat : ', ' + seat;
                                    })}
                                </p>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                    <div className="col-2 text-end px-0 me-1">
                        <p className="fw-bold mb-1">Kwota do zapłaty</p>
                        <p className="fw-bold mb-1">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'PLN' }).format(
                                booking.total
                            )}
                        </p>
                    </div>
                    <div className="col-1 next-button" onClick={onPaymentButtonClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="50"
                            height="50"
                            fill="currentColor"
                            className="bi bi-credit-card-2-front-fill"
                            viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2.5 1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h2a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2zm0 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 2a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1zm3 0a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                        </svg>
                    </div>
                </div>
            </Container>
        </main>
    );
}

export default Payment;