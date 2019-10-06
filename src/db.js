import mongoose from 'mongoose'
import "colors"

export const connectDB = () => {
  const {
    DB_SCHEME: scheme,
    DB_HOST: host,
    DB_USER: user,
    DB_PASS: pass,
    DB_NAME: dbName
  } = process.env
  const uri = `${scheme}://${user}:${encodeURI(pass)}@${host}/${dbName}`;

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
  mongoose.connect(uri, opts);
  mongoose.connection.on('connected', () => {
    console.log('Connected to db'.bgGreen)
  })
}