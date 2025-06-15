import React from 'react'
import CourseCard from './CourseCard'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

function CourseSlider({ Courses }) {
    return (

        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            style={{
                "--swiper-navigation-color": "#000",
                "--swiper-navigation-size": "15px",
            }}
        >
            {Courses?.map((course, index) => (
                <SwiperSlide key={index}>
                    <CourseCard Course={course} />
                </SwiperSlide>
            ))}

        </Swiper>


    )
}

export default CourseSlider