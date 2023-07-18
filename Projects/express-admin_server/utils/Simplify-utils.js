const moment = require("moment");
const net = require('net');

const constants = {
  "HST": 0.13,
  "MunicipalTax": 0.04,
  "MunicipalTaxHST": 0.0052,
  "MunicipalTaxWithHST": 0.0452
}

const options = {
  port: 6000,
  host: '192.168.2.17',
  reuseAddress: true,
};

const objToTcp = (obj) => {
  let tcp="";
  for (const property in obj) {
    const fieldNumber = property.replace("field", "");
    tcp = tcp + `${fieldNumber},${obj[property]}\r\n`
  }
  tcp = tcp + "\x04"
  return tcp
}

const tcpToObj = (tcp) => {
  let obj={};
  const fields = tcp.split("\r\n");
  for (const field in fields) {
    const key = fields[field].split(",")[0];
    const value = fields[field].split(",")[1];
    obj[key] = value;
  }
  return obj
}


const client = new net.Socket(options);

client.connect(options, () => {
  console.log('Connected');
  client.write(objToTcp(payload));
  console.log('Sent: ' + objToTcp(payload));
});

client.on('data', (data) => {
  const response = tcpToObj(data.toString());
  console.log('Received: ' + JSON.stringify(response));
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.log('Connection error', err);
});


const refId = Date.now() % 100000000;

let totalTax = (
  Number(hst) +
  Number(municipalTax) +
  Number(municipalTaxHst)
).toFixed(2);

const today = moment().format("MMDDYY");
const time = moment().format("HHMMSS");
let start = moment(startDate).format("MMDDYY");
let end = moment(endDate).format("HHMMSS");;
let stayDuration = moment.duration(end.diff(start)).asDays();
let roomNumber = bookingInfo.RoomsBookingsLink[0].roomId || "0";
let guestName = bookingInfo.Tenants.Users.fullName || null;
const cashierId = process.env.cashierId || "Kiosk1";

let payload = {
  "0001": "01", // Transaction Type (Auth Only 01)
  "0002": totalPrice, // Transaction Amount
  "0007": refId, // Transaction ID
  "0011": "035", //defined as User Data
  "0013": today, //Transaction Date	MMDDYY 
  "0014": time, //Transaction Time	HHMMSS
  "0060": cashierId.replace(/\D/g, ""), //device id  
  "0070": "Rook" + refId, //tax indicator
  "0071": "1", //tax indicator
  "0072": totalTax, //tax amount
  "0109": "TERM1", // Terminal ID
  "0110": cashierId, //Cashier ID
  "0300": 1, // Charge description ‐‐>
  "0301": refId, //Folio number
  "0302": pricePerNight, // Room rate
  "0303": moment(startDate).format("MMDDYY"), // Arrival date
  "0304": moment(endDate).format("MMDDYY"), // Departure date
  "0305": 1, //Program code 1=Default 2=Assured Reservation NO SHOW 3=Advanced Deposit 4=Delayed Charge – no longer used; default to 1 5=Express Service 6=Assured Reservation
  "0307": stayDuration, //Duration of stay
  "0308": refId, // Ticket number/ ROC #
  "0309": cashierId.replace(/\D/g, ""), // Employee number
  "0647": 0, //Partial auth indicator 0=POS can not support partial authorization responses. 1=POS can support partial authorization responses.
  "0723": "F",
  "1008": "ID:", // Request token
  "8002": "BOLINK", // Location name
  "8006": "TSTLA3", // Chain code
};
if (guestName) {
  payload["0313"] = guestName;
}
if (roomNumber) {
  payload["0310"] = roomNumber;
}

if (otherChargesTotal > 0) {
  payload["0311"] = otherChargesTotal;
  payload["0312"] = 6;
}

if (data.taxExempt) {
  payload["0071"] = "2";
  payload["0072"] = "0.00";
} else if (data.noTax) {
  payload["0071"] = "0";
  payload["0072"] = "0.00";
}

console.log("payload");
console.log(payload);

