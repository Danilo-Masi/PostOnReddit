// React
import { useState } from 'react';
// Axios
import axios from 'axios';
// minimal-tiptap
import { Content } from '@tiptap/react';
// time-picker
import { TimePicker } from './time-picker/TimePicker';
// Components
import DataPicker from './DataPicker';
import DescriptionEditor from './DescriptionEditor';
import SelectOption from './SelectOption';
import TitleEditor from './TitleEditor';
import SearchInput from './SearchInput';
import Chart from './Chart';
// Shadcnui
import { toast } from 'sonner';
import { Button } from '../ui/button';
// Icons
import { Ban, Clock4, Loader2 } from 'lucide-react';

// Url del server di produzione
const SERVER_URL = 'http://localhost:3000';

interface ChartData {
  day: string;
  peakHour: string;
  activity: number;
}

export default function Dashboard() {

  const today = new Date();
  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<Content>("");
  const [communityValue, setCommunityValue] = useState<string>("");
  const [flairValue, setFlairValue] = useState<string>("");
  const [combinedDateTime, setCombinedDateTime] = useState<Date>(new Date());
  // Stati per il chart
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isDataLoading, setDataLoading] = useState<boolean>(false);

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

  // Controlla se la data selezionata è uguale alla data di oggi
  const isToday = (date: Date) => {
    const now = new Date();
    return (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
  }

  // Funzione per la creazione e caricamento del post nel DB
  const handelPostCreation = async () => {
    let errors = handleValidateForm(titleValue, descriptionValue, communityValue, combinedDateTime);
    if (errors.length === 0) {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.post(`${SERVER_URL}/supabase/create-post`, {
          title: titleValue,
          content: descriptionValue,
          community: communityValue,
          flair: flairValue,
          date_time: combinedDateTime,
        }, {
          headers: { Authorization: `Bearer ${authToken}` },
        });

        if (response.status === 200) {
          handleSuccess();
        }
      } catch (error: any) {
        console.error("CLIENT: Errore durante il salvataggio del post su DB", error.message);
        toast.warning("An error occour, please try again later!");
      }
    } else {
      errors.map(error => {
        toast.warning(error);
      });
    }
  }

  // Funzione per validare i dati inseriti nel form per la creazione del post
  const handleValidateForm = (title: string, content: Content, community: string, data: Date) => {
    let errors: string[] = [];
    if (title.length === 0) {
      errors.push("The title can't be empty");
    }
    if (content === null) {
      errors.push("The content is not valid");
    } else if (content.length <= 0) {
      errors.push("The content can't be empty");
    }
    if (community.length <= 0) {
      errors.push("The community is not selected");
    }
    if (data.getDate() === null || undefined) {
      errors.push("The date selected is not valid");
    }
    return errors;
  }

  // Funzione per gestire il successo
  const handleSuccess = () => {
    toast("Post scheduled correctly!");
    setTitleValue("");
    setDescriptionValue("");
    setCommunityValue("");
    setFlairValue("");
    setCombinedDateTime(today);
  }

  return (
    <div className="flex md:flex-row flex-col gap-10 mt-3 px-3 w-full h-full overflow-scroll">
      {/*** BLOCCO SINISTRA ***/}
      <div className='flex flex-col justify-start items-start gap-y-6 w-full md:w-1/2 md:max-w-1/2 overflow-scroll'>
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
      <div className='w-full md:w-1/2 flex flex-col justify-start items-start gap-6 bg-elevation p-5 border border-border rounded-xl overflow-scroll'>
        <div className='w-full h-auto flex flex-col md:flex-row md:flex-wrap gap-4'>
          {/* SELECT COMMUNITY */}
          <SearchInput
            communityValue={communityValue}
            setCommunityValue={setCommunityValue} />
          {/* SELECT FLAG */}
          <SelectOption
            subreddit={communityValue}
            isDisabled={communityValue === "" ? true : false}
            placeholder='Select a flair'
            value={flairValue}
            setValue={setFlairValue} />
          {/* DATA PICKER */}
          <DataPicker
            date={combinedDateTime}
            setDateValue={handleDateChange} />
          {/* TIME PICKER */}
          <TimePicker
            date={combinedDateTime}
            setDate={handleTimeChange}
            minTime={isToday(combinedDateTime) ? today : undefined} />
        </div>
        {isDataLoading ? (
          <div className='w-full h-full flex items-center justify-center'>
            <Loader2 className='animate-spin' />
          </div>
        ) : chartData.length === 0 ? (
          <div className='w-full h-full flex items-center justify-center'>
            <Ban className='mr-2' size={18} />
            <p>No data found</p>
          </div>
        ) : (
          <Chart
            subreddit={communityValue}
            chartData={chartData}
            setChartData={setChartData}
            isDataLoading={isDataLoading}
            setDataLoading={setDataLoading} />
        )}
        {/* BOTTONE */}
        <Button
          className='bg-buttonColor hover:bg-buttonHoverColor py-5 w-full'
          onClick={() => handelPostCreation()}>
          <Clock4 />
          Schedule your post
        </Button>
      </div>
    </div>
  );
}
