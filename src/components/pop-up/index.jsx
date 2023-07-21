export default function PopUp({
  addCustomerMarking,
  setInputValue,
  inputValue,
  intervalRunning,
  handleStopInterval
}) {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <a class="button" href="#popup1">
          Add Customer Info
        </a>
        <button style={{ margin: "1em" }} onClick={handleStopInterval}>
          {!intervalRunning ? "Start Capturing" : "Stop Capturing"}
        </button>
      </div>
      <div id="popup1" class="overlay">
        <div class="popup">
          <h2>Here i am</h2>
          <a class="close" href="#">
            &times;
          </a>
          <div class="content">
            <div class="row">
              <span>
                <input
                  class="slide-up"
                  id="card"
                  type="text"
                  placeholder="Name"
                />
                <label for="card">Customer</label>
              </span>
              <span>
                <input
                  class="slide-up"
                  id="expires"
                  type="text"
                  placeholder="Number"
                />
                <label for="expires">Phone</label>
              </span>
              <span>
                <input
                  class="slide-up"
                  id="security"
                  type="text"
                  placeholder="Latitude"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <label for="security">Longitude</label>
              </span>
              <div
                style={{
                  color: "yellow",
                  fontSize: "10px",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    bottom: "30px",
                  }}
                >
                  Please enter values separated by commas:
                </span>
                <span
                  style={{
                    position: "relative",
                    bottom: "70px",
                  }}
                >
                  For example: 12.3456, -98.7654, 42.1234, -71.9876
                </span>
              </div>

              <a
                style={{
                  position: "relative",
                  bottom: "50px",
                  background: "yellow",
                  padding: "1em",
                  borderRadius: "5px",
                }}
                href="#"
                onClick={addCustomerMarking}
              >
                Get Current Location
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
