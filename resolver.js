const util = require('./util.js');


const Resolver = {
    // return all engineers
    engineers: () => {
        return util.findAllEngineer();
    },
    // filter engineers based on input
    engineer: ({ input }) => {
        // if client is passing arguments, filter the result
        if (input) {
            return util.findEngineer(input);
        }
        // if no arguments are passed, return all data
        return util.findAllEngineer();
    },

    // add an engineer
    newEngineer: ({ input }) => {
        util.newEngineer(input);
        return util.findAllEngineer();
    }
};

module.exports = {
    Resolver
};