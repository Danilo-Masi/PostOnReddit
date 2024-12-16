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
import SearchInput from './SearchInput';
import Chart from './Chart';

export default function Dashboard() {

  const today = new Date();

  const [communityValue, setCommunityValue] = useState<string>("");
  const [flagValue, setFlagValue] = useState<string>("");
  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<Content>("");
  const [dateValue, setDateValue] = useState<Date>(today);
  const [timeValue, setTimeValue] = useState<any>(today);

  const handelPostCreation = () => {
    alert("Community selezionata: " + communityValue + "\n" + "titolo: " + titleValue + "\n" + "Descrizione: " + descriptionValue + "\n" + "Data e ora: " + timeValue);
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-10 mt-3 px-3 overflow-scroll">
      {/*** BLOCCO SINISTRA ***/}
      <div className='w-full md:w-[55%] flex flex-col items-start justify-start gap-y-6'>
        {/* TITLE EDITOR */}
        <TitleEditor
          titleValue={titleValue}
          setTitleValue={setTitleValue} />
        {/* DESCRIPTION EDITOR */}
        <DescriptionEditor
          descriptionValue={descriptionValue}
          setDescriptionValue={setDescriptionValue} />
      </div>
      {/*** BLOCCO DESTRA ***/}
      <div className='w-full md:w-[45%] flex flex-col items-start justify-start gap-6 p-5 rounded-xl bg-elevation border border-border overflow-scroll'>
        <div className='w-full flex flex-col md:flex-row gap-3'>
          {/* SELECT COMMUNITY */}
          <SearchInput
            communityValue={communityValue}
            setCommunityValue={setCommunityValue} />
          {/* SELECT FLAG */}
          <SelectOption
            communityValue={communityValue}
            isDisabled={communityValue === "" ? true : false}
            placeholder='Select a flair'
            selectLabel='Flair'
            value={flagValue}
            setValue={setFlagValue} />
        </div>
        {/* DATA PICKER */}
        <DataPicker
          date={dateValue}
          setDateValue={setDateValue} />
        {/* TIME PICKER */}
        <TimePicker
          date={timeValue}
          setDate={setTimeValue} />
        <Chart />
        {/* BOTTONE */}
        <Button
          className='w-full py-5 bg-buttonColor hover:bg-buttonHoverColor'
          onClick={() => handelPostCreation()}>
          <Clock4 />
          Schedule your post
        </Button>
      </div>
    </div>
  )
}
