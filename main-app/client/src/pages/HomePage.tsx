// Context
import { useAppContext } from "@/components/context/AppContext";
// Components
import Layout from "@/components/sidebar/Layout";
import Dashboard from "@/components/dashboard/Dashboard";
import Scheduled from "@/components/scheduled/Scheduled";
import Settings from "@/components/settings/Settings";
import ExitDialog from "@/components/sidebar/ExitDialog";
import SupportDialog from "@/components/sidebar/SupportDialog";
import CreditsDialog from "@/components/sidebar/CreditsDialog";

export default function HomePage() {

    const { selectedSection, isExitDialogOpen, isSupportDialogOpen, isCreditsDialogOpen } = useAppContext();

    function renderContent() {
        switch (selectedSection) {
            case "scheduled-post":
                return <Scheduled />
            case "settings":
                return <Settings />
            default:
                return <Dashboard />
        }
    }

    return (
        <Layout>
            {renderContent()}
            {isExitDialogOpen && <ExitDialog />}
            {isSupportDialogOpen && <SupportDialog />}
            {isCreditsDialogOpen && <CreditsDialog />}
        </Layout>
    );
}
