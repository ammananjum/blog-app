import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGODB_URI environment variable in .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('✅ Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('🔄 Connecting to MongoDB...');
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'blogDB',
        bufferCommands: false,
      })
      .then((mongoose) => {
        console.log('✅ MongoDB connected');
        return mongoose;
      })
      .catch((err) => {
        console.error('❌ MongoDB connection failed:', err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
ise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'blogDB',
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
