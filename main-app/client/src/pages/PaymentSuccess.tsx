import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAppContext } from '../components/context/AppContext';
import Confetti from 'react-confetti';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setIsPro } = useAppContext();
    const [countdown, setCountdown] = useState(5);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [showConfetti, setShowConfetti] = useState(true);

    useEffect(() => {
        // Set user as pro
        setIsPro(true);

        // Handle window resize
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Start countdown for automatic redirect
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Stop confetti after 5 seconds
        const confettiTimer = setTimeout(() => {
            setShowConfetti(false);
        }, 5000);

        return () => {
            clearInterval(timer);
            clearTimeout(confettiTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, [navigate, setIsPro]);

    const status = searchParams.get('status');
    const isAlreadyPro = status === 'already_pro';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={200}
                    gravity={0.2}
                    initialVelocityY={20}
                    initialVelocityX={10}
                    colors={['#FFD700', '#FFA500', '#FF6347', '#FF4500', '#FF1493', '#00FF00', '#00BFFF', '#4169E1']}
                    style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 1000 }}
                />
            )}
            <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="mb-6">
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    {isAlreadyPro ? 'Already a Pro Member' : 'Payment Successful!'}
                </h1>

                <p className="text-gray-600 mb-8">
                    {isAlreadyPro
                        ? 'You are already a Pro member. Enjoy your premium features!'
                        : 'Thank you for upgrading to Pro! You now have access to all premium features.'}
                </p>

                <div className="space-y-4">
                    <Button
                        onClick={() => navigate('/dashboard')}
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    >
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    <p className="text-sm text-gray-500">
                        Redirecting to dashboard in {countdown} seconds...
                    </p>
                </div>
            </div>
        </div>
    );
} 