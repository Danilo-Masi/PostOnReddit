// React
import { useEffect } from "react";
// React-router
import { NavigateFunction, useNavigate } from "react-router-dom";
// Hooks
import { checkToken } from "@/hooks/use-verify";
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
import DeleteDialog from "@/components/scheduled/DeleteDialog";


export default function HomePage() {

    const navigate: NavigateFunction = useNavigate();
    const { selectedSection, isExitDialogOpen, isSupportDialogOpen, isCreditsDialogOpen, isDeleteDialogOpen } = useAppContext();

    useEffect(() => {
        const checkUser = async () => {
            const isAuthenticated = await checkToken();
            if (isAuthenticated === false) {
                navigate('/login');
            }
        }
        checkUser();
    }, [navigate]);

    // Funzione per renderizzare il contenuto selezionato nella sidebar
    function renderContent() {
        switch (selectedSection) {
            case "scheduled-post":
                return <Scheduled />
            case "settings":
                return <Settings />
            default:
                return <Dashboard />
        }
    };

    return (
        <Layout>
            {renderContent()}
            {isExitDialogOpen && <ExitDialog />}
            {isSupportDialogOpen && <SupportDialog />}
            {isCreditsDialogOpen && <CreditsDialog />}
            {isDeleteDialogOpen && <DeleteDialog />}
        </Layout>
    );
}
