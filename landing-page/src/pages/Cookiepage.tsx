// Components
import AppContainer from "@/components/custom/AppContainer";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

export default function Cookiepage() {
    return (
        <AppContainer>
            <Navbar />
            <div className="w-full h-auto min-h-[50vh] flex flex-col mt-24 text-zinc-900 py-8">
                <h1 className="text-3xl font-semibold mb-6">Cookie Policy</h1>
                <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
                <p className="mb-6 text-zinc-500">
                    Cookies are small files stored on your device that help us provide a better user experience by remembering your preferences, settings, and browsing behavior.
                    These files are essential for the functionality of some features on our platform, but we do not store any personal information directly in the cookies.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Third-Party Cookie Usage</h2>
                <p className="mb-6 text-zinc-500">
                    We do not use cookies for advertising or tracking your personal behavior across other websites. However, we do use a third-party cookie from Simple Analytics to track page views
                    and improve the performance of our website. This helps us understand how users interact with the site and make improvements for a better experience.
                </p>

                <h2 className="text-2xl font-semibold mb-4">What Information is Collected?</h2>
                <p className="mb-6 text-zinc-500">
                    The only information collected by cookies on our platform is related to your interactions with our website, such as page views, navigation preferences, and how often you visit.
                    We do not collect personal information like your name, email, or payment details through cookies.
                </p>

                <h2 className="text-2xl font-semibold mb-4">How Can You Control Cookies?</h2>
                <p className="mb-6 text-zinc-500">
                    You can control or disable cookies through your browser settings at any time. Disabling cookies may impact the functionality of certain features on our platform, but you can still access most content.
                    For detailed instructions, please refer to your browser's help documentation.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Your Consent</h2>
                <p className="text-zinc-500">
                    By using our platform, you consent to the use of cookies as described in this policy. If you have any questions or concerns, please feel free to reach out to our support team.
                </p>
            </div>
            <Footer />
        </AppContainer>
    );
}
