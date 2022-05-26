const axios = require('axios').default

const data = async () => {
    try {
        let { data } = await axios.get('https://mindicador.cl/api')

        const utm = data.utm.valor
        const euro = data.euro.valor
        const uf = data.uf.valor
        const dolar = data.dolar.valor

        return {utm, euro, uf, dolar}
    } catch (err) {
        console.log(err)
    }
}

module.exports = data