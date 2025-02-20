import AppContainer from "@/components/custom/AppContainer";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Termspage() {
    return (
        <AppContainer>
            <Navbar />
            <div className="w-full h-auto min-h-[50vh] flex flex-col mt-24 text-zinc-900 py-8">
                <h1 className="text-3xl font-semibold mb-6">Terms of Service</h1>

                <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                <p className="mb-6 text-zinc-500">
                    Welcome to our platform. By accessing or using our services, you agree to comply with these Terms of Service. Please read these terms carefully before using our platform. If you do not
                    agree with these terms, please do not use our services.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Account Registration</h2>
                <p className="mb-6 text-zinc-500">
                    To access certain features of our platform, you may need to create an account. You agree to provide accurate, up-to-date, and complete information when registering. You are responsible
                    for maintaining the confidentiality of your account credentials and are liable for any activity under your account.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Use of the Platform</h2>
                <p className="mb-6 text-zinc-500">
                    You agree to use our platform only for lawful purposes and in accordance with these Terms of Service. You are prohibited from engaging in any activities that could harm the platform,
                    disrupt its functionality, or violate the rights of others.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
                <p className="mb-6 text-zinc-500">
                    We do not guarantee the accuracy, completeness, or reliability of the content on our platform. You agree that we are not liable for any indirect, incidental, or consequential damages
                    arising from your use of our services, including but not limited to data loss, service interruptions, or errors in content.
                </p>

                <h2 className="text-2xl font-semibold mb-4">Changes to the Terms</h2>
                <p className="text-zinc-500">
                    We reserve the right to update or modify these Terms of Service at any time. Any changes will be communicated to users via our platform and will take effect immediately upon posting.
                    It is your responsibility to review these terms periodically to stay informed about any updates.
                </p>
            </div>
            <Footer />
        </AppContainer>
    );
}
