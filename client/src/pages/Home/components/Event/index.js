import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import './styles.scss';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import { Image } from 'react-bootstrap';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Event() {
    const events = [
    ];

    return (
        <div className="text-center mt-3">
            <div className="container px-0 mt-3">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={20}
                    slidesPerGroup={1}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    loopFillGroupWithBlank={true}>
                    {events.map((event, i) => (
                        <SwiperSlide key={i}>
                            <Image className="img-event" src={event} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="container w-75 px-0 mt-3 d-flex justify-content-between">
                <div>
                </div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default Event;