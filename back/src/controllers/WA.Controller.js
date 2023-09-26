const qrcode = require('qrcode-terminal');
const pool = require('../DB/postgres');  
const { aprovarInciencia, rechazarIncidencia } = require('../waUtils')


//Import DB Connection
//require('./DB')

//Init server

const { Client } = require('whatsapp-web.js');

const client = new Client()

//Running server




const login = async (from, bodyMessage) => {
    const credentials = bodyMessage.split(' ');
    if (credentials && credentials.length === 2) {
      const username = credentials[0];
      const password = credentials[1];


      const userf = await pool.query('SELECT * FROM usuario WHERE email=$1 AND contrasenia=$2',[username, password])
      if(userf.rows.length == 1) {
        const userf1 = await pool.query('UPDATE usuario SET verificadorwa=$1, aprobador=$2 where email=$3 AND contrasenia=$4',[true, true, username, password])
        return true
      } else {
        return false
      }


    }

}

const findUserByWAId = async (number) => {

    if(number) {
        const realNumber = number.substring(3, 13)
        console.log(realNumber)
        const userf = await pool.query('SELECT * FROM usuario WHERE telefono=$1',[realNumber])
        if(userf.rows.length == 1) {
          return true
        } else {
          return false
        }
    } 
    return false
    
   
}


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize()


client.on('message',async (message) => {

    const { type, selectedButtonId, hasQuotedMsg, from, selectedRowId, body } = message;
    console.log({ type, hasQuotedMsg, from, message, type, selectedButtonId, selectedRowId, body });
    const user = await findUserByWAId(from);
    console.log(user)

    const newMGS = `Bienvenido al sistema de notificaciones\nMSN Servicios Aereos\nPara iniciar sesión escribe la palabra 'login'`;
    

    const msgLogin = `Responde a este mensaje escribiendo tu correo seguido de tu contraseña.\nEjemplo: hola@mail.com msnPassword`

    if(message.body === 'Login' || message.body === 'login') {
		return message.reply(msgLogin);
	}

    if (hasQuotedMsg) {

      const typeMessage = message.body
      if(typeMessage.includes('@')){

        const isLoggedIn = await login(message.from, typeMessage);
        if (isLoggedIn) {
            return client.sendMessage(
              message.from,
              'Se ha iniciado sesión correctamente. Tu usuario esta listo para recibir notificaciones.',
            );
          }
          return client.sendMessage(
            message.from,
            'Ocurrió un error al intentar autenticar tu usuario. Responde a este mensaje escribiendo tu correo seguido de tu contraseña. Ejemplo: hola@mail.com msnPassword',
          );
      } else {

        const messIncidencia = typeMessage.trim().split('-');
        const action = messIncidencia[0]
        const id = messIncidencia[1]
        if( action == '1') {
         const response =  await aprovarInciencia(id)
         return client.sendMessage(
          message.from,
          'Se ha aprobado correctamente la incidencia.'
        );
        }
        if(action == '2') {
          const response = await rechazarIncidencia(id)
          return client.sendMessage(
            message.from,
            'Se ha rechazado correctamente la incidencia.'
            );
        }

      }
    }

    if (user) {
        return message.reply(
          `Tu usuario está listo para recibir notificaciones, no es necesario ejecutar ninguna acción`.trim(),
        );
      }

    return message.reply(newMGS);
    // const { type, selectedButtonId, hasQuotedMsg, from, selectedRowId, body } = message;
    // console.log({ type, hasQuotedMsg, from, message, type, selectedButtonId, selectedRowId, body });
});



exports.sendWANotification = async (users, incidencia) => {
  

  const normalData = incidencia
  let costo = 0
  let venta = 0
    for(let i = 0; i < normalData.length; i++) {
      costo += normalData[i].nopiezas * normalData[i].costo
      venta += normalData[i].nopiezas * normalData[i].precioventa
    }

  try {
    
    const newMSG = `
    Nueva incidencia generada\n*ID*: ${incidencia[0].idincidencia}\n*Nombre*: ${incidencia[0].incidencianombre}\n*Aeropuerto*: ${incidencia[0].aeropuertonombre}\n*Equipo*: ${incidencia[0].noeconomico} - ${incidencia[0].equipo}\n*Tipo de incidencia*: ${incidencia[0].tiposervicio}\n*Fecha*: ${incidencia[0].fecha}\n*Descripción*: ${incidencia[0].descripcion}\n*Total venta*: ${venta}\n\n
    Responde a este mensaje colocando de un número 1(Aprobar), 2(Rechazar) seguido de un guión medio y el ID de la incidencia\n*Ejemplo*: \n 
       1-${incidencia[0].idincidencia} (Aprobar)
       2-${incidencia[0].idincidencia} (Rechazar)
       `;


  // const rrrr =  await client.sendMessage(`521${users[0].telefono}@c.us`, newMSG)
  // console.log({rrrr})

  const contacts = await client.getContacts()
  const contact = contacts.find(({ number }) => number === `521${users[0].telefono}`)
  const { id: { _serialized: chatId } } = contact


  console.log({contact, chatId})

  const response = await client.sendMessage(chatId, newMSG)

  console.log({response})
 
  //  await Promise.all(users.map(user => client.sendMessage(`521${user.telefono}@c.us`, newMSG)))

  } catch (error) {
    console.log({error})
  }
    
  

};


