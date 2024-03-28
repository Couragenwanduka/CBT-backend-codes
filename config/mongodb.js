import {connect} from 'mongoose'

const connectDB = async () => {
    try {
        await connect(process.env.mongodb_string)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

export default connectDB;