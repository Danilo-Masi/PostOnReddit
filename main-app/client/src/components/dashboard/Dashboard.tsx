// React
import { useState } from 'react';
// Axios
import axios from 'axios';
// minimal-tiptap
import { Content } from '@tiptap/react';
// Components
import DescriptionEditor from './DescriptionEditor';
import SelectOption from './SelectOption';
import TitleEditor from './TitleEditor';
import SearchInput from './SearchInput';
import Chart from './Chart';
import { DateTimePicker } from './DateTimePicker';
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

  // Ottiene la data attuale
  const now = new Date();

  // Crea una nuova data in UTC con secondi e millisecondi impostati a 0
  const utcDate = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    0,
    0
  );


  const [titleValue, setTitleValue] = useState<string>("");
  const [descriptionValue, setDescriptionValue] = useState<Content>("");
  const [communityValue, setCommunityValue] = useState<string>("");
  const [flairValue, setFlairValue] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date>(utcDate);
  // Stati per il chart
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [isDataLoading, setDataLoading] = useState<boolean>(false);


  // Funzione per la creazione e caricamento del post nel DB
  const handlePostCreation = async () => {
    let errors = handleValidateForm(titleValue, descriptionValue, communityValue, dateTime);
    if (errors.length === 0) {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.post(`${SERVER_URL}/supabase/create-post`, {
          title: titleValue,
          content: descriptionValue,
          community: communityValue,
          flair: flairValue,
          date_time: dateTime,
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
    setDateTime(utcDate);
  }

  // Funzione di TEST
  const handleTest = () => {
    alert(`Titolo: ${titleValue}\n Contenuto: ${descriptionValue}\n Subreddit: ${communityValue}\n Flair: ${flairValue}\n Date: ${dateTime}\n`);
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
          <DateTimePicker date={dateTime} setDate={setDateTime} />
        </div>
        {isDataLoading === true && chartData.length === 0 ? (
          <div className='w-full h-full flex items-center justify-center'>
            <Loader2 className='animate-spin' />
          </div>
        ) : communityValue.length === 0 && chartData.length === 0 ? (
          <div className='w-full h-full flex items-center justify-center'>
            <Ban className='mr-2' size={18} />
            <p>No data found</p>
          </div>
        ) : (
          <div className='w-full h-full flex items-center justify-center'>
            <Chart
              subreddit={communityValue}
              chartData={chartData}
              setChartData={setChartData}
              isDataLoading={isDataLoading}
              setDataLoading={setDataLoading}
            />
          </div>
        )}
        {/* BOTTONE */}
        <Button
          className='bg-buttonColor hover:bg-buttonHoverColor py-5 w-full'
          onClick={handlePostCreation}>
          <Clock4 />
          Schedule your post
        </Button>
      </div>
    </div >
  );
}
