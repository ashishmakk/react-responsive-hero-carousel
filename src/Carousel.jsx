import React, { useEffect, useState } from "react";
import { list } from "./data";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Carousel = () => {
  const [people, setPeople] = useState(list);
  const [personIndex, setPersonIndex] = useState(0);

  const prevSlide = () => {
    if (personIndex <= 0) {
      return setPersonIndex(people.length - 1);
    }

    return setPersonIndex(personIndex - 1);
  };

  const nextSlide = () => {
    if (personIndex >= people.length - 1) {
      return setPersonIndex(0);
    }

    return setPersonIndex(personIndex + 1);
  };

  useEffect(() => {
    let sliderId = setInterval(() => {
      nextSlide();
    }, 3700);

    return () => {
      clearInterval(sliderId);
    };
  }, [personIndex]);

  return (
    <section className='slider-container'>
      {people.map((item, index) => {
        const { name, image, title, quote } = item;

        return (
          <article
            className='slide'
            style={{
              transform: `translateX(${(index - personIndex) * 100}%)`,
              opacity: personIndex === index ? 1 : 0,
              visibility: personIndex === index ? "visible" : "hidden",
            }}
            key={item.id}
          >
            <div className='wrapper'>
              <img src={image} alt={name} className='person-img' />
              <div className='slide-content'>
                <h1>{title}</h1>
                <p>{quote}</p>
              </div>
            </div>
          </article>
        );
      })}
      <button type='button' className='prev' onClick={prevSlide}>
        <FiChevronLeft />
      </button>
      <button type='button' className='next' onClick={nextSlide}>
        <FiChevronRight />
      </button>
    </section>
  );
};

export default Carousel;
