import Nav from "./Nav";

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <>
    <Nav />
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

export default App;
