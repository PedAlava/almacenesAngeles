const  config = {
    debUrl : process.env.DB_URL || 'mongodb+srv://ANAcaicedo13:ANAcaicedo13@cluster0.79a1c.gcp.mongodb.net/ups?retryWrites=true&w=majority',
    port:  process.env.PORT || 4001,
    host: process.env.HOST || 'http://127.0.0.1',
    publicRoute: process.env.PUBLIC_ROUTE ||'/',
    filesRoute: process.env.FILES_ROUTE || 'FILES'


}
module.exports = config