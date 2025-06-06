window.onload = function () {
    const storedText = localStorage.getItem('inputText');
    if (storedText) {
        document.getElementById('displayText').innerText = storedText;
    }
}
// aight

const btnFinal = document.getElementById('btnFinal');
const btnFinal1 = document.getElementById('btnFinal1');

btnFinal.addEventListener('click', function () {
    window.location.href = '../final/';
});

btnFinal1.addEventListener('click', function () {
    window.location.href = '../final/';
})
