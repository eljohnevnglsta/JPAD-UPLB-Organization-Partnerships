import { registerAccount, loginAccount } from "./controllers/accounts.js";

const router = (app) => {
    app.post('/account/register', registerAccount);
    app.get('/account/login', loginAccount);
}

export default router;