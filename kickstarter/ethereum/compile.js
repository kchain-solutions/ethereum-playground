const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const SOURCE_FILE_NAME='Kickstarter.sol';

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const kickPath = path.resolve(__dirname, 'contracts', 'Kickstarter.sol');
const source = fs.readFileSync(kickPath, 'utf8');


const input = {
    language: 'Solidity',
    sources: {
        'Kickstarter.sol': {
            content: source,
        },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*'],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Kickstarter.sol'];
fs.ensureDirSync(buildPath);


for (let contract in output) {
    
    try{
        fs.outputJSONSync(
            path.resolve(buildPath, contract + '.json'),
            output[contract]
        )
        console.log(contract, ' compiled');
    } catch(error){
        console.log(error);
    }

}

