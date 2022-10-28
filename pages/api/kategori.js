export default (req, res) => {
    res.statusCode = 200
    res.setHeader ('Content-Type', 'application/json')
    res.end(JSON.stringify([
        {
            id: "1",
            kategori_zakat: "zakat penghasilan",
        },
        {
            id: "2",
            kategori_zakat: "zakat fitrah"
        }
    ]))
}