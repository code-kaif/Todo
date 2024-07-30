import Task from "../model/task.js";

export const newTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description)
      return res.json({ message: "Plz fill all details" });
    const task = await Task.create({ title, description, user: req.user });
    res.status(201).json({
      message: "Task Added",
      task: {
        title: task.title,
        description: task.description,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const task = await Task.find({ user: userId });
    res.status(200).json({ task });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.json({ message: "Invalid Id" });
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      message: "Task Updated",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.json({ message: "Invalid Id" });
    await task.deleteOne();
    res.status(200).json({
      message: "Task Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
