import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import ListConferences from "./ListConferences";
import NewConference from './newConferenceForm';

function App() {
  const [attendees, setAttendees] = useState([]);

  async function loadAttendees() {

    const response = await fetch('http://localhost:8001/api/attendees/');

    if (response.ok) {
      const data = await response.json();
      const attendeeList = data.attendees;
      setAttendees(attendeeList);
    } else {
      console.errorS(response);
    }
  }

  useEffect(() => {
    loadAttendees();
  }, [])

  return (
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<ListConferences attendees={attendees} />} />
          <Route path='/new/conference' element={<NewConference />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
