// Components
import { Check, X } from 'lucide-react'
import MainContainer from '../custom/MainContainer'

export default function Problem() {
    return (
        <MainContainer>
            <h1 className='text-5xl font-extrabold'>Tired of your posts going <i>unnoticed?</i></h1>
            <div className='w-full h-auto md:h-[40svh] flex flex-col md:flex-row items-center justify-center gap-6'>
                {/* BOX ROSSO */}
                <div className='w-full md:w-1/3 h-full rounded-lg p-5 md:px-14 flex flex-col items-start justify-center gap-y-6 text-red-700 bg-red-100 border border-red-700 '>
                    <h1 className='font-bold'>Manual posting</h1>
                    <ul className='flex flex-col gap-y-2 text-start'>
                        <li className="w-full flex items-center justify-start"><X className="w-4 h-4 mr-2" />Posts disappear into the void</li>
                        <li className="w-full flex items-center justify-start"><X className="w-4 h-4 mr-2" />You miss the best posting times</li>
                        <li className="w-full flex items-center justify-start"><X className="w-4 h-4 mr-2" />Fewer views, fewer upvotes</li>
                        <li className="w-full flex items-center justify-start"><X className="w-4 h-4 mr-2" />Wasted effort, little engagement</li>
                    </ul>
                </div>
                {/* BOX VERDE */}
                <div className='w-full md:w-1/3 h-full rounded-lg p-5 md:px-14 flex flex-col items-start justify-center gap-y-6 text-green-700 bg-green-100 border border-green-700 '>
                    <h1 className='font-bold'>Post with postonreddit</h1>
                    <ul className='flex flex-col gap-y-2 text-start'>
                        <li className="w-full flex items-center justify-start"><Check className="w-4 h-4 mr-2" />Schedule for peak hours</li>
                        <li className="w-full flex items-center justify-start"><Check className="w-4 h-4 mr-2" />Maximize visibility and engagement</li>
                        <li className="w-full flex items-center justify-start"><Check className="w-4 h-4 mr-2" />More upvotes, more traction</li>
                        <li className="w-full flex items-center justify-start"><Check className="w-4 h-4 mr-2" /> Sit back and watch your posts perform</li>
                    </ul>
                </div>
            </div>
        </MainContainer>
    );
}
