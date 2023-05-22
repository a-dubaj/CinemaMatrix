import React from 'react';
import './styles.scss';

function Banner() {
    const banners = [];
    return (
        <div
            id="carouselExampleIndicators"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={0}
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={2}
                    aria-label="Slide 3"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={3}
                    aria-label="Slide 4"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={4}
                    aria-label="Slide 5"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={5}
                    aria-label="Slide 6"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={6}
                    aria-label="Slide 7"
                />
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={7}
                    aria-label="Slide 8"
                />
            </div>

            <div className="carousel-inner">
                {banners.map((url, i) => {
                    let className = i === 0 ? 'carousel-item active' : 'carousel-item';
                    return (
                        <div key={i} className={className} data-bs-interval={1000}>
                            <img src={url} className="mx-auto d-block w-75 h-75 img-banner" alt={'slide' + i}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Banner;