import React, {useEffect, useState} from "react";
import Image from "./images/logo.svg"

export default function ListConferences() {

  const [conferences, setConferences] = useState([])


  const getConferences = async function () {
    const url = `http://localhost:8000/api/conferences`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error('Bad fetch response for conferences')
    } else {
      const data = await response.json()
      setConferences(data.conferences)
    }
  }

  useEffect(() => {
    getConferences()
  }, [])

  return (
    <>
      <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img className="bg-white rounded shadow d-block mx-auto mb-4" src={Image} alt="" width="600" />
        <h1 className="display-5 fw-bold">Conference GO!</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            The only resource you'll ever need to plan and run your in-person or
            virtual conference for thousands of attendees and presenters.
          </p>
        </div>
      </div>
      <div className="container">
            {conferences.map(conf => {
              return (
                <div className="col-md-4 md-4">
                <div className="card h-100 shadow rounded">
                    <img src={conf.location.pictureUrl} className="mh-25" />
                    <div className="card-body">
                        <h5 className="card-title">{conf.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{conf.location}</h6>
                        <p className="card-text">{conf.description}</p>
                    </div>
                    <div className="card-footer text-body-secondary">
                    {conf.starts} - {conf.ends}
                    </div>
                </div>
            </div>
              );
            })}
      </div>
    </>
  );
}
