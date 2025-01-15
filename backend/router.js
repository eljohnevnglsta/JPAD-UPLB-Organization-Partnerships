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
    app.post('/account/login', loginAccount);
    app.get('/account/logout', logoutAccount);

    // TODO: Add middleware for authentication
    app.post('/account/update', updateAccount);
    app.post('/account/get', getAccount);
    
    app.post('/event/create', createEvent);
    app.get('/event/get/all', getAllEvents);
    app.post('/event/get/id', getEventById);
    app.post('/event/update', updateEvent);
    app.post('/event/delete', deleteEvent);
    app.post('/event/get/all/publisher', getEventsByPublisher);

    app.post('/announcement/create', createAnnouncement);
    app.post('/announcement/get/id', getAnnouncementById);
    app.get('/announcement/get/all', getAllAnnouncements);
    app.post('/announcement/get/all/org', getAnnouncementsByOrg);
    app.post('/announcement/update', updateAnnouncement);
    app.post('/announcement/delete', deleteAnnouncement);

    app.post('/request/create', createRequest);
    app.get('/request/get/all', getAllRequests);
    app.post('/request/get/id', getRequestById);
    app.post('/request/get/all/publisher', getRequestsByPublisher);
    app.post('/request/get/all/invitee', getRequestsByInvitee);
    app.post('/request/update', updateRequest);

    app.post('/report/create', createReport);
    app.post('/report/get/id', getReportById);
    app.get('/report/get/all', getAllReports);
    app.post('/report/get/all/org', getReportsByOrg);
    app.post('/report/get/all/reporter', getReportsByReporter);
}

export default router;