import axios from "axios";
import { useState } from "react";
import TimeKeeper from "react-timekeeper";

const Main = () => {
  const [days, setDays] = useState([]);
  const [time, setTime] = useState("12:34");
  const [times, setTimes] = useState(["10:00"]);

  const [LetterDay] = useState(["L", "M", "M", "J", "V", "S", "D"]);
  const setDay = (e) => {
    const numDay = parseInt(e.target.id);
    const index = days.indexOf(numDay);
    if (index > -1) {
      setDays(days.filter((item) => item !== numDay));
    } else {
      setDays([...days, numDay]);
    }
  };

  const addTime = () => {
    console.log("ajaj");
    const index = times.indexOf(time);
    console.log(index);
    if (index > -1) {
      //   setTimes(times.filter((item) => item !== time));
      return;
    } else {
      setTimes([...times, time]);
    }
    console.log(times);
  };
  const removeTime = (time) => {
    setTimes(times.filter((item) => item !== time));
  };

  const sendData = () => {};

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div onClick={sendData} className="btn btn-success">
        create remainder
      </div>
      <div className="text-center">Select Days</div>
      <div className="days flex justify-center flex-row gap-5">
        {LetterDay.map((letter, key) => {
          return (
            <div
              id={key + 1}
              key={key}
              onClick={setDay}
              className={days.indexOf(key + 1) > -1 ? "fully-day" : "empty-day"}
            >
              {letter}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col items-center text-center mt-10 gap-5">
        <div>Selected hours:</div>
        <div className="flex flex-col">
          {times.map((time, key) => {
            return (
              <div key={key}>
                <div className="text-2xl mb-5">
                  {time}
                  <span
                    onClick={() => removeTime(time)}
                    className="btn btn-sm rounded-full absolute ml-5"
                  >
                    ×
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <TimeKeeper
          time={time}
          className="m-10"
          onChange={(data) => setTime(data.formatted24)}
        />
        {/* <div>Time is {time}</div> */}
        <div>
          <button onClick={addTime} className="btn btn-accent">
            Save Hour
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
