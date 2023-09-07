/* Grab the html element for the new friend text box*/
let frienduser = document.getElementById("newfriend").value;

/* Grab the html element for */
let addbutton = document.getElementById("addfriend");
addbutton.classList.add("track-button", "btn", "btn-primary", "btn-lg");

/* Grab the html elements for the user, username, and email */
let currentuser = document.getElementById("currentuser");
let currentusername = document.getElementById("username");
let currentemail = document.getElementById("email");

/* Grab the current user from Session Storage */
let user = JSON.parse(sessionStorage.getItem('User'));

/* Parse the user's first and last name */
if (user.fname === undefined || user.lname === undefined) {
    currentuser.innerText = user.firstname + " " + user.lastname;
}
else {
    currentuser.innerText = user.fname + " " + user.lname;
}

/* Set the username and email in the html profile from the database */
currentusername.innerText = user['username'];
currentemail.innerText = user['email'];

/* Grab the user's array of friends from the database */
let friends = user['friends'];

/* Dynamically create the div table to display the user's friends */
let friendtable = document.getElementById("FriendTable");
createTable(friendtable);

/* Create event listeners for style choices on 'Add Friend' button */
addbutton.addEventListener("mouseover", () => {
    addbutton.style.backgroundColor = "#6d92ff";
});

addbutton.addEventListener("mouseout", () => {
    addbutton.style.backgroundColor = "#031658";
});

/* Add the new friend's username to the current user's database & update html/database */
addbutton.addEventListener("click", async () => {
    // get the text value of the new friend's username
    frienduser = document.getElementById("newfriend").value;

    // create a newfriend variable w the current user and the friend's username
    let newfriend = { "username": user['username'], "friendusername": frienduser, "friends": user['friends'] };

    // post the new username/friend
    let updateduser = await fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newfriend)
    });

    // update the current user
    updateduser = await updateduser.json();

    // update user in session storage
    sessionStorage.setItem('User', JSON.stringify(updateduser));
    user = JSON.parse(sessionStorage.getItem('User'));

    // update friends
    friends = user['friends'];

    // re-create the table once the new friend is added
    createTable(friendtable);
})

/* Dynamically create the contacts table */
function createTable(table) {

    // create the table only when the friends array is not empty
    if (friends !== null) {
        let html = '';
        html += '<table>';
        html +=
            `   <tr>
                <th style="background:#6d92ff;color:#000000; font-weight:bold">Username</th>
                <th style="background:#6d92ff;color:#000000; font-weight:bold">First Name</th>
                <th style="background:#6d92ff;color:#000000; font-weight:bold">Last Name</th>
                <th style="background:#6d92ff;color:#000000; font-weight:bold">Email</th>
            </tr>`;
        friends.forEach((friend) => {
            html += `
                <tr>
                    <td style="color:#000000;">${friend.username}</td>
                    <td style="color:#000000;">${friend.firstname}</td>
                    <td style="color:#000000;">${friend.lastname}</td>
                    <td style="color:#000000;">${friend.email}</td>
                </tr>
            `;
        });
        html += '</table>';

        // add border table class styling properties
        table.classList.add("table", "border");

        // set the table html element to the table we just created
        table.innerHTML = html;
    }
}
