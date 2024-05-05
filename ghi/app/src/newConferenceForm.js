import React, {useState, useEffect} from "react";

export default function NewConference() {

    const [locations, setLocations] = useState([])
    const [states, setStates] = useState([])
    const [openModal, setOpenMOdal] = useState(false)

    const [conferenceFormData, setConferenceFormData] = useState({
        name: "",
        starts: "",
        ends: "",
        description: "",
        max_presentations: "",
        max_attendees: "",
        location: "",
    });

    const [locationFormData, setLocationFormData] = useState({
        name: "",
        city: "",
        room_count: "",
        state: "",
    })

    const getLocations = async function () {
        const url = `http://localhost:8000/api/locations`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Bad fetch response for locations')
        } else {
            const data = await response.json()
            setLocations(data.locations)
        }
    }

    const getStates = async function () {
        const url = `http://localhost:8000/api/states`
        const response = await fetch(url)

        if (!response.ok) {
            throw new Error('Bad fetch response for states')
        } else {
            const data = await response.json()
            setStates(data.states)
        }
    }

    const handleConferenceFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;

        setConferenceFormData({
            ...conferenceFormData,
            [inputName]: value
        });
    }

    const handleLocationFormChange = (event) => {
        const value = event.target.value;
        const inputName = event.target.name;

        setLocationFormData({
            ...locationFormData,
            [inputName]: value
        });
    }

    const handleSubmit = async function (event) {
        event.preventDefault();

        const url = `http://localhost:8000/api/conferences/`;

        const fetchConfConfig = {
            method: "post",
            body: JSON.stringify(conferenceFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfConfig)
        if (!response.ok) {
            throw new Error('Bad fetch response while creating new conference')
        } else {
            setConferenceFormData(conferenceFormData)
        }
    }

    const handleLocationSubmit = async function (event) {
        event.preventDefault();

        const url = `http://localhost:8000/api/locations/`;

        const fetchLocationConfig = {
            method: "post",
            body: JSON.stringify(locationFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchLocationConfig)
        if (!response.ok) {
            throw new Error('Bad fetch response while creating new Location')
        } else {
            setLocationFormData(locationFormData)
        }
    }

    useEffect(() => {
        getLocations()
        getStates()
    }, [])

    return (
        <div className="container-xs">
            <div className="container mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-center" >New Conference Details</h1>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-6">
                        <label htmlFor="name" className="form-label">Conference Name</label>
                        <input onChange={handleConferenceFormChange} type="text" className="form-control" id="name" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="starts" className="form-label">Start Date</label>
                        <input onChange={handleConferenceFormChange} type="date" className="form-control" id="starts" />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="ends" className="form-label">End Date</label>
                        <input onChange={handleConferenceFormChange} type="date" className="form-control" id="ends" />
                    </div>
                    <div className="col-12">
                        <label htmlFor="description" className="form-label">Conference Description</label>
                        <textarea onChange={handleConferenceFormChange} type="text" className="form-control" id="description" />
                    </div>
                    <div className="col-5">
                        <select id="location_pk" value={conferenceFormData.location} onChange={handleConferenceFormChange} placeholder="Choose a location" className="form-select" aria-label="Default select example">
                        <option defaultValue="">Choose Location</option>
                        {locations.map(l => {
                            return (
                                <option key={l.pk} value={l.pk}>{l.name} | {l.city}, {l.state.abbreviation}</option>
                            )
                        })}
                    </select>
                    </div>

                    <div className="col-6">
                        <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => setOpenMOdal(true)}>Add New Location</button>
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="max_presentations" className="form-label">Max Presentations</label>
                        <input onChange={handleConferenceFormChange} type="number" className="form-control" id="max_presentations" />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="max_attendees" className="form-label">Max Attendees</label>
                        <input onChange={handleConferenceFormChange} type="number" className="form-control" id="max_attendees" />
                    </div>
                    <div className="col-6">
                        <button type="submit" className="btn btn-primary">Create New Conference</button>
                    </div>
                </form>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">New Conference Location</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div >
                                    <label htmlFor="name" className="form-label">Location Name</label>
                                    <input onChange={handleLocationFormChange} type="text" className="form-control" id="name" value={locationFormData.name} placeholder="Example: Conference Center XYZ" />
                                </div>
                                <div>
                                    <label htmlFor="room_count" className="form-label">Room Count</label>
                                    <input onChange={handleLocationFormChange} type="number" className="form-control" id="room_count" />
                                </div>
                                <div>
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input onChange={handleLocationFormChange} type="text" className="form-control" id="city" />
                                </div>
                                <div >
                                    <label htmlFor="state" className="form-label">State</label>
                                    <select onChange={handleLocationFormChange} id="state" className="form-select">
                                        <option>Choose State</option>
                                        <option defaultValue="">Choose Location</option>
                                        {states.map(s => {
                                            return (
                                                <option key={s.id} value={s.abbreviation}>{s.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleLocationSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
