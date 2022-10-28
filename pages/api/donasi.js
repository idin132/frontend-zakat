export default (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify([
        {
            total_donasi: "0",
        },
        {
            donatur: "0"
        }
    ]))
}