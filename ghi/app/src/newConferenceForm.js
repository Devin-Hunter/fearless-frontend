import React, {useState, useEffect} from "react";

export default function NewConference() {

    const [locations, setLocations] = useState([])

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

        const fetchLocationConfig = {
            method: "post",
            body: JSON.stringify(locationFormData),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(url, fetchConfConfig, fetchLocationConfig)
        if (!response.ok) {
            throw new Error('Bad fetch response while creating new conference')
        } else {
            setConferenceFormData(conferenceFormData)
            setLocationFormData(locationFormData)
        }
    }

    useEffect(() => {
        getLocations()
    }, [])

    return (
        <div className="container-xs">
            <div className="container mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Choose Location
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div className="accordion-body">
                            <h1 className="text-center" >New Conference Location</h1>
                            <select id="location_pk" value={conferenceFormData.location} onChange={handleConferenceFormChange} placeholder="Choose a location" className="form-select mb-3" aria-label="Default select example">
                                
                                {locations.map(l => {
                                    return (
                                        <option key={l.pk} value={l.pk}>{l.name} | {l.city}, {l.state.abbreviation}</option>
                                    )
                                })}
                            </select>
                            <form className="row g-3" onSubmit={handleSubmit}>
                                <div className="col-5">
                                    <label htmlFor="inputAddress" className="form-label">Location Name</label>
                                    <input onChange={handleLocationFormChange} type="text" className="form-control" id="inputAddress" placeholder="Example: Conference Center XYZ" />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="max_attendees" className="form-label">Room Count</label>
                                    <input onChange={handleLocationFormChange} type="number" className="form-control" id="Max Attendees" />
                                </div>
                                <div className="col-md-3">
                                    <label htmlFor="inputCity" className="form-label">City</label>
                                    <input onChange={handleLocationFormChange} type="text" className="form-control" id="inputCity" />
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="inputState" className="form-label">State</label>
                                    <select onChange={handleLocationFormChange} id="inputState" className="form-select">
                                    <option>Choose...</option>
                                    <option>...</option>
                                    </select>
                                </div>
                                <div className="col-6">
                                    <button type="submit" className="btn btn-primary">Create New Conference</button>
                                </div>
                            </form>
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Conference Details
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div className="accordion-body">
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
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
