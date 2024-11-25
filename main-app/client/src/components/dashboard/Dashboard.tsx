// React
import { useState } from 'react';
// minimal-tiptap
import { Content } from '@tiptap/react'
// Components
import DataPicker from './DataPicker';
import DescriptionEditor from './DescriptionEditor';
import SelectOption from './SelectOption';
import TitleEditor from './TitleEditor';
import { TimePicker } from './time-picker/TimePicker';
import { Button } from '../ui/button';
import { Clock4 } from 'lucide-react';

export default function Dashboard() {

  const today = new Date();

  const [communityValue, setCommunityValue] = useState<string>("");
  const [flagValue, setFlagValue] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<Content>("");
  const [dateValue, setDateValue] = useState<Date>(today);
  const [timeValue, setTimeValue] = useState<any>(today);

  const optionsCommunity = ['r/Entrepeneur', 'SaaS', 'indiehackers'];
  const optionsFlag = ['About story', 'No spam', 'future', 'B2B'];

  const handelPostCreation = () => {
    const stampa = `Community: ${communityValue}\n
                    Flag: ${flagValue}\n
                    Title: ${titleValue}\n
                    Description: ${descriptionValue}\n
                    Data: ${dateValue}\n
                    Hour: ${timeValue}`;

    alert(stampa);
    // Resetta le opzioni
    setCommunityValue("");
    setFlagValue("");
    setTitleValue("");
    setDescriptionValue("");
    setDateValue(today);
    setTimeValue(today);
  }

  return (
    <div className="w-full flex flex-col gap-y-6 mt-3 px-3 pb-3 overflow-scroll">
      <div className='flex flex-col md:flex-row gap-6'>
        {/* SELECT COMMUNITY */}
        <SelectOption
          placeholder='Select a community'
          selectLabel='Community'
          options={optionsCommunity}
          value={communityValue}
          setValue={setCommunityValue}
        />
        {/* SELECT FLAG */}
        <SelectOption
          placeholder='Select a flag'
          selectLabel='Flag'
          options={optionsFlag}
          value={flagValue}
          setValue={setFlagValue}
        />
      </div>
      {/* TITLE EDITOR */}
      <TitleEditor
        titleValue={titleValue}
        setTitleValue={setTitleValue}
      />
      {/* DESCRIPTION EDITOR */}
      <DescriptionEditor
        descriptionValue={descriptionValue}
        setDescriptionValue={setDescriptionValue}
      />
      <div className='w-full h-fit flex flex-col md:flex-row items-center justify-start gap-6'>
        {/* DATA PICKER */}
        <DataPicker
          date={dateValue}
          setDateValue={setDateValue}
        />
        {/* TIME PICKER */}
        <TimePicker
          date={timeValue}
          setDate={setTimeValue}
        />
        <div className='w-full flex items-center justify-end'>
          <Button
            className='w-1/2 py-5 bg-buttonColor hover:bg-buttonHoverColor'
            onClick={() => handelPostCreation()}>
            <Clock4 />
            Schedule your post
          </Button>
        </div>
      </div>
    </div>
  )
}