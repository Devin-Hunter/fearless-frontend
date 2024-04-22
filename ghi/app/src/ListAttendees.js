import React, {useEffect, useState} from "react";
import Image from "./images/logo.svg"

export default function ListAttendees(props) {

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
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Conference</th>
            </tr>
          </thead>
          <tbody>
            {props.attendees.map(attendee => {
              return (
                <tr key={attendee.href}>
                  <td>{ attendee.name }</td>
                  <td>{ attendee.conference }</td>
                </tr>
                /*<Fragment key={attendee.href}>
                  <AttendeeName { attendee.name } />
                  <ConferenceName { attendee.conference } />
                </Fragment>*/
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
