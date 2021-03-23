const app = require('./server/app')

// Start server
const PORT = process.env.PORT
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))