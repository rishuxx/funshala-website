require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const Program = require('./models/Program');
const Event = require('./models/Event');
const { programs, events } = require('./utils/seedData');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Admin.deleteMany();
    await Program.deleteMany();
    await Event.deleteMany();

    const adminUser = new Admin({
      email: 'admin@funshala.com',
      password: 'password123',
    });
    await adminUser.save();

    await Program.insertMany(programs);
    await Event.insertMany(events);

    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Admin.deleteMany();
    await Program.deleteMany();
    await Event.deleteMany();
    
    console.log('Data Destroyed!');
    process.exit();
  } catch (err) {
    console.error(`${err}`);
    process.exit(1);
  }
};

const run = async () => {
    await connectDB();
    if (process.argv[2] === '-d') {
        await destroyData();
    } else {
        await importData();
    }
}

run();