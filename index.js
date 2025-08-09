import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const filePath = "./data.json";
// Generate a random time on August 2, 2025
const getRandomTimestamp = (baseDate) => {
  const hour = random.int(0, 23);
  const minute = random.int(0, 59);
  const second = random.int(0, 59);
  return moment(baseDate)
    .hour(hour)
    .minute(minute)
    .second(second)
    .format("YYYY-MM-DDTHH:mm:ss"); // ISO format, you can adjust if needed
};

// Create a single commit at a given date
const makeSingleCommit = async (dateStr) => {
  const data = { date: dateStr };
  await jsonfile.writeFile(filePath, data);
  await git.add([filePath]);
  await git.commit(`Commit for ${dateStr}`, undefined, { "--date": dateStr });
  await git.push();
};

// Main function
const commitOnSpecificDate = async () => {
  // Set August 2, 2025 as the base date
  const baseDate = "2025-08-02";
  const date = getRandomTimestamp(baseDate);
  console.log(`Committing on: ${date}`);
  await makeSingleCommit(date);
};

commitOnSpecificDate();
