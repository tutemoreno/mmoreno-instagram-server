import mongoose from 'mongoose';

const uri = 'mongodb://localhost/instagram';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('mongoDB is connected'))
  .catch((err) => console.log(err));
