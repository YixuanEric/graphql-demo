const util = require('./util.js');


const Resolver = {
    // return all engineers
    engineers: () => {
        return dbData;
    },
    // filter engineers based on input
    engineer: ({ input }) => {
        // if client is passing arguments, filter the result
        console.log(input);
        if (input) {
            return util.findEngineer(input);
        }
        // if no arguments are passed, return all data
        return util.findAllEngineer();
    },
    // Engineer: {
    //     vertical: () => {
    //         return ["a fake vertical"]
    //     }
    // },

    // add an engineer
    newEngineer: ({ input }) => {
        dbData.push(input);
        return util.findAllEngineer();
    }
};

module.exports = {
    Resolver
};