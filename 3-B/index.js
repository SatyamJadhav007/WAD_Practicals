import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import Student from "./models/schema.js";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
const app = express();
app.use(bodyParser.json());

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
  }
});

app.get("/students/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const student = await Student.findOne({ name });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error fetching student:", error);
  }
});

app.post("/new-student", async (req, res) => {
  try {
    const { name, marks } = req.body;
    const newStudent = new Student({ name, marks });
    await newStudent.save();
    res.status(201).json({ message: "Student created successfully" });
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student" });
  }
});
app.delete("/delete-student/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const deletedStudent = await Student.findOneAndDelete({ name });
    res.send(`Student with name ${name} deleted successfully`);
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Error deleting student" });
  }
});

app.put("/update-student/:name", async (req, res) => {
  const { name, marks } = req.body;
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { name },
      { $set: { marks } },
      { new: true },
    );
    res.send("Updated Successfully");
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Error updating student" });
  }
});
app.listen(6767, () => {
  console.log("Server is running on port 6767");
});
