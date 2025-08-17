
import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const filePath = "./data.json";
const NUM_COMMITS = 1500;
const DAYS_RANGE = 70;

// Generate a random timestamp within the last 70 days
const getRandomTimestamp = () => {
  // Get a random number of days ago (0 to DAYS_RANGE-1)
  const daysAgo = random.int(0, DAYS_RANGE - 1);
  // Get a random time within that day
  const hour = random.int(0, 23);
  const minute = random.int(0, 59);
  const second = random.int(0, 59);
  // Start from today and subtract daysAgo
  const date = moment().subtract(daysAgo, 'days').hour(hour).minute(minute).second(second);
  return date.format("YYYY-MM-DDTHH:mm:ss");
};

// Create a single commit at a given date
const makeSingleCommit = async (dateStr, idx) => {
  const data = { date: dateStr, commit: idx };
  await jsonfile.writeFile(filePath, data);
  await git.add([filePath]);
  await git.commit(`Commit #${idx + 1} for ${dateStr}`, undefined, { "--date": dateStr });
};

// Main function
const makeRandomCommits = async () => {
  for (let i = 0; i < NUM_COMMITS; i++) {
    const date = getRandomTimestamp();
    console.log(`Committing #${i + 1} on: ${date}`);
    await makeSingleCommit(date, i);
  }
  // Push all commits at the end
  await git.push();
};

makeRandomCommits();
