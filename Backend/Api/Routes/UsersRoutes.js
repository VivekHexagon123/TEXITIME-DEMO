// this configraction for  routes

const express = require("express");
const upload = require("../Middlewares/multer");
const router = express.Router();

// this is user controllers for a client side
const {
  getUsers,
  registerUser,
  loginUser,
  sendotp,
  verifyotp,
} = require("../Controllers/Frontend/UsersControl");

// this is count controllers for a admin side
const {
  countuser,
  countDispatchers,
  countFleets,
  countproviders,
} = require("../Controllers/Admin/CountControl");

// this is user controllers for a admin side
const {
  getusersadmin,
  edituseradmin,
  Updategetuser,
  deleteuser,
  addnewuser,
} = require("../Controllers/Admin/Role/adminUserControl");

//this is provider controllers for a admin side

const {
  listproviders,
  deleteprovider,
  editgetproviders,
  editprovider,
  addnewprovider,
  statusprovider,
} = require("../Controllers/Admin/Role/adminProviderControl");

//this is providerservice controllers for a admin sidśe
const {
  getproviderService,
  updateProviderService,
  deleteProviderService,
} = require("../Controllers/Admin/Role/adminProviderServiceControl");

//this is dispatcher controller  for a admin side

const {
  listdispatcher,
  editgetdispatcher,
  updateDispatcher,
  addNewDispatcher,
  deleteDispatcher,
} = require("../Controllers/Admin/Role/adminDispatcherControl");

// this is fleets owner controllers for a admin side
const {
  lidtfleetsowner,
  editgetfleetsowner,
  editFleetsOwner,
  addnewfleetsowner,
  deletefleetowner,
} = require("../Controllers/Admin/Role/adminFleetsownerControl");

// this is accountmanager controller for a admin side
const {
  listaccountmanager,
  editgetaccountmanager,
  editaccountmanager,
  deleteaccountmanager,
  addnewaccountmanager,
} = require("../Controllers/Admin/Role/adminAccountManagerControl");

// this is account conrtroller for a admin side
const {
  accountlist,
  accountstatusupdate,
  AccountApprovedlist,
  geteditaccount,
  updateaccount,
  deleteaccount,
} = require("../Controllers/Admin/AccountManagement/AccountControl");

// this is login controller a admin side
const {
  adminlogin,
  adminlogout,
} = require("../Controllers/Admin/loginControl");

//this is provider controller for a client side
const {
  getservicename,
  registerProvider,
  loginProvider,
  Providersendotp,
  Providerverifyotp,
} = require("../Controllers/Frontend/ProviderControl/ProviderControl");

const {
  getwaitingrequest,
  reapprovedstaus,
  getdisapprovedbankdetailes,
  disapprovedstaus,
  getapprovedrequest,
  getdisapprovedrequest,
  getwaitingbankdetailes,
  approvedstaus,
  getapprovedbankdetailes,
} = require("../Controllers/Admin/AccountManagement/WithdrawControllers");

const {
  overallridessatementcount,
  allridessatementcount,
  ridessatement,
  providersatement,
  providerridessatement,
  daysatementcount,
  alldayridessatementcount,
  monthlysatementcount,
  allmonthlyridessatementcount,
  yearsatementcount,
  allyearsridessatementcount,
} = require("../Controllers/Admin/AccountManagement/StatementControl");

// this is review module controllers
const {
  userReview,
  ProviderReview,
} = require("../Controllers/Admin/Review/ReviewControl");

// this is request history module controllers
const {
  RequestHistory,
  ScheduledHistory,
} = require("../Controllers/Admin/History/HistoryControl");

const {
  getServiceTypes,
  Updategetservicetypes,
  updateservice,
  addnewservicetype,
  deleteServiceTypes,
} = require("../Controllers/Admin/General/ServiceTypesControl");

const {
  getDocuments,
  editgetdocuments,
  updatedocument,
  addnewdocument,
  deletedocument,
} = require("../Controllers/Admin/General/DocumentsControl");


const {
  getPromocodes,
  editgetpromocode ,
  updatePromocode ,
  addPromocode ,
  deletePromocode
} = require("../Controllers/Admin/General/PromocodesControl");

const {
  getSiteSetting , getaccountsetting , updateaccountsetting , updatepassword
} = require("../Controllers/Admin/Setting/Sitesettingcontrol");
// all routes

// this is Users Routes for a client side
router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-otp", sendotp);
router.post("/verify-otp", verifyotp);

// this is users routes fro a admin side
router.get("/countuser", countuser);
router.get("/countDispatchers", countDispatchers);
router.get("/countFleets", countFleets);
router.get("/countproviders", countproviders);

// this is users routes fro a admin side
router.get("/listusers", getusersadmin);
router.put("/editusers/:id", upload.single("picture"), edituseradmin);
router.get("/editgetusers/:id", Updategetuser);
router.delete("/deleteusers/:id", deleteuser);
router.post("/addnewusers", upload.single("picture"), addnewuser);

// this is provider routes fro a admin side
router.get("/listproviders", listproviders);
router.get("/editgetproviders/:id", editgetproviders);
router.put("/editprovider/:id", upload.single("avatar"), editprovider);
router.post("/addnewprovider", upload.single("avatar"), addnewprovider);
router.delete("/deleteprovider/:id", deleteprovider);
router.post("/statusprovider/:id", statusprovider);

// this is provider service routes fro a admin side
router.get("/providerservice/:id", getproviderService);
router.put("/providerserviceupdate/:id", updateProviderService);
router.delete("/providerservicedelete/:id", deleteProviderService);

// this is dispatcher routes fro a admin side
router.get("/listdispatchers", listdispatcher);
router.get("/editgetdispatcher/:id", editgetdispatcher);
router.put("/editdispatcher/:id", updateDispatcher);
router.post("/addnewdispatcher", addNewDispatcher);
router.delete("/deletedispatcher/:id", deleteDispatcher);

//this is fleets oqner routes for a admin side

router.get("/listfleetsowner", lidtfleetsowner);
router.get("/editgetfleetsowner/:id", editgetfleetsowner);
router.put("/editfleetsowner/:id", upload.single("logo"), editFleetsOwner);
router.post("/addnewfleetowner", upload.single("logo"), addnewfleetsowner);
router.delete("/deletefleetowner/:id", deletefleetowner);

//this is AccountManager routes for a admin side

router.get("/listaccountmanager", listaccountmanager);
router.get("/editgetaccountmanager/:id", editgetaccountmanager);
router.put("/editaccountmanager/:id", editaccountmanager);
router.delete("/deleteaccountmanager/:id", deleteaccountmanager);
router.post("/addnewaccountmanager", addnewaccountmanager);

// this is account routes fro a admin side
router.get("/accountlist", accountlist);
router.put("/accountstatusUpadate/:id", accountstatusupdate);
router.get("/AccountApprovedlist", AccountApprovedlist);
router.get("/geteditaccount/:id", geteditaccount);
router.put("/updateaccount/:id", updateaccount);
router.delete("/deleteaccount/:id", deleteaccount);

// this is login and logout  routes fro a admin side

router.post("/adminlogin", adminlogin);
router.post("/adminlogout", adminlogout);

// this is provider routes fro a client side

router.get("/getservicename", getservicename);
router.post("/registerProvider", registerProvider);
router.post("/loginProvider", loginProvider);
router.post("/Provider-send-otp", Providersendotp);
router.post("/Provider-verify-otp", Providerverifyotp);

router.get("/getwaitingrequest", getwaitingrequest);
router.get("/getapprovedrequest", getapprovedrequest);
router.get("/getdisapprovedrequest", getdisapprovedrequest);

router.get("/getbankdetailes/:id", getwaitingbankdetailes);
router.put("/approvedstaus/:id", approvedstaus);
router.get("/getapprovedbankdetailes/:id", getapprovedbankdetailes);
router.put("/disapprovedstaus/:id", disapprovedstaus);
router.get("/getdisapprovedbankdetailes/:id", getdisapprovedbankdetailes);
router.put("/reapprovedstaus/:id", reapprovedstaus);

// this is statement modulea routes
router.get("/overallridessatementcount", overallridessatementcount);
router.get("/allridessatementcount", allridessatementcount);
router.get("/ridessatement/:id", ridessatement);
router.get("/providersatement", providersatement);
router.get("/providerridessatement/:id", providerridessatement);
router.get("/dayridessatementcount", daysatementcount);
router.get("/alldayridessatementcount", alldayridessatementcount);
router.get("/monthlyridessatementcount", monthlysatementcount);
router.get("/allmonthlyridessatementcount", allmonthlyridessatementcount);
router.get("/yearridessatementcount", yearsatementcount);
router.get("/allyearsridessatementcount", allyearsridessatementcount);

// this is review module routes
router.get("/getuserReview", userReview);
router.get("/getproviderReview", ProviderReview);

// this is request history module routes
router.get("/getrequesthistory", RequestHistory);
router.get("/getscheduledhistory", ScheduledHistory);

router.get("/getServiceTypes", getServiceTypes);
router.get("/Updategetservicetypes/:id", Updategetservicetypes);
router.put("/updateservice/:id", upload.single("image"), updateservice);
router.post("/addnewservicetype", upload.single("image"), addnewservicetype);
router.delete("/deleteServiceTypes/:id", deleteServiceTypes);

router.get("/getdocument", getDocuments);
router.get("/editgetdocument/:id", editgetdocuments);
router.put("/updatedocument/:id", updatedocument);
router.post("/addnewdocument", addnewdocument);
router.delete("/deletedocument/:id", deletedocument);

router.get("/getPromocodes", getPromocodes);
router.get("/editgetpromocode/:id", editgetpromocode);
router.put("/updatePromocode/:id", updatePromocode);
router.post("/addPromocode", addPromocode);
router.delete("/deletePromocode/:id", deletePromocode);

router.get("/getsitesetting", getSiteSetting);
router.get("/getaccountsetting", getaccountsetting);
router.put("/updateaccountsetting", upload.single("picture"), updateaccountsetting);

router.put("/updatepassword", updatepassword);

module.exports = router;
