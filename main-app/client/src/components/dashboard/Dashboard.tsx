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
  const [combinedDateTime, setCombinedDateTime] = useState<Date>(new Date());

  // Funzione per aggiornare la data
  const handleDateChange = (newDate: Date) => {
    // Se la data selzionata è oggi mantieni l'ora corrente
    if (isToday(newDate)) {
      const updateDate = new Date(newDate);
      updateDate.setHours(combinedDateTime.getHours());
      updateDate.setMinutes(combinedDateTime.getMinutes());
      setCombinedDateTime(updateDate);
    } else {
      setCombinedDateTime(newDate);
    }
  }

  // Funzione per aggiornare l'orario
  const handleTimeChange = (newTime: Date) => {
    const updateDateTime = new Date(combinedDateTime);
    updateDateTime.setHours(newTime.getHours());
    updateDateTime.setMinutes(newTime.getMinutes());
    // Se la data è oggi non permette un orario precedente ad adesso
    if (isToday(combinedDateTime) && newTime < today) {
      updateDateTime.setHours(today.getHours());
      updateDateTime.setMinutes(today.getMinutes());
    }
    setCombinedDateTime(updateDateTime);
  }

  // Controlla se una data è oggi
  const isToday = (date: Date) => {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  // Funzione per la gestione della creazione di un post
  const handelPostCreation = () => {
    alert(`Post programmato per: ${combinedDateTime.toLocaleDateString()} ${combinedDateTime.toLocaleTimeString()}`);
  }

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-10 mt-3 px-3 overflow-scroll">
      {/*** BLOCCO SINISTRA ***/}
      <div className='w-full md:w-1/2 md:max-w-1/2 flex flex-col items-start justify-start gap-y-6 overflow-scroll'>
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
      <div className='w-full md:w-1/2 flex flex-col items-start justify-start gap-6 p-5 rounded-xl bg-elevation border border-border overflow-scroll'>
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
          date={combinedDateTime}
          setDateValue={handleDateChange} />
        {/* TIME PICKER */}
        <TimePicker
          date={combinedDateTime}
          setDate={handleTimeChange}
          minTime={isToday(combinedDateTime) ? today : undefined} />
        <Chart
          subreddit={communityValue} />
        {/* BOTTONE */}
        <Button
          className='w-full py-5 bg-buttonColor hover:bg-buttonHoverColor'
          onClick={() => handelPostCreation()}>
          <Clock4 />
          Schedule your post
        </Button>
      </div>
    </div>
  );
}
