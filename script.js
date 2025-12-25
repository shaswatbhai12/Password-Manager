function maskPassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str  += "*"
    }
    return str
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
          /* clipboard successfully set */
          document.getElementById("alert").style.display = "inline"
          setTimeout(() => {
            document.getElementById("alert").style.display = "none"
          }, 2000);

        },
        () => {
          /* clipboard write failed */
          alert("Clipboard copying failed")
        },
      );
  }

const deletePassword = (index) => {
    let data = localStorage.getItem("passwords");
    if (!data) return;

    let arr = JSON.parse(data);

    let websiteName = arr[index].website;

    arr.splice(index, 1);

    localStorage.setItem("passwords", JSON.stringify(arr));
    alert(`Successfully deleted ${websiteName}'s password`);
    showPasswords();
}

function toggleInputVisiblity() {
    let passInput = document.getElementById("password")
    let icon = document.getElementById("toggleInputPass")

    if (passInput.type === "password") {
        passInput.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash")
    }

    else {
        passInput.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

function toggleTablePass(index, actualPassword, element) {
    let span = document.getElementById(`passText-${index}`)

    if (element.classList.contains("fa-eye")) {
        span.innerText = actualPassword;
        element.classList.replace("fa-eye", "fa-eye-slash");
    }
    else{
        span.innerText = maskPassword(actualPassword);
        element.classList.replace("fa-eye-slash", "fa-eye");
    }
}
// Logic to fill the table
const showPasswords = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show"
    }
    else {
        tb.innerHTML =  `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr> `
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10">
    </td>
    <td><span id="passText-${index}">${maskPassword(element.password)}</span><i class="fa-solid fa-eye" onclick="toggleTablePass(${index}, '${element.password}', this)"></i> <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" height="10">
    </td>
    <td> <button class="btnsm" onclick="deletePassword('${index}')">Delete</button></td>
        </tr>`
        }
        tb.innerHTML = tb.innerHTML + str

    }
    website.value = ""
    username.value = ""
    password.value = ""
}

console.log("Working");
showPasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    if (website.value.trim() === "" || username.value.trim() === "" || password.value.trim() === "") {
        alert("Error: All field are required!");
        return;
    }
    console.log("Clicked....")
    let passwords = localStorage.getItem("passwords");
    console.log(username.value, password.value)
    console.log(passwords)
    if (passwords == null) {
        let json = []
        json.push({website: website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert("Password Saved");
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})