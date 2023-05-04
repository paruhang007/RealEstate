import myKey from './KhlatiKeys.js';

import axios from 'axios';

let config = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "Property Upload",
    "productUrl": "http://localhost:3000/",
    "eventHandler": {
        onSuccess(payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            alert("Thank you for Pyment")

            //for server verification
            let data = {
                token: payload.token,
                amount: payload.amount,
            };

            let config = {
                headers: { 'Authorization': myKey.secretKey }
            };

            // axios
            //     .post(
            //         "https://khalti.com/api/v2/payment/verify/", data, config
            //     )
            //     .then((response) => {
            //         console.log(response.data);

            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });

            axios.get('http://localhost:5000/api/khalti/verify/${data.token}/${data.amount}/${myKey.secretKey}')
                .then(response => console.log(response.data))
                .catch(error => console.error(error));

        },
        // onError handler is optional
        onError(error) {
            // handle errors
            console.log(error);
        },
        onClose() {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config;