const url = require('url')
const http = require('http')
const fs = require('fs')
const uuid = require('uuid')

const enviar = require ('./mailer')
const data = require ('./data')



const servidor = http.createServer ( async (req, res) => {
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        fs.readFile('index.html', 'utf-8', (error, data) => {
            res.end(data)
        })
    }
    else if (req.url.startsWith('/mailing')) {
        const { correos, asunto, contenido } = url.parse(req.url, true).query
        const {utm, euro, uf, dolar} = await data()

        const contenidoCorreo = contenido +`
        <p> Valor UTM: ${utm} </p>
        <p> Valor Euro: ${euro} </p>
        <p> Valor Uf: ${uf} </p>
        <p> Valor Dolar: ${dolar} </p>`

        enviar(correos.split(','), asunto, contenidoCorreo).then(() => {
            const rutaNombreArchivo = 'correos\\'+uuid.v4()
            try{
                fs.writeFile(`${rutaNombreArchivo}.txt`, `Para: ${correos.split(',')}\nAsunto: ${asunto}\nContenido: ${contenidoCorreo}`, 'utf-8', () => {
                    res.end('Correos enviados exitosamente')
                })
            }catch(err){
                console.error(err)
            }


        }).catch(() => {
            res.end('No se han podido enviar los correos')
        })
    }
})
servidor.listen(8080, () => console.log('Listen Port 8080'))





