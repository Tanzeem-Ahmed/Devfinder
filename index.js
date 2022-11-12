const themeStyle = document.getElementById("theme-style");
const colorMode = document.getElementById("color-mode");
const searchInput = document.getElementById("search");
const search = document.getElementById("search-user");
const errorMsg = document.getElementById("error-msg");
const userImage = document.querySelector(".profile-img img");
const userTitle = document.querySelector(".profile h1");
const userName = document.querySelector(".profile a");
const userJoinedDate = document.querySelector(".profile small");
const userBio = document.querySelector(".profile-info p");
const dataInfo = document.querySelector(".data-info");
const socialMedia = document.querySelector(".social-media");

const defaultUser = "Octocat";

// Changing the theme
function switchTheme() {
  if (themeStyle.getAttribute("href") == "#") {
    themeStyle.href = "styles/dark.css";
  } else {
    themeStyle.href = "#";
  }
}

function getUserDetails(username) {
  // fetch from the github api
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => res.json())
    .then((data) => {
      // either user data available
      if (data["message"] === "Not Found") {
        errorMsg.style.display = "inline-block";
      } else {
        if ((errorMsg.style.display = "inline-block")) {
          errorMsg.style.display = "none";
        }
        console.log(data);

        // adding profile img
        userImage.src = data["avatar_url"];
        // adding user name
        userTitle.innerText = data["name"] == null ? username : data["name"];
        // showing user name and Navigate to the username in github profile
        userName.innerText = `@${username}`;
        userName.href = `https://github.com/${username}`;
        // user joined date
        const date = new Date(data["created_at"]).toDateString().slice(3, 16);
        userJoinedDate.innerText = `Joined on ${date}`;

        // Bio of the user
        userBio.innerText =
          data["bio"] == null ? "This profile has no bio" : data["bio"];

        // setting data information
        dataInfo.children[0].children[1].innerText = data["public_repos"];
        dataInfo.children[1].children[1].innerText = data["followers"];
        dataInfo.children[2].children[1].innerText = data["following"];

        // setting the social links
        // Location
        if (data["location"] === null) {
          socialMedia.children[0].firstElementChild.lastElementChild.innerText =
            "Not Available";
            socialMedia.children[0].firstElementChild.classList.add("not-available");
        } else {
          socialMedia.children[0].firstElementChild.lastElementChild.innerText =
            data["location"];
        }

        // Blog
        if (data["blog"] === "") {
          socialMedia.children[1].firstElementChild.lastElementChild.innerText =
            "Not Available";
            socialMedia.children[1].firstElementChild.classList.add("not-available");
        } else {
          socialMedia.children[1].firstElementChild.lastElementChild.innerText =
            data["blog"];
            socialMedia.children[1].firstElementChild.href = data["blog"];
        }

        // Twitter
        if (data["twitter_username"] === null) {
          socialMedia.children[2].firstElementChild.lastElementChild.innerText =
            "Not Available";
          socialMedia.children[2].firstElementChild.classList.add("not-available");
        } else {
          socialMedia.children[2].firstElementChild.lastElementChild.innerText =
            data["twitter_username"];
        }

        // Company
        if (data["company"] === null) {
          socialMedia.children[3].firstElementChild.lastElementChild.innerText =
            "Not Available";
            socialMedia.children[3].firstElementChild.classList.add("not-available");
        } else {
          socialMedia.children[3].firstElementChild.lastElementChild.innerText =
            data["company"];
        }
      }
    });
}

// get the Github user details
function searchUser(e) {
  e.preventDefault();
  // to get the user value
  const user = searchInput.value;

  // for this user get the user details
  getUserDetails(user);
}

getUserDetails(defaultUser);

colorMode.onclick = switchTheme;
search.onsubmit = searchUser;

window.onload = getUserDetails;
