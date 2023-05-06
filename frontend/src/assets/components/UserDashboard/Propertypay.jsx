// import KhaltiCheckout from "khalti-checkout-web";

// import {
//     Button,
//     Flex,
// } from "@chakra-ui/react";
// export default function Propertypay() {
//     let config = {
//         // replace this key with yours
//         "publicKey": "test_public_key_5c3503ebbe024433bc508d2d29da288c",
//         "productIdentity": "1234567890",
//         "productName": "Drogon",
//         "productUrl": "http://gameofthrones.com/buy/Dragons",
//         "eventHandler": {
//             onSuccess(payload) {
//                 // hit merchant api for initiating verfication
//                 console.log(payload);
//             },
//             // onError handler is optional
//             onError(error) {
//                 // handle errors
//                 console.log(error);
//             },
//             onClose() {
//                 console.log('widget is closing');
//             }
//         },
//         "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING", "CONNECT_IPS", "SCT"],
//     };

//     let checkout = new KhaltiCheckout(config);
//     let btn = document.getElementById("payment-button");
//     btn.onclick = function () {
//         // minimum transaction amount must be 10, i.e 1000 in paisa.
//         checkout.show({ amount: 1000 });
//     }
//     return (
//         <Flex>

//             <Button bg={'red.100'} id="payment-button">Pay with Khalti</Button>
//         </Flex>
//     )
// }

// npm install khalti-checkout-web