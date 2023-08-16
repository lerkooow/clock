import './App.css';
import { useState, useEffect } from "react";
import alarmSound from './alarm.mp3';

const audio = new Audio(alarmSound);

function App() {

  const [Break, setBreak] = useState(5);
  const [Session, setSession] = useState(25);
  const [paused, setPaused] = useState(true);
  const [currentTimer, setCurrentTimer] = useState('Session');


  function plusB() {
    if (Break >= 60) {
      setBreak(60);
    } else if (Break < 60 && paused) {
      setBreak(Break + 1);
    }
  }

  function minusB() {
    if (Break <= 1) {
      setBreak(1);
    } else if (Break > 1 && paused) {
      setBreak(Break - 1);
    }
  }

  function plusS() {
    if (Session >= 60) {
      setSession(60);
    } else if (Session < 60 && paused) {
      setSession(Session + 1);
    }
  }

  function minusS() {
    if (Session <= 1) {
      setSession(1);
    } else if (Session > 1 && paused) {
      setSession(Session - 1);
    }
  }

  function reset() {
    setSession(25);
    setBreak(5);
    setTime([Session, 0])
    setPaused(true);
    setCurrentTimer('Session');
    audio.pause();
  }

  const [[m, s], setTime] = useState([25, 0]);

  const tick = () => {
    if (paused) return;

    if (s === 0) {
      if (m === 0) {
        if (currentTimer === 'Session') {
          setCurrentTimer('Break');
          setTime([Break, 0]);
          audio.play();
        } else if (currentTimer === 'Break') {
          setCurrentTimer('Session');
          setTime([Session, 0]);
          audio.play();
        } else {
          reset();
        }
      } else {
        setTime([m - 1, 59]);
      }
    } else {
      setTime([m, s - 1]);
    }
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  useEffect(() => {
    setTime([Session, 0]);
  }, [Session]);

  return (
    <div className="container">
      <div className="App">
        <div>
          <div className="title">25 + 5 Clock</div>
          <div className="tablo">
            <div className="length-control">
              <div id="break-label">Break Length</div>
              <div className="button">
                <div id="break-decrement" onClick={minusB}><i class="fa-solid fa-minus"></i></div>
                <div id="break-length">{Break}</div>
                <div id="break-increment" onClick={plusB}><i className="fa-solid fa-plus"></i></div>
              </div>
            </div>
            <div className="timer">
              <div className={m === 0 && s <= 59 ? 'red' : 'black'}>
                <div id="timer-label">{currentTimer === "Session" ? <p className="label">Session</p> : currentTimer === "Break" ? <p className="label">Break</p> : null}</div>
                <div id="time-left">
                  {`${m
                    .toString()
                    .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}
                </div>
              </div>
            </div>
            <div className="length-control">
              <div id="session-label">Session Length</div>
              <div className="button">
                <div id="session-decrement" onClick={minusS}><i className="fa-solid fa-minus"></i></div>
                <div id="session-length">{Session}</div>
                <div id="session-increment" onClick={plusS}><i className="fa-solid fa-plus"></i></div>
              </div>
            </div>
          </div>
        </div>
        <div className="time-controler">
          <div id="start_stop">
            {paused ? (
              <i onClick={() => setPaused(false)} className="fa-solid fa-play"></i>
            ) : (
              <i onClick={() => setPaused(true)} className="fa-solid fa-pause"></i>
            )}
            <audio id="beep"></audio>
          </div>
          <div id="reset">
            <i onClick={() => reset()} className="fa-solid fa-arrows-rotate"></i>
          </div>
        </div>
      </div >
    </div >
  );
}


export default App;
