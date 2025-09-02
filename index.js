import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";

const git = simpleGit();
const filePath = "./data.json";

// Set specific date: September 1st, 2025
const getTargetTimestamp = () => {
  const date = moment("2025-09-01 12:00:00");
  return date.format("YYYY-MM-DDTHH:mm:ss");
};

// Create a single commit at the target date
const makeSingleCommit = async (dateStr) => {
  const data = { date: dateStr, commit: 1 };
  await jsonfile.writeFile(filePath, data);
  await git.add([filePath]);
  await git.commit(`Commit for ${dateStr}`, undefined, { "--date": dateStr });
};

// Main function
const makeTargetCommit = async () => {
  const date = getTargetTimestamp();
  console.log(`Creating single commit on: ${date}`);
  await makeSingleCommit(date);
  // Push the commit
  await git.push();
  console.log("Commit created and pushed successfully!");
};

makeTargetCommit();