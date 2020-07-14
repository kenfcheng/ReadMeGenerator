const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
async function main() {
  console.log(`starting`);
  var userResponse = await inquirer.prompt([
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "username",
    },
    {
      type: "input",
      message: "What's the name of project?",
      name: "ProjectName",
    },
    {
      type: "input",
      message: "Please give a description",
      name: "ProjectDescription",
    },
    {
      type: "input",
      message: "What steps did you take to install the project?",
      name: "InstallProcess",
    },
    {
      type: "input",
      message: "Please give user instruction.",
      name: "instruction",
    },
    {
      type: "input",
      message: "Please show example of use.",
      name: "Example",
    },
    {
      type: "input",
      message: "provide License url ",
      name: "licenseUrl",
    },
    {
      type: "input",
      message: "provide License name ",
      name: "licenseName",
    },
    {
      type: "input",
      message:
        "please enter Github usernames of the contributor if any (If there are mulitple contributors, separate with coma and no space. )",
      name: "contributors",
    },
    {
      type: "input",
      message: "Please run test example.",
      name: "tests",
    },
  ]);
  console.log(`starting`);
  //Begins userResponse declarations
  console.log(userResponse);
  const username = userResponse.username;
  const projectName = userResponse.projectName;
  const projectDescription = userResponse.ProjectDescription;
  const installProcess = userResponse.installProcess;
  const instruction = userResponse.instruction;
  const Example = userResponse.Example;
  const licenseUrl = userResponse.licenseUrl;
  const licenseName = userResponse.licensenName;
  const contributors = userResponse.contributors;
  const tests = userResponse.tests;

  // retrieves GitHub data

  const gitResponse = await axios
    .get(`https://api.github.com/users/${username}`)
    .catch((err) => console.log(err));
  const gitData = gitResponse.data;
  const gitName = gitData.login;
  const gitEmail = gitData.email;
  const gitlocation = gitData.location;
  const gitUrl = gitData.html_url;
  const gitProfileImage = gitData.avatar_url;

  // contributors
  const contributorUserNamesArray = contributors.split(",");
  console.log(contributorUserNamesArray);

  var resultContributor;
  for (i = 0; i < contributorUserNamesArray.length; i++) {
    const gitContributors = contributorUserNamesArray[i];
    if (!gitContributors) continue;
    const gitResponse2 = await axios.get(
      `https://api.github.com/users/${gitContributors}`
    );
    const ContriProfImage = gitResponse2.data.avatar_url;
    const gitContribuUrl = gitResponse2.data.html_url;
    const gitContribuEmail = gitResponse2.data.email;
    var resultContributor =
      resultContributor +
      `
                \n <img src="${ContriProfImage}" alt="drawing" width="150" display="inline"/> ${gitContributors}  GitHubLink: ${gitContribuUrl}`;
  }

  // Creates New Lines for Sections in ReadMe
  let result = `
        # ${projectName} 
${projectDescription}
\n* [Installation](#Installation)
\n* [Instructions](#Instructions)
\n* [License](#License)
\n* [Contributors](#Contributors)
\n* [Author](#Author)
\n* [Tests](#Tests)

## Installation
${installationProcess}
## Instructions
${instruction}
\`\`\`
${instructionExample}
\`\`\`
## License 
The license for this project ${licenseName} - details can be found at ${licenseUrl} 
${resultContributor}
## Tests
${tests}
## Author 
\n![ProfileImage](${gitProfileImage})
\n**${gitName}**
\nEmail: ${gitEmail}
\nLocation:${gitlocation}
\nGitHub: ${gitUrl}
`;
  var writeResult = fs.writeFileSync(
    path.join(__dirname, "../GoodReadMeGenerator", "readMe.md"),
    result
  );
  console.log("file generated....");
}
main();

setTimeout(function (userResponse) {
  try {
    noSuchVariable;
  } catch {
    alert("error");
  }
}, 1000);
