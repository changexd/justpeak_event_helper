function HostInfo() {
  return (
    <div>
      <p className="HostId">Id</p>
      <p className="HostFB">FBName</p>
      <p className="HostEng">EngName</p>
      <p className="HostZht">ZhtName</p>
    </div>
  );
}

export default function CreateEvent() {
  const findHost = false;
  return (
    <div>
      {findHost ? (
        <div className="NewEvent__FindHost">
          <form>
            <div><input type="text" /></div>
            <button type="submit">FindHost</button>
          </form>
          <div><HostInfo /><HostInfo /><HostInfo /><HostInfo /></div>
        </div>
      ) : (
        ''
      )}
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
          <label htmlFor="EventInfo">Info</label>
          <span
            id="EventInfo"
            aria-label="EventInfo"
            role="textbox"
            contentEditable
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
}
