import { DemoCombobox } from "./DemoCombobox";
import { DemoSelectbox } from "./DemoSelectbox";
import { DemoTimePicker } from "./DemoTimePicker";

export default function Demo() {
    return (
        <div className="w-full h-svh flex flex-wrap justify-start mt-20 rounded-xl bg-zinc-200">
            <div className="w-full md:w-1/2 h-full flex flex-col">

            </div>
            <div className="w-full md:w-1/2 h-full p-5">
                <div className="w-full h-full flex flex-wrap items-start justify-start gap-6 p-5 bg-zinc-100 rounded-lg">
                    <DemoCombobox />
                    <DemoSelectbox />
                    <DemoTimePicker />
                </div>
            </div>
        </div>
    );
}
