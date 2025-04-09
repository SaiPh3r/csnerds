import mongoose from "mongoose"

export async function connect(){
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const connection =  mongoose.connection;

        connection.on('connected',()=>{
            console.log("connected to data base")
        })

        connection.on('error',(error)=>{
            console.log('cant connect to data base');
            console.log(error);
            process.exit(1);
        })
        
    } catch (error) {
        console.log("cant connect to data base")
        console.log(error)
        
    }
}