// PASO 1:
const { Client } = require('pg')
const { exit } = require('process')
const client = new Client({
    connectionString: 'postgresql://postgres:postgres@localhost:5432/music'
})
client.connect()

// Capturando argumentos desde el terminal
const argumentos = process.argv.slice(2)
let accion = argumentos[0]

//PASO 2:
if (accion == 'nuevo') {
    console.log('entra a nuevo')
    console.log(argumentos.length)

    if (argumentos.length == '5') {
        let nombre = argumentos[1]
        let rut = argumentos[2]
        let curso = argumentos[3]
        let nivel = argumentos[4]

        async function nuevo() {
            const res = await client.query(`INSERT INTO estudiantes (nombre, rut, curso, nivel) values ('${nombre}', '${rut}', '${curso}', '${nivel}') RETURNING *;`);
            console.log(`Estudiante agregado con éxito`)
            console.log('Registro Agregado', res.rows[0]);
            client.end()
        }
        nuevo()
    }
    else {
        console.log('Te faltaron argumentos, revisa tu comando')
        client.end()
    }
}

//PASO 3:
else if (accion == 'rut') {
    console.log('entra a rut')
    let rut = argumentos[1]
    async function busquedaRut() {
        const res = await client.query(`SELECT nombre, rut, curso, nivel FROM estudiantes WHERE rut ='${rut}';`);
        console.log(`Estudiante encontrado con éxito`)
        console.log('Registros Encontrados', res.rows[0]);
        client.end()
    }
    busquedaRut()
}

//PASO 4:
else if (accion == 'consulta') {
    console.log('entra a consulta')
    async function consulta() {
        const res = await client.query("SELECT * FROM estudiantes");
        console.log(`Estudiantes encontrados con éxito`)
        console.log('Registros Encontrados', res.rows[0]);
        client.end()
    }
    consulta()
}

//PASO 5:
else if (accion == 'editar') {
    console.log('entra a editar')
    if (argumentos.length == '5') {
        let nombre = argumentos[1]
        let rut = argumentos[2]
        let curso = argumentos[3]
        let nivel = argumentos[4]
        async function editar() {
            const res = await client.query(`UPDATE estudiantes SET rut='${rut}', curso='${curso}', nivel='${nivel}' WHERE nombre='${nombre}'`);
            console.log(`Estudiante editado con éxito`)
            client.end()
        }
        editar()
    }
    else {
        console.log('Te faltaron argumentos, revisa tu comando')
        client.end()
    }
}

//PASO 6:
else if (accion == 'eliminar') {
    console.log('entra a eliminar')
    let rut = argumentos[1]
    async function eliminar() {
        const res = await client.query(`DELETE FROM estudiantes WHERE rut='${rut}'`);
        console.log(`Estudiante eliminado con éxito`)
        client.end()
    }
    eliminar()
}

else {
    console.log('Ingresa una acción correcta')
    client.end()
}

