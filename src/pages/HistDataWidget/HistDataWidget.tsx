import * as React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import gsap from 'gsap';

import type { HistData } from '../../constants/historic-dates';
import * as hwStyle from './histDataWidget-style.scss';
import { cn } from '../../common/common-helpers';

const defaultTimeOfRotation = 300;

interface HistDataWidgetProps {
  data: HistData[];
}

export const HistDataWidget: React.FC<HistDataWidgetProps> = ({ data }) => {
  const eventsCount = data.length;
  const angleBetweenDots = 360 / eventsCount;

  const sliderRef = React.useRef<HTMLDivElement>(null);
  const mainCircleRef = React.useRef<HTMLDivElement>(null);
  const startDateRef = React.useRef<HTMLDivElement>(null);
  const endDateRef = React.useRef<HTMLDivElement>(null);
  
  const [angle, setAngle] = React.useState<number>(angleBetweenDots);
  const [currentEvent, setCurrentEvent] = React.useState<number>(0);
  const [timeOfRotation, setTimeOfRotation] = React.useState<number>(defaultTimeOfRotation);
  const [startDate, setStartDate] = React.useState<number>(Number(data[0].events[0].date));
  const [endDate, setEndDate] = React.useState<number>(Number(data[0].events[data.length - 1].date));

  React.useEffect(() => {
    const timer = setTimeout(() => {
      sliderRef.current?.classList.add(hwStyle.sliderShow);
      clearTimeout(timer);
    }, 300);
  }, [currentEvent]);

  function fadeIn(fn: Function): void {
    sliderRef.current?.classList.remove(hwStyle.sliderShow);
    const timer = setTimeout(() => {
      fn();
      clearTimeout(timer);
    }, 300);
  }

  function animateDatesRange(idx: number): void {
    const newStartDate = Number(data[idx].events[0].date);
    const startRange = newStartDate - startDate;
    const newEndDate = Number(data[idx].events[data.length - 1].date);
    const endRange = newEndDate - endDate;
    const animationTime = (timeOfRotation + 300) / 1000;

    gsap.to(startDateRef.current, {
      duration: animationTime,
      textContent: `+=${startRange}`,
      roundProps: 'textContent',
      ease: 'none',
      onUpdate: () => setStartDate(newStartDate)
    });
    gsap.to(endDateRef.current, {
      duration: animationTime,
      textContent: `+=${endRange}`,
      roundProps: 'textContent',
      ease: 'none',
      onUpdate: () => setEndDate(newEndDate)
    });
  }

  function loadEvent(idx: number):void {

    animateDatesRange(idx);

    mainCircleRef.current?.children[idx].classList.add(hwStyle.spinnerShoulderActive);
    
    const angleOfRotation = angleBetweenDots - idx * angleBetweenDots;
    setTimeOfRotation(Math.abs(currentEvent - idx) * defaultTimeOfRotation);
    const timer = setTimeout(() => {
      setAngle(angleOfRotation);
      clearTimeout(timer);
    }, 300);

    fadeIn(() => setCurrentEvent(idx));
  }

  const renderHeader = (): React.ReactNode => {
    return (
      <>
        <h1 className={hwStyle.historicDatesHeading}>Исторические даты</h1>
        <div className={cn(hwStyle.historicDatesRange, hwStyle.range)}>
          <p className={hwStyle.rangeStart} ref={startDateRef}>{startDate}</p>
          <p className={hwStyle.rangeEnd} ref={endDateRef}>{endDate}</p>
        </div>
      </>
    )
  };

  const renderSpinner = (): React.ReactNode => {
    const mainCircleStyle: React.CSSProperties = {
      '--count': eventsCount, 
      '--angle': angle + 'deg', 
      '--time': timeOfRotation + 'ms',
      '--delay': timeOfRotation + 300 + 'ms',
    } as React.CSSProperties;
    return (
      <div className={cn(hwStyle.historicDatesSpinner, hwStyle.spinner)}>
        <div 
          ref={mainCircleRef} 
          className={hwStyle.spinnerMainCircle}
          style={mainCircleStyle}
        >
          {
            data.map((item, idx) => {
              const { title } = item;
              const evtNumber = idx + 1;
              return (
                <div 
                  key={idx}
                  style={{ '--i': evtNumber } as React.CSSProperties}
                  className={cn(
                    hwStyle.spinnerShoulder, 
                    (currentEvent === idx) && hwStyle.spinnerShoulderActive
                  )} 
                  onClick={() => loadEvent(idx)}
                >
                  <div className={hwStyle.spinnerCircleArea}>
                    <p className={hwStyle.spinnerCircle}>
                      { evtNumber }
                      <span className={hwStyle.spinnerTitle}>{ title }</span>
                    </p>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  };

  const renderNavigator = (): React.ReactNode =>  {
    const total = `${String(currentEvent + 1).padStart(2,'0')}/${String(eventsCount).padStart(2,'0')}`
    const prevEvent = currentEvent - 1;
    const nextEvent = currentEvent + 1;
    return (
        <div className={cn(hwStyle.historicDatesNavigation, hwStyle.navigation)}>
          <p className={hwStyle.navigationTotal}>{total}</p>
          <div className={cn(hwStyle.navigation, hwStyle.controlButtons)}>
            <button 
              className={cn(hwStyle.controlButtonsDefault, hwStyle.controlButtonsPrev)}
              onClick={() => loadEvent(prevEvent)}
              disabled={currentEvent === 0}
            />
            <button
              className={cn(hwStyle.controlButtonsDefault, hwStyle.controlButtonsNext)}
              onClick={() => loadEvent(nextEvent)}
              disabled={currentEvent === eventsCount - 1}
            />
          </div>
        </div>
    )
  };

  const renderContent = (): React.ReactNode => {
    const { title, events } = data[currentEvent];
    return (     
      <div ref={sliderRef} className={cn(hwStyle.historicDatesSlider, hwStyle.slider)}>
        <p className={hwStyle.sliderMobileTitle}>{title}</p>
        <button className={cn(hwStyle.sliderBtn, hwStyle.sliderBtnPrev)} />
        <Swiper
          modules={[Navigation]}
          spaceBetween={80}
          slidesPerView={4}
          breakpoints={{
            320: {
             slidesPerView: 1.5,
             spaceBetween: 25
            },
            769: {
             slidesPerView: 3,
             spaceBetween: 80
            },
            1025: {
             slidesPerView: 4,
             spaceBetween: 80
            }
          }}
          navigation={{
            prevEl: hwStyle.sliderBtnPrev,
            nextEl: hwStyle.sliderBtnNext,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          { events.map((item, idx) => {
              const { date, description } = item;
              return (
                <SwiperSlide key={idx} className={hwStyle.sliderSlide}>
                  <p className={hwStyle.sliderYear}>{ date }</p>
                  <p className={hwStyle.sliderDescription}>{ description }</p>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
        <button className={cn(hwStyle.sliderBtn, hwStyle.sliderBtnNext)} /> 
      </div>
    );
  };

  const renderEventControlButtons = (): React.ReactNode => {
    return (
      <div className={hwStyle.eventsControlButtons}>
        {
          data.map((_, idx) => {
            return (
              <button 
                className={cn(
                  hwStyle.eventsButton, 
                  (currentEvent === idx) && hwStyle.eventsButtonActive
                )}
                key={idx}
                onClick={() => loadEvent(idx)}
              />
            );
          })
        }
      </div>
    )
  }

  return (
    <main className={hwStyle.main}>
      <section className={hwStyle.historicDates}>
        { renderHeader() }
        { renderSpinner() }
        { renderNavigator() }
        { renderContent() }
        { renderEventControlButtons() }
      </section>
    </main>
  );
}