import { connect } from "mongoose";

async function connectToMongo(url) {
  return await connect(url);
}

export default connectToMongo;
