const adminAuth = (req,res,next) => {
console.log("Admin Auth is getting checked");
const token = ("xyz"); // This is a dummy token for illustration purposes
const isAdminAuthenticated = token === "xyz";
if (!isAdminAuthenticated) {
    return res.status(401).send("Unauthorized access");
} else {
    next();
}};

const userAuth = (req,res,next) => {
console.log("user Auth is getting checked");
const token = ("xyz");
const isAdminAuthenticated = token === "xyz";
if (!isAdminAuthenticated) {
    return res.status(501).send("Unauthorized access");
} else {
    next();
}};


module.exports = {
    adminAuth,
    userAuth
};
