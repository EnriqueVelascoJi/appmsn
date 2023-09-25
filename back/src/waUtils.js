const pool = require('./DB/postgres');
const { Client } = require('whatsapp-web.js');

const client = new Client()

const NUEVA_INCIDENCIA = `
*No.* {name}
*Región:* {region}
*Equipo*: {equipo}
*Tipo de incidencia*: {type}
*Fecha*: {date}
*Descripción*: {description}
{repairs}
{total}
`;

// const setIncidenciaMessage = (incidencia) => {
//     let message = NUEVA_INCIDENCIA;
//     message = message.replace('{name}', incidencia.incidenciaID);
//     message = message.replace(
//       '{region}',
//       (incidencia.regionId as IRegiones).name,
//     );
//     message = message.replace(
//       '{equipo}',
//       `${(incidencia.equipoId as IEquipos).name}`,
//     );
//     message = message.replace(
//       '{type}',
//       `${
//         (incidencia.incidenciaTypesIds as IIncidenciaCatalogoInterface[])
//           .map(
//             ({ verificationPoint, type, name }) =>
//               `${verificationPoint} - ${type} - ${name}`,
//           )
//           .join(',') || 'N/A'
//       }`,
//     );
//     message = message.replace(
//       '{date}',
//       `${format(new Date(incidencia.createdAt || ''), 'dd/MM/yyy - HH:mm')}`,
//     );
//     message = message.replace('{description}', incidencia.description);
//     message = message.replace(
//       '{repairs}',
//       incidencia.refacciones?.length
//         ? `*Refacciones*: ${incidencia.refacciones
//             .map(({ name, price }) => `${name} - x${price}`)
//             .join(', ')}`
//         : '',
//     );
//     message = message.replace(
//       '{total}',
//       incidencia.refacciones?.length
//         ? `*Total*: $${incidencia.refacciones
//             .map(({ price, quantity }) => price * quantity)
//             .reduce((a, b) => a + b)}`
//         : '',
//     );
//     return message;
//   };

  
const findWAUsers = async () => {
    const query = 'SELECT * FROM usuario where isdeleted=FALSE and aprobador=TRUE and verificadorwa=TRUE';
    
    // Get all
    const response = await pool.query(query);

    const users = response.rows

    return users
    
    
};



module.exports = {
    findWAUsers
}
