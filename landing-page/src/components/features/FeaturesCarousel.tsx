// React
import { useEffect, useState } from 'react';
// Shadcnui
import { Separator } from '../ui/separator';
// Icons
import { ChevronDown, ChevronUp } from 'lucide-react';
// Assets/Images
import feature1 from '../../assets/images/feature1.png';
import feature2 from '../../assets/images/feature2.png';
import feature3 from '../../assets/images/feature3.png';
import FeaturesImages from './FeaturesImages';

export default function FeaturesCarousel() {

    const [selectedSection, setSelectedSection] = useState("one");
    const [isOpen, setOpen] = useState(true);
    const [imageText, setImageText] = useState("");
    const [imagePath, setImagePath] = useState("");
    const [imageStyle, setImageStyle] = useState("");

    const handleActiveSection = (section: string) => {
        setSelectedSection(section);
        setOpen(true);
    }

    useEffect(() => {
        if (selectedSection === "one") {
            setImageText("Unleash your creativity and share your thoughts effortlessly ✍️");
            setImagePath(feature1);
            setImageStyle("md:w-3/4 -bottom-10 bg-zinc-50 p-3");
        } else if (selectedSection === "two") {
            setImageText("Pick the perfect moment to make the biggest impact 📈");
            setImagePath(feature2);
            setImageStyle("md:w-3/5 -bottom-10 bg-zinc-900 pb-10 p-3");
        } else {
            setImageText("🏁 Witness incredible results—get ready to be amazed! ");
            setImagePath(feature3);
            setImageStyle("md:w-3/4 -bottom-2 md:-bottom-8");
        }
    }, [selectedSection]);

    return (
        <div className="w-full h-auto md:h-[60svh] flex flex-col md:flex-row rounded-xl bg-zinc-50 border border-zinc-300 shadow-md shadow-zinc-300">
            {/* SCRITTE */}
            <div className="md:w-1/3 h-full flex flex-col items-start justify-start">
                {/* BLOCCO 1 */}
                <div className={`w-full flex flex-col items-start justify-start gap-y-3 p-5 border-b border-zinc-300 ${selectedSection === 'one' ? 'h-4/6' : 'h-1/3'}`}>
                    <p className='w-full flex justify-between font-semibold text-zinc-900'>
                        Write Your Post
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
                                    Use our simple and efficient editor to create your Reddit post exactly the way you want. Format your text, add links, and ensure your message is clear and engaging for your audience.
                                </p>
                            </>
                        ) : ''}
                </div>
                {/* BLOCCO 2 */}
                <div className={`w-full flex flex-col items-start justify-start gap-y-3 p-5 border-b border-zinc-300 ${selectedSection === 'two' ? 'h-4/6' : 'h-1/3'}`}>
                    <p className='w-full flex justify-between font-semibold text-zinc-900'>
                        Pick the Best Time
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
                                    Our platform analyzes subreddit activity patterns to help you choose the optimal time for posting. Maximize your post’s visibility by scheduling when the community is most active.
                                </p>
                            </>
                        ) : ''}
                </div>
                {/* BLOCCO 3 */}
                <div className={`w-full flex flex-col items-start justify-start gap-y-3 p-5 ${selectedSection === 'three' ? 'h-4/6' : 'h-1/3'}`}>
                    <p className='w-full flex justify-between font-semibold text-zinc-900'>
                        Post with Precision
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
                                    Once you’ve crafted your post and selected the best time, leave the rest to us. Your post will be automatically published with perfect accuracy, so you can focus on what matters most.
                                </p>
                            </>
                        ) : ''}
                </div>
            </div>
            {/* IMMAGINI */}
            <div className="w-full md:w-2/3 h-auto md:h-full min-h-[60svh] md:min-h-0 flex flex-col items-center justify-start relative overflow-hidden bg-orange-500 rounded-b-xl md:rounded-r-xl md:rounded-l-none">
                <FeaturesImages text={imageText} imagePath={imagePath} imageStyle={imageStyle} />
            </div>
        </div>
    );
}
