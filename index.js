import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const git = simpleGit();
const filePath = "./data.json";

// Generate a random time on a specific day
const getRandomTimestamp = (baseDate) => {
  const hour = random.int(0, 23);
  const minute = random.int(0, 59);
  const second = random.int(0, 59);
  return moment(baseDate).hour(hour).minute(minute).second(second).format();
};

// Create a single commit at a given date
const makeSingleCommit = async (dateStr) => {
  const data = { date: dateStr };
  await jsonfile.writeFile(filePath, data);
  await git.add([filePath]);
  await git.commit(dateStr, undefined, { "--date": dateStr });
};

// Loop through 52 weeks and 7 days each (1 year), randomly create commits
const makeCommits = async () => {
  const base = moment().subtract(1, "year").add(1, "day");

  for (let week = 0; week < 52; week++) {
    for (let day = 0; day < 7; day++) {
      const commitCount = random.int(0, 10); // Up to 10 commits per day

      for (let i = 0; i < commitCount; i++) {
        const date = getRandomTimestamp(base.clone().add(week, "weeks").add(day, "days"));
        console.log(`Committing on: ${date}`);
        await makeSingleCommit(date);
      }
    }
  }

  await git.push();
};

makeCommits();
