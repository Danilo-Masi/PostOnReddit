import { useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle, ArrowRight, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

const ERROR_MESSAGES: { [key: string]: string } = {
    missing_request_id: 'Missing request ID. Please try again.',
    user_not_found: 'User not found. Please log in again.',
    update_failed: 'Failed to update user status. Please contact support.',
    verification_failed: 'Failed to verify payment. Please contact support.',
    server_error: 'An unexpected error occurred. Please try again later.',
};

export default function PaymentError() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const errorCode = searchParams.get('error');
    const errorMessage = errorCode ? ERROR_MESSAGES[errorCode] : 'An unexpected error occurred.';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="mb-6">
                    <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Payment Error
                </h1>

                <p className="text-gray-600 mb-4">
                    {errorMessage}
                </p>

                <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-start">
                    <Clock className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-left">
                        <p className="text-blue-800 font-medium">Don't worry!</p>
                        <p className="text-blue-600 text-sm">
                            Our team is working to resolve this issue. The Pro version will be available soon.
                            Please try again later or contact our support team for assistance.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={() => navigate('/')}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                        Return to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
} 