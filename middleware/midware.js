// Log a pink-colored message with the HTTP method and path for GET, POST, and other requests like DELETE
const midware = (req, res, next) => {
    const pinkLogs =  '\x1b[35m';
    switch (req.method) {
        case 'GET': {
            console.info(`${pinkLogs}${req.method} request to ${req.path}`);
            break;
        }
        case 'POST': {
            console.info(`${pinkLogs}${req.method} request to ${req.path}`);
            break;
        }
        default:
            console.log(`${pinkLogs}${req.method} request to ${req.path}`);
    }

    next();
};

exports.midware = midware;