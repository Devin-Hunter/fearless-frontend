# ConferenceGO

### Design
ConferenceGO is comprised of one monolith and one microservice. Events & Presentations interact with each other, while the microservice Attendees interacts with both Events and Presentations.

### How to run the project?
1. clone repository to local machine in terminal:
* `git clone <<repository_url>>`
2. build and run using Docker in terminal:
* `docker volume create pgdata`
* `docker compose build`
3. wait for build to complete
* `docker compose up`

After all docker containers are running the project can be viewed on http://localhost:3000
