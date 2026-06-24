require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Trip = require("../models/Trip");
const JoinRequest = require("../models/JoinRequest");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const Review = require("../models/Review");

const seedData = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tripconnect");
    console.log(`Connected to database: ${conn.connection.host}`);

    // Clear existing data
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Trip.deleteMany({});
    await JoinRequest.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});
    await Review.deleteMany({});
    console.log("Data cleared!");

    // Create users
    console.log("Seeding users...");
    const users = await User.create([
      {
        name: "Alice Vance",
        email: "alice@example.com",
        password: "password123",
        age: 26,
        gender: "female",
        city: "New York",
        bio: "Adventure seeker, foodie, and landscape photographer. I love exploring off-the-beaten-path destinations!",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
        travelInterests: ["Hiking", "Photography", "Local Food", "Nature"],
        rating: 5.0,
      },
      {
        name: "Bob Miller",
        email: "bob@example.com",
        password: "password123",
        age: 29,
        gender: "male",
        city: "San Francisco",
        bio: "Software developer who works remotely. Travel is my lifestyle. Let's share some travel stories and split costs!",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        travelInterests: ["Backpacking", "Remote Work", "Surfing", "Hostels"],
        rating: 4.8,
      },
      {
        name: "Charlie Brown",
        email: "charlie@example.com",
        password: "password123",
        age: 31,
        gender: "male",
        city: "Chicago",
        bio: "History buff and museum hopper. I prefer cultural tours, architecture, and slow travel.",
        profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
        travelInterests: ["History", "Museums", "Sightseeing", "Art"],
        rating: 4.5,
      },
      {
        name: "Diana Prince",
        email: "diana@example.com",
        password: "password123",
        age: 28,
        gender: "female",
        city: "Seattle",
        bio: "Outdoorsy person. Weekend hiker, camper, and casual cyclist. Always up for an active trip!",
        profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        travelInterests: ["Camping", "Hiking", "Active", "Cycling"],
        rating: 4.7,
      },
      {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        password: "password123",
        age: 35,
        gender: "male",
        city: "Los Angeles",
        bio: "Adrenaline junkie! Skydiving, scuba diving, and extreme sports are my things.",
        profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        travelInterests: ["Extreme Sports", "Scuba", "Adrenaline", "Road Trips"],
        rating: 4.2,
      },
    ]);

    const [alice, bob, charlie, diana, ethan] = users;
    console.log("Users seeded successfully!");

    // Create Trips
    console.log("Seeding trips...");
    const currentDate = new Date();
    const addDays = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const trip1 = await Trip.create({
      destination: "Bali, Indonesia",
      startDate: addDays(currentDate, 30),
      endDate: addDays(currentDate, 40),
      budget: 1200,
      description: "Looking for 2-3 fellow travelers to rent a villa in Ubud, explore the temples, try surfing in Canggu, and hike Mount Batur for sunrise. Let's split costs and have an unforgettable trip!",
      maxMembers: 4,
      createdBy: alice._id,
      members: [alice._id, bob._id], // Bob is already a member
    });

    const trip2 = await Trip.create({
      destination: "Paris & Rome Summer",
      startDate: addDays(currentDate, 60),
      endDate: addDays(currentDate, 72),
      budget: 2500,
      description: "Planning a classic European trip. 5 days in Paris doing museums and cafes, then taking the train to Rome for historic sights and amazing food. Hostels and budget friendly!",
      maxMembers: 3,
      createdBy: bob._id,
      members: [bob._id, alice._id, diana._id], // Full trip!
    });

    const trip3 = await Trip.create({
      destination: "Tokyo & Kyoto, Japan",
      startDate: addDays(currentDate, 90),
      endDate: addDays(currentDate, 100),
      budget: 3000,
      description: "Spring cherry blossom tour. Exploring neon-lit Shinjuku, visiting shrines in Kyoto, eating sushi, and renting a traditional ryokan. Looking for respectful travel buddies.",
      maxMembers: 5,
      createdBy: charlie._id,
      members: [charlie._id],
    });

    console.log("Trips seeded successfully!");

    // Create Conversations for trips
    console.log("Seeding conversations...");
    const convo1 = await Conversation.create({
      trip: trip1._id,
      members: [alice._id, bob._id],
    });

    const convo2 = await Conversation.create({
      trip: trip2._id,
      members: [bob._id, alice._id, diana._id],
    });

    const convo3 = await Conversation.create({
      trip: trip3._id,
      members: [charlie._id],
    });

    // Seed messages for Conversation 2 (Euro Summer)
    console.log("Seeding chat messages...");
    await Message.create([
      {
        conversation: convo2._id,
        sender: bob._id,
        text: "Hey everyone! Thanks for joining this trip group! Let's start planning the itinerary.",
      },
      {
        conversation: convo2._id,
        sender: alice._id,
        text: "Hi Bob! Super excited. I definitely want to visit the Louvre in Paris. Should we book tickets in advance?",
      },
      {
        conversation: convo2._id,
        sender: diana._id,
        text: "Yes, Louvre tickets sell out fast! I can look up the trains between Paris and Rome too.",
      },
      {
        conversation: convo2._id,
        sender: bob._id,
        text: "Awesome Diana, please do. I'll search for cool hostels in Paris tonight.",
      },
    ]);

    // Create Join Requests
    console.log("Seeding join requests...");
    // Charlie wants to join Bali (Pending)
    await JoinRequest.create({
      trip: trip1._id,
      user: charlie._id,
      status: "pending",
    });

    // Diana wants to join Bali (Pending)
    await JoinRequest.create({
      trip: trip1._id,
      user: diana._id,
      status: "pending",
    });

    // Ethan wanted to join Euro summer but was rejected (to show reject flow)
    await JoinRequest.create({
      trip: trip2._id,
      user: ethan._id,
      status: "rejected",
    });

    // Ethan wants to join Tokyo (Pending)
    await JoinRequest.create({
      trip: trip3._id,
      user: ethan._id,
      status: "pending",
    });

    console.log("Join requests seeded successfully!");

    // Seed Reviews (To give users some background ratings)
    console.log("Seeding reviews...");
    // Bob reviewed Alice (which is already calculated as rating 5.0)
    await Review.create({
      reviewer: bob._id,
      reviewedUser: alice._id,
      trip: trip2._id,
      rating: 5,
      comment: "Alice was an incredible travel buddy! She managed the schedule perfectly, knew the best spots, and was so fun to explore with.",
    });

    // Alice reviewed Bob
    await Review.create({
      reviewer: alice._id,
      reviewedUser: bob._id,
      trip: trip2._id,
      rating: 5,
      comment: "Bob is a great organizer! Highly recommended, super chill and always helpful in sorting out accommodation.",
    });

    // Charlie reviewed Bob for another past trip (let's create a temporary trip for the review or use trip 1/2. Let's use trip 1)
    await Review.create({
      reviewer: charlie._id,
      reviewedUser: bob._id,
      trip: trip1._id,
      rating: 4,
      comment: "Great guy, nice sharing stories. Sometimes slept in, but overall a solid companion.",
    });

    // Recalculate average ratings
    await Review.calculateAverageRating(alice._id);
    await Review.calculateAverageRating(bob._id);

    console.log("Reviews seeded successfully!");
    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
