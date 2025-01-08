import { registerAccount, loginAccount, logoutAccount, getAccount, updateAccount } from "./controllers/accounts.js";

// Routes for the database
// To fetch data from the database, we need to create routes that will be used to access the data.
// For example: Use the path "localhost:3000/account/register" to register an account.
const router = (app) => {
    app.post('/account/register', registerAccount);
    app.get('/account/login', loginAccount);
    app.get('/account/logout', logoutAccount);

    // TODO: Add middleware for authentication
    app.post('/account/update', updateAccount);
    app.get('/account/get', getAccount);
    
}

export default router;