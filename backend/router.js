import { registerAccount, loginAccount, logoutAccount, getAccount, updateAccount } from "./controllers/accounts.js";
import { createEvent, getEventsByPublisher, getAllEvents, getEventById, updateEvent, deleteEvent } from "./controllers/event.js";
import { createAnnouncement, getAnnouncementById, getAllAnnouncements, getAnnouncementsByOrg, updateAnnouncement, deleteAnnouncement } from "./controllers/announcement.js";
import { createRequest, getRequestsByInvitee, getRequestsByPublisher,  getRequestById,  getAllRequests, updateRequest } from "./controllers/request.js";
import { createReport, getReportById, getAllReports, getReportsByOrg, getReportsByReporter, updateReport } from "./controllers/reports.js";
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
    app.post('/event/create', createEvent);
    app.get('/event/get/all', getAllEvents);
    app.get('/event/get/id', getEventById);
    app.post('/event/update', updateEvent);
    app.post('/event/delete', deleteEvent);
    app.get('/event/get/all/publisher', getEventsByPublisher);


    app.post('/announcement/create', createAnnouncement);
    app.get('/announcement/get/id', getAnnouncementById);
    app.get('/announcement/get/all', getAllAnnouncements);
    app.get('/announcement/get/all/org', getAnnouncementsByOrg);
    app.post('/announcement/update', updateAnnouncement);
    app.post('/announcement/delete', deleteAnnouncement);

    app.post('/request/create', createRequest);
    app.get('/request/get/all', getAllRequests);
    app.get('/request/get/id', getRequestById);
    app.get('/request/get/all/publisher', getRequestsByPublisher);
    app.get('/request/get/all/invitee', getRequestsByInvitee);
    app.post('/request/update', updateRequest);

    app.post('/report/create', createReport);
    app.get('/report/get/id', getReportById);
    app.get('/report/get/all', getAllReports);
    app.get('/report/get/all/org', getReportsByOrg);
    app.get('/report/get/all/reporter', getReportsByReporter);
}

export default router;