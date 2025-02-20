import AppContainer from "@/components/custom/AppContainer";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Privacypage() {
    return (
        <AppContainer>
            <Navbar />
            <div className="w-full h-auto min-h-[50vh] flex flex-col mt-24 text-zinc-900 py-8">
                <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>

                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="mb-6 text-zinc-500">
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our platform. By using our services,
                    you agree to the collection and use of information in accordance with this policy.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                <p className="mb-6 text-zinc-500">
                    We collect information that you provide to us directly, such as your name, surname, email address, and other details when you sign up for our waitlist. Additionally, we collect
                    non-personal data, such as usage statistics, device information, and browsing behavior through cookies and third-party tools like Simple Analytics.
                </p>

                <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                <p className="mb-6 text-zinc-500">
                    The information we collect is used to provide, maintain, and improve our platform. We may use your email to send you updates regarding our services, promotions, or changes to our
                    policies. We do not sell or rent your personal data to third parties.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                <p className="mb-6 text-zinc-500">
                    We take reasonable precautions to protect your personal data from unauthorized access, loss, or misuse. However, please note that no method of data transmission over the internet
                    is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Your Rights and Control Over Your Data</h2>
                <p className="mb-6 text-zinc-500">
                    You have the right to access, correct, or delete the personal information we hold about you. You can also object to the processing of your personal data at any time. If you wish to
                    exercise these rights or if you have any concerns about the way we handle your data, please contact us via the support section of our platform.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                <p className="text-zinc-500">
                    We may update our Privacy Policy from time to time. Any changes will be communicated through our platform and will take effect immediately upon being posted. Please review this
                    policy regularly to stay informed about how we are protecting your data.
                </p>
            </div>
            <Footer />
        </AppContainer>
    );
}
