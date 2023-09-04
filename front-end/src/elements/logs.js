import "./css/logs.sass";
import "./css/showNewNode.sass";

import { useEffect, useState, useRef } from "react";
import { conectionPath } from "../API/globals";

export function LogCard({ closeInfo, node, open }) {
  const [info, setInfo] = useState();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");   
  const [tempStartTime, setTempStartTime] = useState("");
  const [tempEndTime, setTempEndTime] = useState("");

  
  const myInterval = useRef();
  useEffect(() => {
    return () => clearInterval(myInterval.current);
  }, [node]);

  useEffect(() => {
    if (open) {
      getAlerts();
      clearInterval(myInterval.current)
      myInterval.current = setInterval(() => getAlerts(), 5000);
    } else {
      clearInterval(myInterval.current);
      myInterval.current = null;
    }
  }, [open,node,startTime,endTime]);

  function getAlerts() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: 10,
        fromDate: startTime,
        toDate: endTime,
      }),
    };
    fetch(conectionPath + "/graph/logs/" + node.data.name, requestOptions)
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        //console.log(text)
        setInfo(text);
      });
  }

  const handleSubmit = () => {
    setStartTime(tempStartTime.replace("T", ' '))  
    setEndTime(tempEndTime.replace("T", ' '))
    console.log(tempStartTime.replace("T", ' '))
    // Perform your function here
  };
  return (
    <div className="logsSection">
      <div className="Header">
        <h4>Logs</h4>
      </div>
      <div className="logsForm">
          <input
            type="datetime-local"
            id="timeInit"
			className=""
            name="timeInit"
            onChange={(e) => setTempStartTime(e.target.value)}
            required
            step="2"
          />
      </div>
      <div className="logsForm">
          <input
            type="datetime-local"
            id="timeEnd"
		      	className=""
            step="2"
            name="timeEnd"
            onChange={(e) => setTempEndTime(e.target.value)}
            required
          />
          <button type="submit" className="form--close" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="info-card" id="logsScreen">
          <div className="infoBody">
            {info}
          </div>
        
      </div>
    </div>
  );
}
