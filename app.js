import { Router } from "express";
import AuthRoutes from "./Routers/AuthRoute.js";
import industryRoutes from "./Routers/IndustryRoute.js";
import clintSupplierRoutes from "./Routers/clientSupplier.Routes.js";
import projectRoutes from "./Routers/project.Routes.js";
import jobRoutes from "./Routers/jobRoutes.js";
import companyRoutes from "./Routers/company.routes.js";
import taxCategoryRoutes from "./Routers/taxCategory.routes.js";
import costestimateRouter from "./Routers/costestimateRouter.js";
import purchaseorderRouters from "./Routers/purchaseorderRouters.js";
import assignJobRoutes from "./Routers/assignJobRoutes.js";
import invoiceRoutes from "./Routers/invoiceRoutes.js";
import dashboradRoutes from "./Routers/dashboardRoutes.js";
import timeLogsRoutes from "./Routers/timeLogsRoutes.js";
import numberSequenceRoutes from "./Routers/numberSequenceRoutes.js";
import tenantSettingsRoute from "./Routers/TenantSettingsRoute.js";

const router = Router();

router.use("/api/s1", AuthRoutes);
router.use("/api/s1", industryRoutes);
router.use("/api/s1", clintSupplierRoutes);   
router.use("/api/s1", projectRoutes);
router.use("/api/s1", jobRoutes);
router.use("/api/s1", companyRoutes);
router.use("/api/s1", taxCategoryRoutes);
router.use("/api/s1", costestimateRouter);
router.use("/api/s1", purchaseorderRouters);
router.use("/api/s1", assignJobRoutes);
router.use("/api/s1", invoiceRoutes);
router.use("/api/s1",dashboradRoutes);
router.use("/api/s1",timeLogsRoutes);
router.use("/api/s1",numberSequenceRoutes);
router.use("/api/s1", tenantSettingsRoute);

export default router;  
