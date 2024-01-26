window.addEventListener('DOMContentLoaded', async () => {
    //console.log('statement1');
    const url = 'http://localhost:8000/api/states/';
    //console.log('statement2');

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // figure out what to do when the repsonse is bad
            throw new Error ('Bad fetch response');

        } else {
            const data = await response.json();
            console.log(data);

            const selectTag = document.getElementById('state');

            for (let state of data.states) {

                const option = document.createElement("option");

                option.value = state.abbreviation;

                option.innerHTML = state.name;

                selectTag.appendChild(option);
                console.log(option);
               }



        }
    } catch (e) {
        // figure out what to do if an error is raised
        console.error(e);
}

});
