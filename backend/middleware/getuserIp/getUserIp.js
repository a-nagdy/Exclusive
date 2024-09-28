const getIpAddress = () => {
    return (req, res, next) => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        req.userIp = ip;
        next();
    }
}

export default getIpAddress;