const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
async function main() {
  console.log(`starting`);
  const userResponse = await inquirer.prompt([
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
      message: "Test run with examples.",
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

  const gitResponse = await axios.get(
    `https://api.github.com/users/${gitUsername}`
  );
  const gitData = gitResponse.data;
  const gitName = gitData.login;
  const gitEmail = gitData.email;
  const gitlocation = gitData.location;
  const gitUrl = gitData.html_url;
  const gitProfileImage = gitData.avatar_url;

  // contributors
  const contributorUserNamesArray = contributorUserNames.split(",");
  console.log(contributorUserNamesArray);

  var resultContributor;
  for (i = 0; i < contributorUserNamesArray.length; i++) {
    var gitContributors = contributorUserNamesArray[i];
    const gitResponse2 = await axios.get(
      `https://api.github.com/users/${gitContributors}`
    );
    var ContriProfImage = gitResponse2.data.avatar_url;
    var gitContribuUrl = gitResponse2.data.html_url;
    var gitContribuEmail = gitResponse2.data.email;
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
This project is licensed under the ${licenseName} - see the ${licenseUrl} file for details
## Contributors
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
  const writeResult = fs.writeFileSync(
    path.join(__dirname, "../GoodReadMeGenerator", "readMe.md"),
    result
  );
  console.log("file generated....");
}
main();
