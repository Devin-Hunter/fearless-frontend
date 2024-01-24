function createCard(name, description, pictureUrl, starts, ends, locationName) {
    return `
    <div class="col-md-4 md-4">
        <div class="card h-100 shadow rounded">
            <img src="${pictureUrl}" class="mh-25">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
                <p class="card-text">${description}</p>
            </div>
            <div class="card-footer text-body-secondary">
            ${starts} - ${ends}
            </div>
        </div>
    </div>
    `;
  }


window.addEventListener('DOMContentLoaded', async () => {
    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // figure out what to do when the repsonse is bad
            //throw new Error ('Bad fetch response');
            var alertList = document.querySelectorAll('.alert')
            var alerts =  [].slice.call(alertList).map(function (element) {
            return new bootstrap.Alert(element)
            })

        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
              const detailUrl = `http://localhost:8000${conference.href}`;
              const detailResponse = await fetch(detailUrl);
              if (detailResponse.ok) {
                const details = await detailResponse.json();
                console.log(details);
                const name = details.conference.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;
                const locationName = details.conference.location.name;


                const startDate = details.conference.starts;
                const startDateParsed = Date.parse(startDate);
                let s = new Date(startDateParsed);
                const starts = s.toDateString();

                const endDate = details.conference.ends;
                const endDateParsed = Date.parse(endDate);
                let e = new Date(endDateParsed);
                const ends = e.toDateString();

                const html = createCard(name, description, pictureUrl, starts, ends, locationName);
                const row = document.querySelector('.row');
                row.innerHTML += html;
                }
            }

            // const conference = data.conferences[0];
            // console.log(conference);
            // const nameTag = document.querySelector('.card-title');
            // nameTag.innerHTML = conference.name;

            // const detailUrl = `http://localhost:8000${conference.href}`;
            // const detailResponse = await fetch(detailUrl);
            // if (detailResponse.ok) {
            //     const details = await detailResponse.json();
            //     console.log(details);
            //     // const description = details.conference[1];
            //     const desTag = document.querySelector('.card-text');
            //     desTag.innerHTML = details.conference.description;

            //     const imageTag = document.querySelector('.card-img-top');
            //     imageTag.src = details.conference.location.picture_url;
            // }

        }
    } catch (e) {
        // figure out what to do if an error is raised
        //console.error(e);
        var alertList = document.querySelectorAll('.alert')
            var alerts =  [].slice.call(alertList).map(function (element) {
            return new bootstrap.Alert(element)
            })
}
});
