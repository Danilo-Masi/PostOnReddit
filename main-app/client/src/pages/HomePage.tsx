import { useEffect, useState, memo, useMemo } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { checkToken } from "@/hooks/use-verify";
import { useAppContext } from "@/components/context/AppContext";
import Layout from "@/components/sidebar/Layout";
import Dashboard from "@/components/dashboard/Dashboard";
import Scheduled from "@/components/scheduled/Scheduled";
import Settings from "@/components/settings/Settings";
import ExitDialog from "@/components/sidebar/ExitDialog";
import SupportDialog from "@/components/sidebar/SupportDialog";
import DeleteDialog from "@/components/scheduled/DeleteDialog";
import { Loader2 } from "lucide-react";

const MemoizedDashboard = memo(Dashboard);
const MemoizedScheduled = memo(Scheduled);
const MemoizedSettings = memo(Settings);

export default function HomePage() {
    const navigate: NavigateFunction = useNavigate();
    const { selectedSection, isExitDialogOpen, isSupportDialogOpen, isDeleteDialogOpen } = useAppContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        const checkUser = async () => {
            try {
                const authStatus = await checkToken();
                if (isMounted) {
                    setIsAuthenticated(!!authStatus);
                    if (!authStatus) {
                        navigate('/login');
                    }
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
                if (isMounted) {
                    navigate('/login');
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        checkUser();

        return () => {
            isMounted = false;
        };
    }, [navigate]);

    const content = useMemo(() => {
        switch (selectedSection) {
            case "scheduled-post":
                return <MemoizedScheduled />;
            case "settings":
                return <MemoizedSettings />;
            default:
                return <MemoizedDashboard />;
        }
    }, [selectedSection]);

    if (isLoading) {
        return (
            <div className="w-screen h-svh flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    return (
        <Layout>
            {content}
            {isExitDialogOpen && <ExitDialog />}
            {isSupportDialogOpen && <SupportDialog />}
            {isDeleteDialogOpen && <DeleteDialog />}
        </Layout>
    );
}
