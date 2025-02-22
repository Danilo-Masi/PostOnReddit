import { Check, X } from 'lucide-react'
import MainContainer from '../custom/MainContainer'

export default function Problem() {
    return (
        <MainContainer>
            <h1 className='text-5xl font-extrabold'>Tired of your posts going <i>unnoticed?</i></h1>
            <div className='w-full h-auto md:h-[40svh] flex flex-col md:flex-row items-center justify-center gap-6'>
                {/* BOX ROSSO */}
                <div className='w-full md:w-1/2 h-full rounded-lg p-5 md:px-14 flex flex-col items-start justify-center gap-y-6 text-red-700 bg-red-100 border border-red-700 shadow-inner'>
                    <h1 className='font-bold'>Manual posting</h1>
                    <ul className='flex flex-col gap-y-2 text-start'>
                        <li className="w-full flex items-center justify-start"><X className="w-4 h-4 mr-2" />Your posts get ignored and don’t gain visibility.</li>
                        <li className="w-full flex items-center justify-start"><X className="w-4 h-4 mr-2" />You post when no one is online, missing the best time.</li>
                        <li className="w-full flex items-center justify-start"><X className="w-4 h-4 mr-2" />Few interactions and low views on your content.</li>
                        <li className="w-full flex items-center justify-start"><X className="w-4 h-4 mr-2" />Time and effort spent with little results.</li>
                    </ul>
                </div>
                {/* BOX VERDE */}
                <div className='w-full md:w-1/2 h-full rounded-lg p-5 md:px-14 flex flex-col items-start justify-center gap-y-6 text-green-700 bg-green-100 border border-green-700 shadow-2xl'>
                    <h1 className='font-bold'>Post with postonreddit</h1>
                    <ul className='flex flex-col gap-y-2 text-start'>
                        <li className="w-full flex items-center justify-start"><Check className="w-4 h-4 mr-2" />Schedule posts for peak times to maximize visibility.</li>
                        <li className="w-full flex items-center justify-start"><Check className="w-4 h-4 mr-2" />Increase engagement with an active audience.</li>
                        <li className="w-full flex items-center justify-start"><Check className="w-4 h-4 mr-2" />More upvotes and more traffic to your SaaS</li>
                        <li className="w-full flex items-center justify-start"><Check className="w-4 h-4 mr-2" />Automate the process and let your posts work for you.</li>
                    </ul>
                </div>
            </div>
        </MainContainer>
    );
}
