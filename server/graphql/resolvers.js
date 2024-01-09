import Task from "../models/Task.js";

const resolvers = {
  Query: {
    getTasks: async () => {
      const tasks = await Task.find();
      return tasks.map((t) => {
          return {
            ...t._doc,
            _id: t._id.toString(),
            createdAt: t.createdAt.toISOString(),
          };
        })
    },
  },
  Mutation: {
    createTask: async (parent, args) => {
      const task = new Task({
        title: args.taskInput.title,
        content: args.taskInput.content,
      });
      const createdTask = await task.save();
      console.log(createdTask);
      return { ...createdTask._doc };
    },
  },
};

export default resolvers;
