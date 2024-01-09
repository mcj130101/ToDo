import Task from "../models/Task.js";

const resolvers = {
  Query: {
    getTasks: async () => {
      const tasks = await Task.find();
      return tasks.map((t) => {
        return {
          _id: t._id.toString(),
          content: t.content,
        };
      });
    },
  },
  Mutation: {
    createTask: async (parent, { content }) => {
      const task = new Task({
        content: content,
      });
      const createdTask = await task.save();
      console.log(createdTask);
      return { ...createdTask._doc };
    },
    editTask: async (parent, { id, newContent }) => {
      const task = await Task.findById(id);
      console.log(task);
      if (!task) {
        throw new Error("No task found");
      }
      task.content = newContent;
      const result = await task.save();

      return result.content;
    },
    deleteTask: async (parent, { id }) => {
      const task = await Task.findById(id);
      if (!task) {
        throw new Error("no task found");
      }
      const result = await Task.findByIdAndDelete(id);
      return { ...task._doc, _id: task._id.toString() };
    },
  },
};

export default resolvers;
