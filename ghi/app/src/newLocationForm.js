import React, {useState} from "react";

export default function NewLocation() {

    const [locationFormData, setLocationFormData] = useState({
        name: "",
        city: "",
        room_count: "",
        state: "",
    })

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

        const url = `http://localhost:8000/api/locations/`;

        const fetchConfConfig = {
            method: "post",
            body: JSON.stringify(locationFormData),
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

        const response = await fetch(url, fetchLocationConfig)
        if (!response.ok) {
            throw new Error('Bad fetch response while creating new location')
        } else {
            setLocationFormData(locationFormData)
        }
    }

    return (
        <div className="container-xs">
            <div className="container mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-center" >Add New Conference Location</h1>
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
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
