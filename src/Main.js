import axios from "axios";
import { useEffect, useState } from "react";
import TimeKeeper from "react-timekeeper";

const Main = () => {
  const [days, setDays] = useState([1]);
  const [time, setTime] = useState("12:34");
  const [times, setTimes] = useState(["10:00"]);
  const [wordDays, setWordDays] = useState([]);
  const [phone, setPhone] = useState();
  const words = [
    "lunes",
    "martes",
    "miercoles",
    "jueves",
    "viernes",
    "sabado",
    "domingo",
  ];
  const [text, setText] = useState("");
  const [message, setMessage] = useState(false);

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
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleNumber = (e) => {
    setPhone(e.target.value);
  };

  const showMessage = () => {
    setMessage(true);
    let newDays = days.map((day) => words[day - 1]);

    setWordDays(newDays);
  };

  const sendData = () => {
    let newTimes = times.map((time) => {
      let parts = time.split(":"),
        hour = Number(parts[0]),
        minute = Number(parts[1]);
      return hour + ":" + minute;
    });
    const daysToServer = days.join(",");

    // console.log(newTimes);
    const data = { times: newTimes, days: daysToServer, text, phone };
    axios
      .post("https://wp2-production-5328.up.railway.app/api/reminder", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setMessage(false);
  };

  return (
    <div className="flex flex-col justify-center items-center mt-20 gap-6">
      {message && (
        <div
          id="toast-message-cta"
          className="w-full max-w-sm p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="flex">
            <img
              className="w-8 h-8 rounded-full shadow-lg"
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
              alt="Jese Leos image"
            />
            <div className="ml-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                Bot
              </span>
              <div className="mb-2 text-lg font-normal">
                Hey! Te recordare los dias
                <div className="font-bold break-all">{wordDays.join(",")}</div>
                en el siguiente horario:
                <div className="font-bold break-all">{times.join(",")}</div>
                el mensaje:
                <div className="font-bold break-all">{text}</div>
                <div>
                  <span className="font-bold text-yellow-500">
                    Es correcto?
                  </span>
                </div>
              </div>
              <button
                onClick={sendData}
                className="inline-flex px-2.5 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Ok
              </button>
              <button
                onClick={() => setMessage(false)}
                className="inline-flex px-2.5 py-1.5 mx-10  text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              >
                Back
              </button>
            </div>
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
              data-dismiss-target="#toast-message-cta"
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}
      {!message && (
        <div onClick={showMessage} className="btn btn-success">
          create remainder
        </div>
      )}
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
      <div>
        <div className="text-center mb-2">Remainder text</div>
        <input
          type="text"
          placeholder="example: brush my teeth"
          onChange={handleChange}
          className="input input-bordered input-secondary w-full max-w-xs"
        />
      </div>
      <div>
        <input
          type="number"
          maxLength="10"
          placeholder="Phone number"
          onChange={handleNumber}
          className="input input-bordered input-secondary w-full max-w-xs"
        />
      </div>

      <div className="flex flex-col items-center text-center  gap-5">
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
