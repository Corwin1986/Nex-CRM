import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Accounts from './pages/Accounts';
import Contacts from './pages/Contacts';
import Quotes from './pages/Quotes';
import Invoices from './pages/Invoices';
import Leads from './pages/Leads';
import Opportunities from './pages/Opportunities';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Payments from './pages/Payments';
import Cases from './pages/Cases';
import Contracts from './pages/Contracts';
import Assets from './pages/Assets';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Onboarding": Onboarding,
    "Dashboard": Dashboard,
    "Settings": Settings,
    "Accounts": Accounts,
    "Contacts": Contacts,
    "Quotes": Quotes,
    "Invoices": Invoices,
    "Leads": Leads,
    "Opportunities": Opportunities,
    "Products": Products,
    "Orders": Orders,
    "Payments": Payments,
    "Cases": Cases,
    "Contracts": Contracts,
    "Assets": Assets,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};