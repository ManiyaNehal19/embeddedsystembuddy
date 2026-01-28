import mongoose from "mongoose";
const connectionToDataBase = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL as string);
        
    } catch (error) {
        console.log(error);
        
    }
}
export default connectionToDataBase;