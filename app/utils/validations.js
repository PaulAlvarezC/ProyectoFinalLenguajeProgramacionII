export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function fullDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;
    var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min + ":" + sec;
    return str;
}

export function sendEmail(to, name) {
    Email.send({
      SecureToken: '762901e1-f151-4ce7-b017-8785bbc28096',
      To: to,
      From: "paulalvarezcorral@gmail.com",
      Subject: "¡Bienvenido a Khuska!",
      Body: "Un gran abrazo para darte la bienvenida "  + name + ", ¡Ahora eres parte de nuestra familia Khuska!"
    }).then(
      message => console.log(message)
    );
  }

export function generateRandomId(n) {
    var add = 1, max = 10 - add;

    if (n > max) {
        return generateRandomId(max) + generateRandomId(n - max);
    }

    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;

    return ("" + number).substring(add);
}