const btn1 = document.getElementById('btn1');
const p1 = document.getElementById('p1');
const p2 = document.getElementById('p2');
const loader = document.getElementById('loader');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById("btn3");

btn2.style.display = "none";
btn3.style.display = "none";

btn1.addEventListener('click', () =>  {

    btn1.disabled = true;
    btn1.classList.add("mt-50");
    p1.style.marginBottom = '20px';
    loader.style.display = "block";
    btn1.innerText = "Verifying";
    p2.innerText = "Please wait. Verfication can take upto 30 seconds."

    
    fetch('/bhenchod', {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) { // if status code is 200
            p1.textContent = "Verified";
            loader.style.display = "none";
            p2.textContent = "Verification was successful."
            btn1.textContent = "Verified";
            window.location.href = '../final/'; // redirect

        } else if (response.status == 402) {
            alert('Email is Invalid');
            p1.textContent = "The email is Incorrect";
            p2.textContent = "The email is invalid, please try again.";
            loader.style.display = "none";
            btn1.style.display = "none";
            btn2.style.display = "block";

        } else if (response.status == 401) {
            alert('Password is Invalid');
            p1.textContent = "Password is Incorrect";
            p2.textContent = "The password is invalid, please try again.";
            loader.style.display = "none";
            btn1.style.display = "none";
            btn3.style.display= "block";

        } else {
            alert('something went wrong :(');
            p1.textContent = "Server side error occured";
            p2.textContent = "Server side issue has occured, please try again after a few minutes."
            loader.style.display = "none";
            btn1.disbaled = false;
            btn1.textContent = "Error";
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });

});

function redirectIndex1() {
    window.location.href = "index.html";
}

function redirectIndex2() {
    window.location.href = "index2.html";
}
