export function templateEmailSender(name: string, token: string) {
	return `<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verificar token</title>
        </head>
        <body>
            <p>
                Bienvenido ${name} a Valki Games, por favor verifica tu cuenta aquí:
                <a href="http://localhost:5173/verify?token=${token}"
                    >click aquí</a
                >
            </p>
        </body>
    </html>
    `;
}
