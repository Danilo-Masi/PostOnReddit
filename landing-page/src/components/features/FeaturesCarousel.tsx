import { useEffect, useState } from 'react';
import { Separator } from '../ui/separator';
import { ChevronDown, ChevronUp } from 'lucide-react';
import feature1 from '../../assets/images/feature1.webp';
import feature2 from '../../assets/images/feature2.webp';
import feature3 from '../../assets/images/feature3.webp';
import FeaturesImages from './FeaturesImages';

export default function FeaturesCarousel() {

    const [selectedSection, setSelectedSection] = useState("one");
    const [isOpen, setOpen] = useState(true);
    const [imagePath, setImagePath] = useState("");
    const [imageStyle, setImageStyle] = useState("");

    const handleActiveSection = (section: string) => {
        setSelectedSection(section);
        setOpen(true);
    }

    useEffect(() => {
        if (selectedSection === "one") {
            setImagePath(feature1);
            setImageStyle("-bottom-2 p-3 bg-zinc-50 rounded-lg");
        } else if (selectedSection === "two") {
            setImagePath(feature2);
            setImageStyle("-bottom-2 p-3 bg-zinc-100 rounded-lg");
        } else {
            setImagePath(feature3);
            setImageStyle("bottom-5 md:bottom-10 left-28 p-3 bg-zinc-900 rounded-lg scale-150");
        }
    }, [selectedSection]);

    return (
        <div className="w-full md:w-2/3 h-auto md:h-[60svh] flex flex-col md:flex-row rounded-xl bg-zinc-50 border border-zinc-300 shadow-md shadow-zinc-300">
            {/* SCRITTE */}
            <div className="md:w-1/2 h-full flex flex-col items-start justify-start">
                {/* BLOCCO 1 */}
                <div className={`w-full flex flex-col items-start justify-start gap-y-3 p-5 border-b border-zinc-300 ${selectedSection === 'one' ? 'h-4/6' : 'h-1/3'}`}>
                    <p className='w-full flex justify-between font-semibold text-zinc-900'>
                        Craft your perfect post
                        <span className='cursor-pointer'>
                            {selectedSection === "one" && isOpen ? (
                                <ChevronUp />
                            ) : (
                                <ChevronDown onClick={() => handleActiveSection("one")} />
                            )}
                        </span>
                    </p>
                    {selectedSection === "one" && isOpen
                        ? (
                            <>
                                <Separator className='bg-zinc-200' />
                                <p className='text-zinc-500 text-left'>
                                    Easily compose your Reddit post with our intuitive editor. Format text, add links, and make your message stand out with precision and clarity
                                </p>
                            </>
                        ) : ''}
                </div>
                {/* BLOCCO 2 */}
                <div className={`w-full flex flex-col items-start justify-start gap-y-3 p-5 border-b border-zinc-300 ${selectedSection === 'two' ? 'h-4/6' : 'h-1/3'}`}>
                    <p className='w-full flex justify-between font-semibold text-zinc-900'>
                        Optimize your timing
                        <span className='cursor-pointer'>
                            {selectedSection === "two" && isOpen ? (
                                <ChevronUp />
                            ) : (
                                <ChevronDown onClick={() => handleActiveSection("two")} />
                            )}
                        </span>
                    </p>
                    {selectedSection === "two" && isOpen
                        ? (
                            <>
                                <Separator className='bg-zinc-200' />
                                <p className='text-zinc-500 text-left'>
                                    Leverage our data-driven insights to schedule your post when your audience is most engaged, ensuring maximum reach and impact
                                </p>
                            </>
                        ) : ''}
                </div>
                {/* BLOCCO 3 */}
                <div className={`w-full flex flex-col items-start justify-start gap-y-3 p-5 ${selectedSection === 'three' ? 'h-4/6' : 'h-1/3'}`}>
                    <p className='w-full flex justify-between font-semibold text-zinc-900'>
                        Seamless Auto-Posting
                        <span className='cursor-pointer'>
                            {selectedSection === "three" && isOpen ? (
                                <ChevronUp />
                            ) : (
                                <ChevronDown onClick={() => handleActiveSection("three")} />
                            )}
                        </span>
                    </p>
                    {selectedSection === "three" && isOpen
                        ? (
                            <>
                                <Separator className='bg-zinc-200' />
                                <p className='text-zinc-500 text-left'>
                                    Sit back and relax while we publish your post at the optimal time, guaranteeing perfect execution and audience attention
                                </p>
                            </>
                        ) : ''}
                </div>
            </div>
            {/* IMMAGINI */}
            <div className="w-full md:w-1/2 h-auto md:h-full min-h-[60svh] md:min-h-0 flex flex-col items-center justify-start relative overflow-hidden bg-orange-500 rounded-b-xl md:rounded-r-xl md:rounded-l-none">
                <FeaturesImages imagePath={imagePath} imageStyle={imageStyle} />
            </div>
        </div>
    );
}
