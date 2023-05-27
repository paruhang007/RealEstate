<h1 align="center">Paruhang Rai</h1>

<h3 align="center">Uni Id: 2058975</h1>

<h3 align="center">Supervisor Name: Supriya Panta</h1>

<h3 align="center">Reader Name: Deepson Shrestha</h1>

<br> 
<br>

_This is a [link for the git repo](https://github.com/paruhang007/RealEstate)_

## About GharJagga

![image](frontend/public/images/1.png)

---

The GharJagga project is an innovative and user-friendly real estate web application portal designed specifically for people who are searching to find amazing properties.

GharJagga GharJagga offers users with the ability to search properties along with services and can also lets user post them. It also offers a messaging panel so the users can interact with the owner and work out the best deal.

## Installation

---

After downloading the file unzip it and open in an IDE (eg Visual Studio). Follow the steps:

1. Navigate to the **backend**, **frontend** and **socket** folders and run "npm install" command to install the necessary node modules respectively.
2. Create a .env file inside the **backend** and fill in with the necessary keys. The names of the keys are:

- MONGO : mongo URI for database (your secret key)
- JWT_SECRET : JWT secret value. Base64 value is recommended. (your secret key)
- APP_KEY : App password for the Email (your secret key)
- APP_EMAIL : Email used to send for passwprd recovery (your secret key)

3. Navigate to **frontend/src/assets/khalti** and create a new file named **khaltiKeys.js** file and fill in with the necessary keys. The file format is:

```
let myKey = {
publicTestKey: "your public key",

secretKey: "your secret key",
};

export default myKey;
```

4. After successfully completing the steps, please run the following command

- navigate to **frontend** file nad run "npm run dev"
- navigate to **backend** file nad run "npm start"
- navigate to **socket** file nad run "npm start"

5. After that your are free to sign up and explore the project.
