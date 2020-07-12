const inquirer = require("inquirer");
const axios = require("axios");
const fs = require('fs');
const path = require('path');
async function main(){
    console.log(`starting`);
    const userResponse = await inquirer
    .prompt([
        {
            type: "input",
            message: "What is your GitHub user name?",
            name: "username"
        },
        {
            type: "input",
            message: "What's the name of project?",
            name: "ProjectName"
        },
        {
            type: "input",
            message: "Please give a description",
            name: "ProjectDescription"
        },
        {
            type: "input",
            message: "What steps did you take to install the project?",
            name: "InstallProcess"
        },
        {
            type: "input",
            message: "Please give user instruction.",
            name: "instruction"
        },
        {
            type: "input",
            message: "Please show example of use.",
            name: "Example"
        },
        {
            type: "input",
            message: "provide License url ",
            name: "licenseUrl"
        },
        {
            type: "input",
            message: "provide License name ",
            name: "licenseName"
        },
        {
            type: "input",
            message: "please enter Github usernames of the contributor if any (If there are mulitple contributors, separate with coma and no space. )",
            name: "contributors"
        },
        {
            type: "input",
            message: "Test run with examples.",
            name: "tests"
        }
        ]);
        console.log(`starting`);
        //Begins userResponse declarations
        console.log(userResponse);
        const gitUsername = userResponse.username;
        const projectTittle = userResponse.projectName;
        const projectDescription = userResponse.ProjectDescription;
        const installationProcess = userResponse.installProcess;
        const instruction = userResponse.instruction;
        const instructionExample = userResponse.Example;
        const licenseName = userResponse.licenseUrl;
        const licenseUrl = userResponse.licensenNamel;
        const contributorUserNames = userResponse.contributors;
        const tests = userResponse.tests;