const moment = require("moment");
const convert = require("xml-js");
const { property } = require("lodash");

const ElavonConfig = {
  "gateway" : "https://gatewaydemomoc.elavon.net:7500",
  "HST" : "13%",
  "MunicipalTax": "4%",
  "MunicipalTaxHST": "0.52%",
  "MunicipalTaxWithHST": "4.52%"
}

const elavon = {
  gateway: ElavonConfig.gateway,
  HST: ElavonConfig.HST,
  MunicipalTax: ElavonConfig.MunicipalTax,
  helper: {
    objtoxml: (obj) => {
      let settle = "false";
      if(obj.field0001==="07" || obj.field0001 ==="7" || obj.field0001==="02" || obj.field0001 ==="2"){
          settle="true"
      }
      let xml = `<?xml version="1.0" encoding="UTF‐8"?><!‐‐Copyright Elavon. 2009 ‐‐><ProtoBase_Transaction_Batch xmlns:xsi="http://www.w3.org/2001/XMLSchema‐instance" xsi:noNamespaceSchemaLocation="http://www.protobase.com/XML/PBAPI1.xsd"><Settlement_Batch>${settle}</Settlement_Batch><Transaction>`;
      for (const property in obj) {
        const fieldNumber = property.replace("field", "");
        xml = xml + `<API_Field><Field_Number>${fieldNumber}</Field_Number><Field_Value>${obj[property]}</Field_Value></API_Field>`;
      }
      xml = xml + '</Transaction></ProtoBase_Transaction_Batch>';
      return xml
    },
    objtotcp: (obj) => {
      let tcp="";
      for (const property in obj) {
        const fieldNumber = property.replace("field", "");
        tcp = tcp + `${fieldNumber},${obj[property]}\n`
      }
      return tcp
    },
    xmltoobj: (text) => {
       let result = JSON.parse(
          convert.xml2json(text, { compact: true, spaces: 4 })
        );
        let fieldResult = result.ProtoBase_Transaction_Batch.Transaction.API_Field;
    
        let obj = {};
        fieldResult.forEach((field) => {
          obj[`field${field.Field_Number._text}`] = field.Field_Value._text;
        });  
        return obj
    },
    xmltotcp: (text) => {
        const obj = this.xmltoobj(text);
        const tcp = this.objtotcp(obj)
        return tcp
    }
  }
};

module.exports = async (CcAuth) => {
  CcAuth.GenerateAuthTermGroupId = async (data = {}) => {
    console.log("-----GenerateAuthTermGroupId----");
    //1.) Get Group charge
    //2.) Send Data to elavon
    //3.) Save to database

    let models = CcAuth.app.models;
    let { ChargesGroups, Bookings, PterminalRequest } = models;
    let ref, refId, groupInfo, chargeInfo, bookingInfo;
    console.log("data", data);
    try {
      ref = await CcAuth.GenerateRef();
      if (data.groupId) {
        let groupInfoObj = await models.Groups.findOne({
          where: {
            groupId: data.groupId,
          },
        });
        groupInfo = await groupInfoObj.toJSON();
        let bookInfoObj = await models.Bookings.findOne({
          where: {
            groupId: data.groupId,
          },
          include: [
            {
              relation: "RoomsBookingsLink",
            },
            {
              relation: "Tenants",
              scope: {
                include: {
                  relation: "Users",
                },
              },
            },
          ],
        });
        bookingInfo = await bookInfoObj.toJSON();
        let chargeInfoObj = await models.ChargesGroups.findOne({
          where: {
            groupId: data.groupId,
          },
        });
        chargeInfo = await chargeInfoObj.toJSON();
      }
      refId = ref.id;
      console.log(1, groupInfo);
      console.log(2, chargeInfo);
      console.log(3, bookingInfo);

      if (!bookingInfo || !groupInfo || !chargeInfo) {
        return {
          Error: "Cannot find tenant info",
        };
      }
    } catch (e) {
      console.log(e);
    }
    let {
      totalPrice,
      hst,
      municipalTaxHst,
      municipalTax,
      price,
      otherChargesTotal,
      extraChargeReasonCode,
    } = chargeInfo;
    let { startDate, endDate, arrivalHour } = groupInfo;

    let totalTax = (
      Number(hst) +
      Number(municipalTax) +
      Number(municipalTaxHst)
    ).toFixed(2);

    const today = moment().format("MMDDYY");
    const time = moment().format("HHMMSS");
    let start = moment(startDate);
    let end = moment(endDate);
    let stayDuration = moment.duration(end.diff(start)).asDays();
    let roomNumber = bookingInfo.RoomsBookingsLink[0].roomId || "0";
    let guestName = bookingInfo.Tenants.Users.fullName || null;
    const cashierId = data.cashierId || "Kiosk1";



    if ('production' !== CcAuth.app.get('env')) {
      totalPrice = Math.round(Number(totalPrice)).toFixed(2)      
     }


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
      "0300": "1", // Charge description ‐‐>
      "0301": refId, //Folio number
      "0302": price, // Room rate
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
      payload["0312"] = extraChargeReasonCode;
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

    let terminalResponse;
    const message = {
      ip: "192.168.2.2",
      port: "6000",
      request: payload,
    };


    try {
      terminalResponse = await models.PterminalRequest.payload(message);
      const tcpReq = elavon.helper.objtotcp(terminalResponse.request);
      const tcpRes = elavon.helper.objtotcp(terminalResponse.respond);
          
      if (terminalResponse.respond.field1010 === "COMPLETE") {
        const authUpsert = await CcAuth.upsert(terminalResponse.respond);
        const paymentUpsert = await models.Payments.upsert({
          bookingId: data.bookingId,
          ccAuthId: authUpsert.ccAuthId,
        });
        return { request: tcpReq, respond: tcpRes };
      }else{
        const authUpsert = await CcAuth.upsert(terminalResponse.respond);
        console.log("tcpRes",tcpRes)
        return { request: tcpReq, respond: tcpRes };
      }
    } catch (e) {
      return e;
    }   
    //insert elavon comm
    //insert save
  };





  CcAuth.GenerateTestAuthTerminal = async (data = {}) => {
    console.log("-----CcAuth.GenerateTestAuthTerminal----");
    
    const models = CcAuth.app.models;
    let ref, refId, chargeInfo;
    try {
      ref = await CcAuth.GenerateRef();
      if (data.bookingId) {
        chargeInfo = await models.Charges.TotalCharges({
          bookingId: data.bookingId,
        });
        
      }
      refId = ref.id;
    } catch (e) {
      
    }

    const today = moment().format("MMDDYY");
    const time = moment().format("HHMMSS");
    const tomorrow = moment().add(1, "days").format("MMDDYY");
    const cashierId = data.cashierId || "Kiosk1";
    const roomNumber = data.roomNumber || 100;
    const roomRate = data.roomRate || "100.00";
    const durationStay = data.durationStay || "1";
    const taxAmount = data.tax || "13.00";
    const extraCharge = data.extraCharge;
    const extraChargeReason = data.extraChargeReason;
    const guestName = data.guestName || "Ronaldo Magrare";
    const amount = data.amount || "113.00";
    const arrival = today;
    const departure = tomorrow;
    const taxExempt = data.taxExempt || false;
    const noTax = data.noTax || false;

    if (data.bookingId) {
      //amount = chargeInfo.GroupTotal;
   
      amount = chargeInfo.GroupTotal;
      tax = Number(chargeInfo.GroupHST) + Number(chargeInfo.GroupMat);
      taxAmount = tax.toFixed(2);
      //guestName= chargeInfo.BookingName;
      roomNumber = chargeInfo.RoomId;
      durationStay = chargeInfo.stayduration;
      arrival = chargeInfo.arrival;
      departure = chargeInfo.departure;
      roomRate =
        (Number(chargeInfo.BookingTotal) -
        Number(chargeInfo.BookingHST) -
        Number(chargeInfo.BookingMat)) /
        chargeInfo.stayduration;
    }

    let payload = {
      "0001": "01", // Transaction Type (Auth Only 01)
      "0002": amount, // Transaction Amount
      "0007": refId, // Transaction ID
      "0011": "035",
      "0013": today,
      "0014": time,
      "0060": cashierId.replace(/\D/g, ""), //device id
      "0070": "Rook" + refId, //tax indicator
      "0071": "1", //tax indicator
      "0072": taxAmount, //tax amount
      "0109": "TERM1", // Terminal ID
      "0110": cashierId,
      "0300": "1", // Charge description ‐‐>
      "0301": refId, //Folio number
      "0302": roomRate.toFixed(2), // Room rate
      "0303": arrival, // Arrival date
      "0304": departure, // Departure date
      "0305": 1, //Program code
      "0307": durationStay, //Duration of stay
      "0308": refId, // Ticket number/ ROC #
      "0309": cashierId.replace(/\D/g, ""), // Employee number
      "0310": roomNumber, // Room Number
      "0313": guestName, // Guest Name
      "0647": 0,
      "0723": "F",
      "1008": "ID:", // Request token
      "8002": "BOLINK", // Location name
      "8006": "TSTLA3", // Chain code
    };

    if (taxExempt) {
      payload["0071"] = "2";
      payload["0072"] = "0.00";
    } else if (noTax) {
      payload["0071"] = "0";
      payload["0072"] = "0.00";
    }

    if (chargeInfo.extraCharge > 0) {
      payload["0311"] = chargeInfo.extraCharge;
      payload["0312"] = extraChargeReason;
    }

    let terminalResponse;
    const message = {
      ip: "192.168.2.2",
      port: "6000",
      request: payload,
    };

    try {
      terminalResponse = await models.PterminalRequest.payload(message);
      const tcpReq = elavon.helper.objtotcp(terminalResponse.request);
      const tcpRes = elavon.helper.objtotcp(terminalResponse.respond);
      
      

      if (terminalResponse.respond.field1010 === "COMPLETE") {
        const authUpsert = await CcAuth.upsert(terminalResponse.respond);
        const paymentUpsert = await models.Payments.upsert({
          bookingId: data.bookingId,
          ccAuthId: authUpsert.ccAuthId,
        });
        return { request: tcpReq, respond: tcpRes };
      }else{
        const authUpsert = await CcAuth.upsert(terminalResponse.respond);
        return { request: tcpReq, respond: tcpRes };
      }
      /*
       else if (
        terminalResponse.respond.field1010 === "*SLR COMMUNICATIONS ERROR"
      ) {
        json = {
          "1008": payload["1008"],
          "8002": payload["8002"],
          "8006": payload["8006"],
          "0001": payload["0001"],
          "0002": payload["0002"],
          "0007": payload["0007"],
          "0011": payload["0011"],
          "0013": payload["0013"],
          "0014": payload["0014"],
          "0060": payload["0060"],
          "0109": payload["0109"], // Terminal ID
          "0110": payload["0110"], // Cashier ID
          "0115": payload["0115"],
        };
        try {
          const transRes = await CcAuth.TransInquiry(json);
          return { failed: "Communication Error", inquiry: transRes };
        } catch (e) {
          throw e;
        }
      }
      */
      //      const authUpsert = await CcAuth.upsert(terminalResponse.respond);
      //    return { error: terminalResponse.respond, request: tcpReq, respond:tcpRes };
    } catch (e) {
      return e;
    }
  };

  CcAuth.GenerateTestAuth = async (data = {}) => {

    let {Payments,Bookings,Groups} = CcAuth.app.models;
    

    const myHeaders = new Headers();
    const moment = require("moment");
    const helper = elavon.helper;
    
    myHeaders.append("Content-Type", "application/xml");

    let ref, refId;
    try {
      ref = await CcAuth.GenerateRef();
      refId = ref.id;
    } catch (e) {
      
    }
    const today = moment().format("MMDDYY");
    const time = moment().format("HHMMSS");

    const tomorrow = moment().add(1, "days").format("MMDDYY");
    const cashierId = data.cashierId || "Kiosk1";
    const roomNumber = data.roomNumber || 100;
    const roomRate = data.roomRate || "100.00";
    const durationStay = data.durationStay || "1";
    const taxAmount = data.taxAmount || "13.00";
    const extraCharge = data.extraCharge || "1.00";
    const extraChargeReason = data.extraChargeReason || "1";
    const guestName = data.guestName || "";
    const amount = data.amount || "113.00";

    const posDataCode = "Do I need to change this?";
    const raw = `<?xml version="1.0" encoding="UTF‐8"?>
    <!‐‐Copyright Elavon. 2009 ‐‐><ProtoBase_Transaction_Batch
    xmlns:xsi="http://www.w3.org/2001/XMLSchema‐instance" xsi:noNamespaceSchemaLocation="http://www.protobase.com/XML/PBAPI1.xsd"><Settlement_Batch>false</Settlement_Batch><Transaction>
    <API_Field><Field_Number>1</Field_Number>
    <!‐‐ Gateway Transaction Type ‐‐><Field_Value>1</Field_Value></API_Field>
    <API_Field><Field_Number>2</Field_Number>
    <!‐‐ Transaction Amount ‐‐><Field_Value>${amount}</Field_Value></API_Field>
    <API_Field><Field_Number>3</Field_Number>
    <!‐‐ Account number ‐‐><Field_Value>4111111111111111</Field_Value></API_Field>
    <API_Field><Field_Number>4</Field_Number>
    <!‐‐ Expiration date ‐‐><Field_Value>1025</Field_Value></API_Field><API_Field>
    <Field_Number>7</Field_Number>
    <!‐‐ Reference number ‐‐><Field_Value>${refId}</Field_Value></API_Field>
    <API_Field><Field_Number>11</Field_Number>
    <!‐‐ User Defined Field ‐‐><Field_Value>035</Field_Value></API_Field>
    <API_Field><Field_Number>13</Field_Number>
    <!‐‐ Transaction Date ‐‐><Field_Value>${today}</Field_Value></API_Field>
    <API_Field><Field_Number>14</Field_Number>
    <!‐‐ Transaction Time ‐‐><Field_Value>${time}</Field_Value></API_Field>
    <API_Field><Field_Number>47</Field_Number>
    <!‐‐ POS Data Code ‐‐><Field_Value>M;1;1;1;1;0;6;0;0;3;3;C;0;4</Field_Value></API_Field>
    <API_Field><Field_Number>50</Field_Number>
    <!‐‐ CVV2/CVC2/CID Information ‐‐><Field_Value>XXX</Field_Value></API_Field>
    <API_Field><Field_Number>54</Field_Number>
    <!‐‐ POS Entry Mode ‐‐><Field_Value>01</Field_Value></API_Field>
    <API_Field><Field_Number>60</Field_Number>
    <!‐‐ Unique Device ID ‐‐><Field_Value>51563621</Field_Value></API_Field>
    <API_Field><Field_Number>70</Field_Number>
    <!‐‐ Customer Code ‐‐><Field_Value>87654321</Field_Value></API_Field>
    <API_Field><Field_Number>71</Field_Number>
    <!‐‐ Tax 1 Indicator ‐‐><Field_Value>1</Field_Value></API_Field>
    <API_Field><Field_Number>72</Field_Number>
    <!‐‐ Tax Amount 1 ‐‐><Field_Value>${taxAmount}</Field_Value></API_Field>
    <API_Field><Field_Number>109</Field_Number>
    <!‐‐ Terminal ID ‐‐><Field_Value>TERM1</Field_Value></API_Field>
    <API_Field><Field_Number>110</Field_Number>
    <!‐‐ Cashier ID ‐‐><Field_Value>${cashierId}</Field_Value></API_Field>
    <API_Field><Field_Number>115</Field_Number>
    <!‐‐ Transaction qualifier ‐‐><Field_Value>010</Field_Value></API_Field>
    <API_Field><Field_Number>300</Field_Number>
    <!‐‐ Charge description ‐‐><Field_Value>1</Field_Value></API_Field>
    <API_Field><Field_Number>301</Field_Number>
    // folder number = groupId
    <!‐‐ Folio number ‐‐><Field_Value>${refId}</Field_Value></API_Field>
    <API_Field><Field_Number>302</Field_Number>
    <!‐‐ Room rate ‐‐><Field_Value>${roomRate}</Field_Value></API_Field>
    <API_Field><Field_Number>303</Field_Number>
    <!‐‐ Arrival date ‐‐><Field_Value>${today}</Field_Value></API_Field>
    <API_Field><Field_Number>304</Field_Number>
    <!‐‐ Departure date ‐‐><Field_Value>${tomorrow}</Field_Value></API_Field>
    <API_Field><Field_Number>305</Field_Number>
    <!‐‐ Program code ‐‐><Field_Value>1</Field_Value></API_Field>
    <API_Field><Field_Number>307</Field_Number>
    <!‐‐ Duration of stay ‐‐><Field_Value>${durationStay}</Field_Value></API_Field>
    <API_Field><Field_Number>308</Field_Number>
    <!‐‐ Ticket number/ ROC # ‐‐><Field_Value>${refId}</Field_Value>
    </API_Field><API_Field><Field_Number>309</Field_Number>
    <!‐‐ Employee number ‐‐><Field_Value>${cashierId}</Field_Value></API_Field>
    <API_Field><Field_Number>310</Field_Number>
    <!‐‐ Room Number ‐‐><Field_Value>${roomNumber}</Field_Value></API_Field>
    <API_Field><Field_Number>311</Field_Number>
    //0.00 
    <!‐‐ Extra Charges Amount ‐‐><Field_Value>${extraCharge}</Field_Value></API_Field>
    <API_Field><Field_Number>312</Field_Number>
    //0.00
    <!‐‐ Extra Charges Reason Codes ‐‐><Field_Value>${extraChargeReason}</Field_Value></API_Field>
    <API_Field><Field_Number>313</Field_Number>
    <!‐‐ Guest Name ‐‐><Field_Value>${guestName}</Field_Value></API_Field>
    <API_Field><Field_Number>647</Field_Number>
    <!‐‐ Partial Authorization Acceptance ‐‐><Field_Value>1</Field_Value></API_Field>
    <API_Field><Field_Number>723</Field_Number>
    <!‐‐ Recurring Payments Status ‐‐><Field_Value>F</Field_Value></API_Field>
    <API_Field>
    <Field_Number>1008</Field_Number><Field_Value>ID:</Field_Value>
    </API_Field>
    <API_Field><Field_Number>8002</Field_Number>
    <!‐‐ Location Name or Source IP Address ‐‐><Field_Value>BOLINK</Field_Value></API_Field>
    <API_Field><Field_Number>8006</Field_Number>
    <!‐‐ Chain Code ‐‐><Field_Value>TSTLA3</Field_Value></API_Field></Transaction></ProtoBase_Transaction_Batch>`;

    console.log("raw",raw)

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    let resp, text;
    try {
      resp = await fetch(ElavonConfig.gateway, requestOptions);
      text = await resp.text();
    } catch (e) {
      return { error: e };
    }

    const result2 = JSON.parse(
      convert.xml2json(text, { compact: true, spaces: 4 })
    );
    let obj2 = result2.ProtoBase_Transaction_Batch.Transaction.API_Field;

    let obj = {};
    let response = obj2.map((a) => {
      obj[`field${a.Field_Number._text}`] = a.Field_Value._text;
    });

    //obj["field0003"] = "4111111111111111";

    if (obj.field1010 === "COMPLETE") {
      const authUpsert = await CcAuth.upsert(obj);
      
      try {
        let responseGroup= await Groups.findOne();
        console.log(21122,responseGroup,authUpsert)
        let paymentResponse = await Payments.upsert({groupId: responseGroup.groupId, ccAuthId: authUpsert.ccAuthId})
           
      }catch(e){
        console.log("ERROR", e)
      }

    }

    return { data: obj };
  };

  CcAuth.ExecuteReversalByBooking = async (data) => {
    console.log("-----CcAuth.ExecuteReversalByBooking----");
    
    //Requires bookingId, authId
    //Check Payment for AuthId of Booking
    //Retrive Booking
    //Add all amount type 76

    const models = CcAuth.app.models;
    
    let authOrigin, chargeInfo, results;
    let sumResult, resultPayment;
    try {
      resultPayment = await CcAuth.app.models.Payments.findOne({
        where: { BookingId: data.bookingId, isDeleted: false },
      });
      authOrigin = await CcAuth.findOne({
        where: { ccAuthId: resultPayment.ccAuthId },
      });
    } catch (e) {
      throw e;
    }

    
    sumResult = data.amount;

    try {
      if (data.bookingId) {
        chargeInfo = await models.Charges.TotalCharges({
          bookingId: data.bookingId,
        });
        
      }
    } catch (e) {
      
    }
    const today = moment().format("MMDDYY");
    const time = moment().format("HHMMSS");
    const refId = authOrigin.field0007;
    const cashierId = data.cashierId || authOrigin.field0309;
    const roomNumber = data.roomNumber || authOrigin.field0310;
    const roomRate = data.roomRate || "100.00";
    const durationStay = data.durationStay || authOrigin.field0307;
    const taxAmount = data.tax;
    const extraCharge = data.extraCharge;
    const extraChargeReason = data.extraChargeReason;
    const guestName = data.guestName || authOrigin.field0313;
    const amount = data.amount;

    //

    const data_code = authOrigin.field0047;
    const data_code_split = data_code.split(";");
    data_code_split[4] = 4; // cardholder present
    data_code_split[5] = 0; // card not present
    data_code_split[6] = 6; // Key Entry
    data_code_split[7] = 0; // Card Data Not authenticated
    data_code_split[8] = 0; // Card Holder Not authenticated
    data_code = data_code_split.join(";");

    if (chargeInfo) {
      const arrival = chargeInfo.arrival;
      const departure = chargeInfo.departure;
      roomNumber = chargeInfo.RoomId;
      durationStay = chargeInfo.stayduration;
      roomRate =
        (Number(chargeInfo.BookingTotal) -
        Number(chargeInfo.BookingHST) -
        Number(chargeInfo.BookingMat)) /
        chargeInfo.stayduration;
    }

    

    let payload = {
      "0001": "76",
      "0002": Number(authOrigin.field0130), // Transaction Amount
      "0003": authOrigin.field0003,
      "0004": authOrigin.field0004,
      "0007": refId, // Transaction ID
      "0011": "035",
      "0013": today,
      "0014": time,
      "0025": today,
      "0047": data_code,
      "0054": "01",
      "0060": cashierId.replace(/\D/g, ""),
      "0070": "Rook" + refId, //tax indicator
      "0071": authOrigin.field0071, //tax indicator
      "0072": "0", //tax amount
      "0109": "TERM1", // Terminal ID
      "0110": "Kiosk1",
      "0115": authOrigin.field0115,
      "0300": "1", // Charge description ‐‐>
      "0301": refId, //Folio number
      "0302": roomRate.toFixed(2), // Room rate
      "0303": arrival, // Arrival date
      "0304": departure, // Departure date
      "0305": 1, //Program code
      "0307": durationStay, //Duration of stay
      "0308": refId, // Ticket number/ ROC #
      "0309": cashierId, // Employee number
      "0310": roomNumber, // Room Number
      "0313": guestName, // Guest Name
      "0647": 0,
      "0723": authOrigin.field0723,
      "0738": authOrigin.field0738,
      "1008": "ID:", // Request token
      "8002": "BOLINK", // Location name
      "8006": "TSTLA3", // Chain code
    };

    if (chargeInfo.extraCharge > 0) {
      payload["0311"] = chargeInfo.extraCharge;
      payload["0312"] = extraChargeReason;
    }

    const xml = elavon.helper.objtoxml(payload);
    const tcp = elavon.helper.objtotcp(payload);
    

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: xml,
      redirect: "follow",
    };
    
    let resp, text;
    try {
      resp = await fetch(ElavonConfig.gateway, requestOptions);
      text = await resp.text();
      const objres = elavon.helper.xmltoobj(text);
      const tcpres = elavon.helper.xmltotcp(text);
      
      if (objres.field1010 === "COMPLETE") {
        const incSave = await models.CcAuth.create(objres);
        const authUpdate = await models.CcAuth.upsert({
          ccAuthId: authOrigin.ccAuthId,
          field0130: data.amount,
          field0072: data.tax,
        });

        return { success: objres, request: tcp, respond: tcpres };
      } else {
        return { error: objres };
      }
    } catch (e) {
      return { error: e };
    }
  };

  CcAuth.GenerateRef = async () => {
    console.log("-----CcAuth.GenerateRef----");

    try {
      let result = await CcAuth.app.models.CcRef.create();
      
      if (result.refId === 0) {
        return { id: 1 };
      }
      return { id: (result.refId + 1) % 100000000 };
    } catch (e) {
      return { error: e };
    }
  };

  CcAuth.GenerateSaleByAuth = async (data) => {
    console.log("-----CcAuth.GenerateSaleByAuth----");
    //1. Find the Auth
    //2. Find the payment row to get bookingid
    //3. Find the Reversals
    //4. Settle the auth
    //5. Save

    const models = CcAuth.app.models;
    let responseAuth, resultPay, chargeInfo;
    
    try {
      responseAuth = await CcAuth.findOne({
        where: { ccAuthId: data.ccAuthId, isDeleted: false },
      });
      
      //
      resultPay = await models.Payments.findOne({
        where: { ccAuthId: data.ccAuthId, isDeleted: false },
      });

      
      let resultReversal = await CcAuth.ExecuteReversalByBooking({
        bookingId: resultPay.bookingId,
      });

      chargeInfo = await models.Charges.TotalCharges({
        bookingId: resultPay.bookingId,
      });

      
      
    } catch (e) {
      return { response: e };
    }

    let amount = Number(responseAuth.field0130);

    const today = moment().format("MMDDYY");
    const time = moment().format("HHMMSS");

    
    
    
    const data_code = responseAuth.field0047;
    data_code_split = data_code.split(";");
    data_code_split[4] = 1; // cardholder present
    data_code_split[5] = 0; // card not present
    data_code_split[6] = 6; // Key Entry
    data_code_split[7] = 0; // Card Data Not authenticated
    data_code_split[8] = 0; // Card Holder Not authenticated
    data_code = data_code_split.join(";");
    const msgType = "07";

    if (chargeInfo) {
      amount = chargeInfo.GroupTotal;
      tax = Number(chargeInfo.GroupHST) + Number(chargeInfo.GroupMat);
      taxAmount = tax.toFixed(2);
      //guestName= chargeInfo.BookingName;
      roomNumber = chargeInfo.RoomId;
      durationStay = chargeInfo.stayduration;
      arrival = chargeInfo.arrival;
      departure = chargeInfo.departure;
      roomRate =
        (Number(chargeInfo.BookingTotal) -
        Number(chargeInfo.BookingHST) -
        Number(chargeInfo.BookingMat)) /
        chargeInfo.stayduration;
    }

    const json = {
      "0001": msgType, // Transaction Type
      "0002": amount, // Transaction Amount
      "0003": responseAuth.field0003, // Account number
      "0004": responseAuth.field0004, // Expiration date MMYY
      "0006": responseAuth.field0006,
      "0007": responseAuth.field0007, // Reference number
      "0011": "035", // User-Defined Field
      "0013": today, // Transaction Date MMDDYY
      "0014": time, // Transaction Time HHMMSS
      "0025": today, // Business Date
      "0047": data_code, // POS Data Code
      "0054": "01",
      "0060": "10",
      "0070": responseAuth.field0070, //tax indicator
      "0071": responseAuth.field0071, //tax indicator
      "0072": taxAmount, //tax amount
      "0109": responseAuth.field0109, // Terminal ID
      "0110": responseAuth.field0110,
      "0300": "1", // Charge description ‐‐>
      "0301": responseAuth.field0301, //Folio number
      "0302": roomRate.toFixed(2), // Room rate
      "0303": arrival, // Arrival date
      "0304": departure, // Departure date
      "0305": 1, //Program code
      "0307": durationStay, //Duration of stay
      "0308": responseAuth.field0308, // Ticket number/ ROC #
      "0309": responseAuth.field0309, // Employee number
      "0310": roomNumber, // Room Number
      "0313": responseAuth.field0313, // Guest Name
      "1008": "ID:",
      "8002": responseAuth.field8002, // Location Name or Source IP Address
      "8006": responseAuth.field8006, // Chain Code
      "0723": responseAuth.field0723,
      "0738": responseAuth.field0738,
    };

    if (responseAuth.field0311) {
      json["0311"] = responseAuth.field0311;
      json["0312"] = responseAuth.field0312;
    }

    const xml = elavon.helper.objtoxml(json);
    const tcp = elavon.helper.objtotcp(json);
    

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: xml,
      redirect: "follow",
    };
    let resp, text;
    try {
      resp = await fetch(ElavonConfig.gateway, requestOptions);
      text = await resp.text();
      const objres = elavon.helper.xmltoobj(text);
      const tcpres = elavon.helper.xmltotcp(text);
      
    } catch (e) {
      return { error: e };
    }

    try {
      response3 = await CcAuth.app.models.CcSale.create(objres);
      if (response3.field1010 === "COMPLETE") {
        return { success: response3, request: tcp, respond: tcpres };
      } else {
        return { error: `1010 : ${response3.field1010}` };
      }
    } catch (e) {
      
      return { error: e };
    }
  };

  CcAuth.GenerateSaleByBooking = async (data) => {
    
    let result, resultPayment, resp, text, response3, chargeInfo;

    try {
      resultPayment = await CcAuth.app.models.Payments.findOne({
        where: { BookingId: data.bookingId, isDeleted: false },
      });
      result = await CcAuth.findOne({
        where: { ccAuthId: resultPayment.ccAuthId, isDeleted: false },
      });
      let resultReversal = await CcAuth.ExecuteReversalByBooking({
        bookingId: result.bookingId,
      });
    } catch (e) {
      return { response: e };
    }

    let amount = Number(result.field0130);
    let url = ElavonConfig.gateway;
    let body = ` <?xml version="1.0" encoding="UTF‐8"?>
            <!‐‐Copyright Elavon. 2009 ‐‐>
            <ProtoBase_Transaction_Batch xmlns:xsi="http://www.w3.org/2001/XMLSchema‐instance" xsi:noNamespaceSchemaLocation="http://www.protobase.com/XML/PBAPI1.xsd"> <Settlement_Batch>false</Settlement_Batch>
            <Transaction>
            <API_Field>
            <Field_Number>1</Field_Number><!‐‐ Transaction type ‐‐> <Field_Value>07</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>2</Field_Number><!‐‐ Transaction amount ‐‐> <Field_Value>${amount}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>3</Field_Number><!– Card Number, Token or Unique ID –> <Field_Value>${result.field0003}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>4</Field_Number><!– Credit Card Expiration Date –> <Field_Value>${result.field0004}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>6</Field_Number><!– Approval Code –> <Field_Value>${result.field0006}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>7</Field_Number><!– Reference Number –> <Field_Value>${result.field0007}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>11</Field_Number><!– User Data –> <Field_Value>${result.field0011}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>13</Field_Number><!– Transaction Date – MMDDYY –> <Field_Value>${result.field0013}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>14</Field_Number><!– Transaction Time – HHMMSS –> <Field_Value>${result.field0014}</Field_Value>
            </API_Field>                                    
            <API_Field>
            <Field_Number>109</Field_Number><!– Terminal ID –> <Field_Value>${result.field0109}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>110</Field_Number><!– Cashier ID –> <Field_Value>${result.field0110}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>115</Field_Number><!– Transaction Qualifier –> <Field_Value>${result.field0115}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>647</Field_Number><!– Partial Authorization Acceptance –> <Field_Value>${result.field647}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>1008</Field_Number><Field_Value>ID:</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>1105</Field_Number><!– Global User Defined Field –> <Field_Value>${result.field1105}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>5002</Field_Number><!– Device Serial Number–> <Field_Value>${result.field5002}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>8002</Field_Number><!‐‐ Location name ‐‐> <Field_Value>${result.field8002}</Field_Value>
            </API_Field>
            <API_Field>
            <Field_Number>8006</Field_Number><!‐‐ Chain code ‐‐> <Field_Value>${result.field8006}</Field_Value>
            </API_Field>
            </Transaction>
            </ProtoBase_Transaction_Batch>`;
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: body,
      redirect: "follow",
    };

    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/xml");
    try {
      resp = await fetch(url, requestOptions);
      text = await resp.text();
    } catch (e) {
      return { error: e };
    }

    const result2 = JSON.parse(
      convert.xml2json(text, { compact: true, spaces: 4 })
    );
    let obj2 = result2.ProtoBase_Transaction_Batch.Transaction.API_Field;

    let obj = {};
    let response = obj2.map((a) => {
      obj[`field${a.Field_Number._text}`] = a.Field_Value._text;
    });
    try {
      response3 = await CcAuth.app.models.CcSale.create(obj);
    } catch (e) {
      
      return { error: e };
    }

    if (obj.field1010 !== "COMPLETE") {
      return { error: `1010 : ${obj.field1010}` };
    }
    return { success: obj };
  };

  CcAuth.FullAuthReversal = async (data) => {
    console.log("-----CcAuth.FullAuthReversal----");
    
    const models = CcAuth.app.models;
    const today = moment().format("MMDDYY");
    const time = moment().format("HHMMSS");

    let responseP, responseAuth;
    try {
      responseAuth = await CcAuth.findOne({
        where: { ccAuthId: data.ccAuthId },
      });
    } catch (e) {}
    
    
    
    const data_code = responseAuth.field0047;
    data_code_split = data_code.split(";");
    data_code_split[4] = 1; // cardholder present
    data_code_split[5] = 4; // card not present
    data_code_split[6] = 6; // Key Entry
    data_code_split[7] = 0; // Card Data Not authenticated
    data_code_split[8] = 0; // Card Holder Not authenticated
    data_code = data_code_split.join(";");
    const msgType = "61";

    const json = {
      "0001": msgType, // Transaction Type
      "0002": Number(responseAuth.field0002).toFixed(2), // Transaction Amount
      "0003": responseAuth.field0003, // Account number
      "0004": responseAuth.field0004, // Expiration date MMYY
      "0007": responseAuth.field0007, // Reference number
      "0011": "035", // User-Defined Field
      "0013": today, // Transaction Date MMDDYY
      "0014": time, // Transaction Time HHMMSS
      "0025": today, // Business Date
      "0047": data_code, // POS Data Code
      "0054": "01", // POS Entry Mode
      "0060": responseAuth.field0060, // Unique Device ID
      "0070": responseAuth.field0070, //tax indicator
      "0071": responseAuth.field0071, //tax indicator
      "0072": responseAuth.field0072, //tax amount
      "0109": responseAuth.field0109, // Terminal ID
      "0110": responseAuth.field0110, // Cashier ID
      "0115": responseAuth.field0115, // Transaction qualifier
      "0300": responseAuth.field0300, // Charge description ‐‐>
      "0301": responseAuth.field0301, //Folio number
      "0302": Number(responseAuth.field0302), // Room rate
      "0303": responseAuth.field0300, // Arrival date
      "0304": responseAuth.field0304, // Departure date
      "0305": 1, //Program code
      "0307": responseAuth.field0307, //Duration of stay
      "0308": responseAuth.field0308, // Ticket number/ ROC #
      "0309": responseAuth.field0309, // Employee number
      "0310": responseAuth.field0310, // Room Number
      "0313": responseAuth.field0313, // Guest Name
      "0723": responseAuth.field0723,
      "0738": responseAuth.field0738,
      "1008": "ID:",
      "8002": responseAuth.field8002, // Location Name or Source IP Address
      "8006": responseAuth.field8006, // Chain Code
    };

    const xml = elavon.helper.objtoxml(json);
    const tcp = elavon.helper.objtotcp(json);
    

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: xml,
      redirect: "follow",
    };
    let resp, text;
    try {
      resp = await fetch(ElavonConfig.gateway, requestOptions);
      text = await resp.text();
      const objres = elavon.helper.xmltoobj(text);
      const tcpres = elavon.helper.xmltotcp(text);
      
      const refundSave = await models.CcRefund.upsert(objres);
      if (objres.field1010 === "COMPLETE") {
        return { success: objres, request: tcp, response: tcpres };
      } else {
        return { error: objres };
      }
    } catch (e) {
      return { error: e };
    }
  };

  CcAuth.TransInquiry = async function (data) {
    console.log("-----CcAuth.Inquirty----");

    const models = CcAuth.app.models;

    const today = moment().format("MMDDYY");
    const time = moment().format("HHMMSS");

    let responseP, responseAuth;
    try {
      responseAuth = await CcAuth.findOne({
        where: { ccAuthId: data.ccAuthId },
      });
    } catch (e) {}
    
    const msgType = "22";

    const json = data;

    const xml = elavon.helper.objtoxml(json);
    const tcp = elavon.helper.objtotcp(json);
    

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/xml");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: xml,
      redirect: "follow",
    };
    let resp, text;
    try {
      resp = await fetch(ElavonConfig.gateway, requestOptions);
      text = await resp.text();
      const objres = elavon.helper.xmltoobj(text);
      const tcpres = elavon.helper.xmltotcp(text);
      if (objres.field1010 === "COMPLETE") {
        return { success: objres, request: tcp, response: tcpres };
      } else {
        return { error: objres, request: tcp, response: tcpres };
      }
    } catch (e) {
      return { error: e };
    }
  };
};
