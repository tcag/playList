import mongodb from "mongoose";
mongodb.set("strictQuery", true);

const connectDatabase = async () => {
  await mongodb
    .connect(process.env.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB CONECTADO!");
    })
    .catch((err) => console.log(err));
};
export default connectDatabase;
