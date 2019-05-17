module.exports = 'alert.js: !alert, !alertquiet, !stopalert\n';

// Variables for the alerts
let alerting = false;
let alerts = [];
let ttsenabled = false;
let alstr = "null";
let txtchnl;

function alert() {
  if (alerting) {
    //decision 1 is how many times the alert will be in one message
    let decision1 = Math.ceil(Math.random() * 4);

    //console.log(decision);

    let printout = "";

    while (decision1 > 0) {
      let decision2 = Math.ceil(Math.random() * 4);
      printout += alstr;
      switch (decision2) {
        case 1:
          printout += ",";
          break;
        case 2:
          printout += ";";
          break;
        case 3:
          printout += "!";
          break;
        case 4:
          printout += "?";
          break;
      }

      decision1--;
    }

    txtchnl.send(printout, { 'tts': ttsenabled });
  }
}

// Create an event listener for messages
bot.on('message', message => {
  if (message.author.username !== botusername) {
    const cont = message.content.toLowerCase();
    txtchnl = message.channel;
    if (cont.includes("!alert")) {
      alstr = cont.slice(6, cont.length);
      alerting = true;
      ttsenabled = true;
      const timeout = setInterval(alert, 5000);
      alerts.push(timeout);
    }

    if (cont.includes("!alertquiet")) {
      alstr = cont.slice(11, cont.length);
      alerting = true;
      ttsenabled = false;
      const timeout = setInterval(alert, 5000);
      alerts.push(timeout);
    }

    if (cont.includes("!stopalert")) {
      alerting = false;
      console.log("alerts array length: " + alerts.length);
      while (alerts.length > 0) {
        clearInterval(alerts[alerts.length - 1]);
        alerts.pop();
      }
    }
  }
});
