document.getElementById("form").addEventListener("submit", function (event) {
  document.getElementById("submit").classList.add("is-loading");
  event.preventDefault();
  var name = this.elements.name.value;
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://script.google.com/macros/s/AKfycbyPKJfgkJuoWKFxbbtlcP01DZtSBdrbqLeO61gRj6Lvc_khhFIVzKH_3Xst4y-M8faN2g/exec?name=" +
      name,
    true
  );
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      document.getElementById("submit").classList.remove("is-loading");
      var idAndNames = xhr.responseText;
      if (idAndNames === "Name not found") {
        document.getElementById(
          "output"
        ).innerHTML = `<div class="notification is-danger">Couldn't find guest name.</div>`;
      } else if (idAndNames === "Already RSVPd") {
        document.getElementById(
          "output"
        ).innerHTML = `<div class="notification is-danger">This guest has already submitted an RSVP.</div>`;
      } else {
        create_rsvpPage1(idAndNames);
      }
    }
  };
  xhr.send();
});

function create_rsvpPage1(idAndNames) {
  const data = [];
  const inputArray = idAndNames.split(",");
  const inviteID = inputArray.shift() || "NA";

  // Iterate through the remaining names and create an object for each person
  inputArray.forEach((name, index) => {
    if (name) {
      data.push({
        inviteID: inviteID,
        name: name,
        attending: 0,
        id: `person${index}`, // checkbox id, so submit button can find it
      });
    }
  });

  document.getElementById("entireForm").innerHTML = `
  <div class="content">
      <p>We found your RSVP!</p>
      ${data
        .map(
          (person) => `
          <div class="card mb-4">
              <div class="card-content">
                  <p class="subtitle">${person.name}</p>
                  <div class="field">
                    <label class="checkbox">
                      <input type="checkbox" id="${person.id}">
                      <span class="ml-2">Attending?</span>
                    </label>
                  </div>
              </div>
          </div>
      `
        )
        .join("")}
      <div class="field">
          <div class="control has-text-centered">
              <button id="submit" class="button is-link">Submit</button>
          </div>
      </div>
  </div>
`;

  // Submit button code
  document.getElementById("submit").addEventListener("click", () => {
    document.getElementById("submit").classList.add("is-loading");
    // write each person's attending value to "data"
    data.forEach((person) => {
      person.attending = document.getElementById(person.id).checked ? 1 : 0;
    });

    submitForm(data);

    // Disable the submit button so people can't click on it multiple times
    document.getElementById("submit").disabled = true;
  });
}

function submitForm(data) {
  const url =
    "https://script.google.com/macros/s/AKfycbyPKJfgkJuoWKFxbbtlcP01DZtSBdrbqLeO61gRj6Lvc_khhFIVzKH_3Xst4y-M8faN2g/exec";
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (xhr.status === 200) {
      try {
        const response = JSON.parse(xhr.responseText);

        if (response.success) {
          document.getElementById("submit").classList.remove("is-loading");

          // Build guest list HTML
          let guestListHtml = `<div class="rsvp-container"><h2 class="rsvp-header">RSVP Received! ✓</h2>`;
          guestListHtml += `<p>We have recorded the following responses:</p><ul class="guest-list">`;
          response.guests.forEach((guest) => {
            guestListHtml += `<li>${guest.name}: ${guest.status}</li>`;
          });
          guestListHtml += `</ul>`;

          // Add AddEvent calendar widget
          guestListHtml += `
            <div title="Add to Calendar" class="addeventatc">
              Add to Calendar
              <span class="start">05/30/2026 02:00 PM</span>
              <span class="end">05/30/2026 07:00 PM</span>
              <span class="timezone">America/Chicago</span>
              <span class="title">Lucy and Tanner's Wedding</span>
              <span class="description">Join us for a beautiful wedding celebration!</span>
              <span class="location">4500 Little Blue Pkwy, Independence, MO 64057</span>
            </div></div>
          `;

          // Replace form with results + calendar
          document.getElementById("entireForm").innerHTML = guestListHtml;

          // Refresh AddEvent script (so button initializes)
          if (window.addeventatc) {
            addeventatc.refresh();
          }
        } else {
          document.getElementById("entireForm").innerHTML =
            "<div>There was a problem recording your RSVP.</div>";
        }
      } catch (err) {
        console.error("Error parsing response:", err, xhr.responseText);
      }
    } else {
      console.error("Server error:", xhr.status, xhr.responseText);
    }
  };

  xhr.onerror = function () {
    console.error("Network error");
  };

  xhr.send(JSON.stringify(data));
}
