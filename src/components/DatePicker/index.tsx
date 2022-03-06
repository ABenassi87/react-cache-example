import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DatePicker: React.FunctionComponent = () => {
  const [showDatepicker, setShowDatepicker] = useState<boolean>(false);
  const [datepickerValue, setDatepickerValue] = useState<string>('');
  const [blankDays, setBlankDays] = useState<number[]>([]);
  const [noOfDays, setNoOfDays] = useState<number[]>([]);
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(7);
  const [year, setYear] = useState<number>(2020);

  useEffect(() => {
    initDate();
  }, []);

  const initDate = (): void => {
    const today = dayjs();
    setDay(today.day());
    setMonth(today.month());
    setYear(today.year());
    setDatepickerValue(today.toISOString());
  };

  const isToday = (date: number): boolean => {
    const today = dayjs().format();

    return datepickerValue === today;
  };

  const getDateValue = (date?: number) => {
    if (date) {
      let selectedDate = dayjs().set('year', year).set('month', month).set('day', date);
      setDatepickerValue(selectedDate.format);
      setShowDatepicker(false);
    }
  };
  const getNoOfDays = () => {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    // find where to start calendar day of week
    let dayOfWeek = new Date(year, month).getDay();
    let blankdaysArray = [];
    for (let i = 1; i <= dayOfWeek; i++) {
      blankdaysArray.push(i);
    }
    let daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }
    setBlankDays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  const setCalendar = (monthChange: -1 | 1) => {
    switch (monthChange) {
      case -1:
        if (month === 0) {
          setYear(year - 1);
          setMonth(12);
        }
        setMonth(month - 1);
        getNoOfDays();
        break;
      case 1:
        if (month === 11) {
          setYear(year + 1);
        }
        setMonth((month + 1) % 12);
        getNoOfDays();
        break;
    }
  };

  const getCalendarClasses = (date: number): string => {
    let classes = 'cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100';
    if (isToday(date)) {
      classes = classes.concat('bg-blue-500 text-white');
    } else {
      classes = classes.concat('text-gray-700 hover:bg-blue-200');
    }
    return classes;
  };
  return (
    <React.Fragment>
      <div className='mb-5 w-64'>
        <label htmlFor='datepicker' className='font-bold mb-1 text-gray-700 block'>
          Select Date
        </label>
        <div className='relative'>
          <input type='hidden' name='date' x-ref='date' />
          <input
            type='text'
            readOnly
            onClick={() => setShowDatepicker(!showDatepicker)}
            className='w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium'
            placeholder='Select date'
          />
          <div className='absolute top-0 right-0 px-3 py-2'>
            <svg className='h-6 w-6 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </div>
          {showDatepicker && (
            <div className='bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0'>
              <div className='flex justify-between items-center mb-2'>
                <div>
                  <span className='text-lg font-bold text-gray-800'>{MONTH_NAMES[month]}</span>
                  <span className='ml-1 text-lg text-gray-600 font-normal'>{year}</span>
                </div>
                <div>
                  <button
                    type='button'
                    className='focus:outline-none focus:shadow-outline transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full'
                    onClick={() => setCalendar(-1)}>
                    <svg className='h-6 w-6 text-gray-500 inline-flex' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7' />
                    </svg>
                  </button>
                  <button
                    type='button'
                    className='focus:outline-none focus:shadow-outline transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full'
                    onClick={() => setCalendar(1)}>
                    <svg className='h-6 w-6 text-gray-500 inline-flex' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7' />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='flex flex-wrap mb-3 -mx-1'>
                {DAYS.map((day, index) => (
                  <div className='px-1' key={index}>
                    <div className='text-gray-800 font-medium text-center text-xs'>{day}</div>
                  </div>
                ))}
              </div>
              <div className='flex flex-wrap -mx-1'>
                {blankDays.map((blankDay, index) => (
                  <div key={index} className='text-center border p-1 border-transparent text-sm' />
                ))}
                {noOfDays.map((date, index) => (
                  <div className='px-1 mb-1' key={index}>
                    <div onClick={() => getDateValue(date)} className={getCalendarClasses(date)}>
                      {date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DatePicker;
