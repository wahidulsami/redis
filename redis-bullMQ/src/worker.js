import { Worker } from "bullmq";
import { connection } from "./queue.js";

const emailWorker = new Worker(
  "emailQueue",

  async (job) => {
    console.log("Processing email:", job.data.email);

    console.log("Job ID:", job.id);
    console.log("Job Name:", job.name);
    console.log("Job Data:", job.data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Email job completed:", job.id , job.name , job.data);
  },

  {
    connection,
  }
); 

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} has completed!`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} has failed with error: ${err.message}`);
});

