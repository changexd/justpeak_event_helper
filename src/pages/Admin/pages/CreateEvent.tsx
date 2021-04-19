export default function CreateEvent() {
  return (
    <div>
      <form className="NewEvent">
        <div className="NewEvent__EventName">
          <label>EventName</label>
          <input type="text" />
        </div>
        <div className="NewEvent__EventDateAndWeek">
          <div>
            <label>EventDate</label>
            <input type="date" />
          </div>
          <div>
            <label>Week</label>
            <input type="text" />
          </div>
        </div>
        <div className="NewEvent__PassCodeAndLimit">
          <div>
            <label>ParticipantLimit</label>
            <input type="text" />
          </div>
          <div>
            <label>PassCode</label>
            <input type="text" />
          </div>
        </div>
        <div className="NewEvent__EventLocation">
          <label>EventLocation</label>
          <input type="text" />
        </div>
        <div className="NewEvent__HostId">
          <label>HostId</label>
          <div>
            <input type="text" />
            <button type="button">Find Member</button>
          </div>
        </div>
        <div className="NewEvent__EventInfo">
          <label htmlFor="EventInfo"> sda</label>
          <span id="EventInfo" aria-label="EventInfo" role="textbox" contentEditable />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
