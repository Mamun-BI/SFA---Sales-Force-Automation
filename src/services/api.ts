import {
  demoCustomers,
  demoDashboardData,
  demoMasterData,
  demoProducts,
  demoReportData,
  demoSubDBs,
  makeDemoLoginResponse,
  makeDemoCustomerId,
} from "@/data/demoData";

// This branch is a public portfolio demo. Keep all data local and fictional;
// never send demo credentials or submitted form data to the legacy company API.
function demoResponse(action: string, payload: Record<string, unknown> = {}) {
  switch (action) {
    case "login":
      return makeDemoLoginResponse(String(payload.email || ""), String(payload.password || ""));
    case "getMasterData":
      return { success: true, data: demoMasterData };
    case "getCustomers":
      return { success: true, data: demoCustomers };
    case "getProducts":
      return { success: true, data: demoProducts };
    case "getSubDBs":
      return { success: true, data: demoSubDBs };
    case "getDashboardData":
      return { success: true, data: demoDashboardData };
    case "getReportData":
      return { success: true, data: demoReportData };
    case "clockIn":
    case "clockOut":
      return { success: true, message: "Attendance saved in demo mode." };
    case "submitVisit":
      return { success: true, visitId: `VIS${Date.now()}`, message: "Demo visit recorded." };
    case "submitOrder":
      return { success: true, invoiceId: `ORD${Date.now()}`, message: "Demo order placed." };
    case "registerCustomer":
      return { success: true, customerId: makeDemoCustomerId(), message: "Demo customer registered." };
    case "reportPresence":
      return { success: true };
    case "getActiveUsers":
      return { success: true, users: [], totalCount: 0, onlineCount: 0 };
    default:
      return { success: false, message: `Unsupported demo action: ${action}` };
  }
}

// API-shaped wrappers preserve the existing page interfaces while making the
// portfolio version independent of the unavailable/private Google Sheets backend.
async function post<T>(payload: Record<string, unknown>): Promise<T> {
  return demoResponse(String(payload.action || ""), payload) as T;
}

async function postSingle<T>(payload: Record<string, unknown>): Promise<T> {
  return demoResponse(String(payload.action || ""), payload) as T;
}

async function get<T>(params: Record<string, string>): Promise<T> {
  return demoResponse(params.action || "", params) as T;
}

export interface LoginUser {
  userId: string;
  email: string;
  employeeName: string;
  employeeCode: string;
  position: string;
  department: string;
  territory: string;
  area: string;
  district: string;
  phone: string;
  reportingManager: string;
  activeStatus: string;
  profilePhotoUrl: string;
}

export interface LoginResponse {
  success: boolean;
  user?: LoginUser;
  message?: string;
}

export interface AttendanceResponse {
  success: boolean;
  message: string;
}

export interface MasterData {
  districts: string[];
  areas: Array<{ district: string; area: string }>;
  territories: Array<{ area: string; territory: string }>;
  employees: Array<{ email: string; employeeName: string; employeeCode: string; position: string; territory: string }>;
  settings: Record<string, string>;
}

export interface MasterDataResponse {
  success: boolean;
  data?: MasterData;
}

export interface CustomerRegistrationResponse {
  success: boolean;
  customerId?: string;
  message?: string;
}

export interface CustomerListItem {
  customerId: string;
  shopName: string;
  ownerName: string;
  ownerContact: string;
  marketName: string;
  district: string;
  area: string;
  territory: string;
  shopType: string;
  fullAddress: string;
  latitude: string;
  longitude: string;
  salesOfficer: string;
  email: string;
  status: string;
}

export interface CustomerListResponse {
  success: boolean;
  data?: CustomerListItem[];
}

export interface VisitResponse {
  success: boolean;
  visitId?: string;
  message?: string;
}

export interface VisitData {
  email: string;
  salesOfficer: string;
  salesPersonName: string;
  territory: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  district: string;
  area: string;
  customerType: string;
  marketName: string;
  totalQuantity: number;
  orderDeliveryDate?: string;
  orderNotReceived?: string;
  otherDetails?: string;
  brandFocus: string;
  otherBrand?: string;
  castrolInventory?: string;
  comments?: string;
  lat?: number;
  lng?: number;
  gpsAccuracy?: number;
  storeLat?: string;
  storeLng?: string;
  distance?: number;
  visitResult?: string;
  visitStatus?: string;
  selfieBase64?: string;
}

export interface ProductItem {
  productId: string;
  productName: string;
  category: string;
  packSize: string;
  pricePerLiter: number;
  canPailDrum: number;
  cartoonPrice: number;
  status: string;
}

export interface ProductListResponse {
  success: boolean;
  data?: ProductItem[];
}

export interface SubDBItem {
  zone: string;
  sapId: string;
  area: string;
  subDbName: string;
  status: string;
}

export interface SubDBListResponse {
  success: boolean;
  data?: SubDBItem[];
}

export interface OrderProduct {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
}

export interface OrderData {
  email: string;
  dsr: string;
  employeeName: string;
  territory: string;
  customerId: string;
  customerName: string;
  sapId: string;
  zone: string;
  area: string;
  distributorName: string;
  category: string;
  products: OrderProduct[];
  attachmentBase64?: string;
  attachmentType?: string;
}

export interface OrderResponse {
  success: boolean;
  invoiceId?: string;
  message?: string;
  debug?: string;
}

export interface DashboardVisit {
  visitId: string;
  timestamp: string;
  customerCode: string;
  customerName: string;
  area: string;
  city: string;
  latitude: string;
  longitude: string;
  brandFocus: string;
  totalQuantity: number;
  visitResult: string;
  orderNotReceived: string;
  marketName: string;
}

export interface DashboardOrder {
  invoiceId: string;
  customerName: string;
  productName: string;
  quantity: number;
  createdAt: string;
}

export interface RoutePoint {
  lat: number;
  lng: number;
  name: string;
  time: string;
  area: string;
}

export interface DashboardData {
  today: string;
  visits: DashboardVisit[];
  visitCount: number;
  orders: DashboardOrder[];
  orderCount: number;
  totalOrderQty: number;
  clockIn: string;
  clockOut: string;
  route: RoutePoint[];
  totalDistanceKm: number;
  areasVisited: string[];
}

export interface DashboardResponse {
  success: boolean;
  data?: DashboardData;
  message?: string;
}

export interface ReportVisit {
  visitId: string;
  timestamp: string;
  date: string;
  customerCode: string;
  customerName: string;
  area: string;
  city: string;
  latitude: string;
  longitude: string;
  brandFocus: string;
  totalQuantity: number;
  visitResult: string;
  orderNotReceived: string;
  marketName: string;
  territory: string;
  visitStatus: string;
}

export interface ReportOrder {
  invoiceId: string;
  customerName: string;
  customerId: string;
  productName: string;
  productId: string;
  quantity: number;
  createdAt: string;
  date: string;
  orderStatus: string;
  distributorName?: string;
  orderMonth?: number;
  orderYear?: number;
}

export interface ReportAttendance {
  type: string;
  timestamp: string;
  date: string;
}

export interface ReportRoutePoint {
  lat: number;
  lng: number;
  name: string;
  time: string;
  area: string;
  date: string;
}

export interface ReportDailySummary {
  date: string;
  visits: number;
  orders: number;
  qty: number;
}

export interface ReportTopProduct {
  name: string;
  qty: number;
  count: number;
}

export interface ReportTopCustomer {
  name: string;
  qty: number;
  count: number;
}

export interface ReportAreaBreakdown {
  area: string;
  visits: number;
}

export interface ReportBrandBreakdown {
  brand: string;
  visits: number;
}

export interface ReportSummary {
  totalVisits: number;
  totalOrders: number;
  totalOrderQty: number;
  totalDistanceKm: number;
  activeDays: number;
  totalClockIns: number;
  uniqueAreas: number;
  uniqueCustomers: number;
  avgQtyPerVisit: number;
  avgVisitsPerDay: number;
}

export interface ReportData {
  startDate: string;
  endDate: string;
  summary: ReportSummary;
  visits: ReportVisit[];
  orders: ReportOrder[];
  attendance: ReportAttendance[];
  route: ReportRoutePoint[];
  dailySummary: ReportDailySummary[];
  topProducts: ReportTopProduct[];
  topCustomers: ReportTopCustomer[];
  areaBreakdown: ReportAreaBreakdown[];
  brandBreakdown: ReportBrandBreakdown[];
}

export interface ReportResponse {
  success: boolean;
  data?: ReportData;
  message?: string;
}

export interface ActiveUser {
  userId: string;
  employeeName: string;
  employeeCode: string;
  position: string;
  area: string;
  territory: string;
  lastSeen: number;
  isOnline: boolean;
}

export interface PresenceResponse {
  success: boolean;
  users?: ActiveUser[];
  totalCount?: number;
  onlineCount?: number;
}

export const api = {
  login(email: string, password: string) {
    return post<LoginResponse>({ action: "login", email, password });
  },
  clockIn(userId: string, lat: number, lng: number, imageBase64?: string) {
    return postSingle<AttendanceResponse>({ action: "clockIn", userId, lat, lng, imageBase64 });
  },
  clockOut(userId: string, lat: number, lng: number, imageBase64?: string) {
    return postSingle<AttendanceResponse>({ action: "clockOut", userId, lat, lng, imageBase64 });
  },
  getMasterData(_forceRefresh = false) {
    return post<MasterDataResponse>({ action: "getMasterData" });
  },
  getCustomers(_forceRefresh = false) {
    return post<CustomerListResponse>({ action: "getCustomers" });
  },
  getProducts(_forceRefresh = false) {
    return post<ProductListResponse>({ action: "getProducts" });
  },
  getSubDBs(_forceRefresh = false) {
    return post<SubDBListResponse>({ action: "getSubDBs" });
  },
  async submitVisit(data: VisitData) {
    return postSingle<VisitResponse>({ action: "submitVisit", ...data });
  },
  async submitOrder(data: OrderData) {
    return postSingle<OrderResponse>({ action: "submitOrder", ...data });
  },
  getDashboardData(email: string) {
    return post<DashboardResponse>({ action: "getDashboardData", email });
  },
  getReportData(email: string, startDate?: string, endDate?: string) {
    return post<ReportResponse>({ action: "getReportData", email, startDate, endDate });
  },
  async registerCustomer(data: {
    email: string;
    district: string;
    area: string;
    marketName: string;
    shopName: string;
    shopType: string;
    fullAddress: string;
    ownerName: string;
    ownerContact: string;
    oilBrandSelling: string;
    totalAvgVolume: number;
    salesOfficer?: string;
    territory?: string;
    nid?: string;
    etin?: string;
    bin?: string;
    otherBrand?: string;
    avgCastrolVolume?: number;
    comment?: string;
    lat?: number;
    lng?: number;
    gpsAccuracy?: number;
    shopPhotoBase64?: string;
  }) {
    return postSingle<CustomerRegistrationResponse>({ action: "registerCustomer", ...data });
  },
  reportPresence(user: { userId: string; employeeName: string; employeeCode: string; position: string; area: string; territory: string }) {
    return postSingle<{ success: boolean }>({ action: "reportPresence", ...user, timestamp: Date.now() });
  },
  getActiveUsers() {
    return post<PresenceResponse>({ action: "getActiveUsers" });
  },
  prefetchData() {
    this.getMasterData().catch(() => {});
    this.getCustomers().catch(() => {});
    this.getProducts().catch(() => {});
    this.getSubDBs().catch(() => {});
  },
  clearCache() {},
};
