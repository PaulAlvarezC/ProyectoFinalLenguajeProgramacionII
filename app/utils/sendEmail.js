/* eslint-disable no-undef */
export function sendEmail(to, name) {
    Email.send({
        SecureToken: '762901e1-f151-4ce7-b017-8785bbc28096',
        To: to,
        From: "info@khuska-web.com",
        Subject: "¡Bienvenido a Khuska!",
        Body: "Un gran abrazo para darte la bienvenida " + name + ", ¡Ahora eres parte de nuestra familia Khuska!"
    }).then(
        message => console.log(message)
    );
}

export function sendComprobanteEmail(to, name, id, attachment) {
    Email.send({
        SecureToken: '762901e1-f151-4ce7-b017-8785bbc28096',
        To: "info@khuska-web.com",
        From: to,
        Subject: "Comprobante de Depósito",
        Body: "Estimados Khuska, un saludo departe de " + name + ", adjunto el comprobante de depósito de la suscripción en plataforma Khuska. <br><br><br> Saludos cordiales.",
        Attachments: [
            {
                name: id,
                path: attachment
            }]
    }).then(
        message => console.log(message)
    );
}