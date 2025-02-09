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

// Url del server
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

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
  // Stati che gestiscono i valori del chart
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

        // Se l'errore contiene un messaggio di errore personalizzato, mostralo
        if (error.response && error.response.data && error.response.data.details) {
          error.response.data.details.forEach((errMsg: string) => {
            toast.error(errMsg);
          });
        } else {
          // Se non c'è un errore specifico nel messaggio, mostra un errore generico
          toast.error("An error occurred, please try again later");
        }
      }
    } else {
      // Mostra gli errori di validazione del form
      errors.map(error => {
        toast.warning(error);
      });
    }
  };

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
    if (!data || isNaN(data.getTime())) {
      errors.push("The date selected is not valid");
    } else if (data.getTime() < Date.now()) {
      errors.push("The date can't be in the past");
    }
    return errors;
  }

  // Funzione per gestire il successo
  const handleSuccess = () => {
    toast.success("Post scheduled correctly!");
    setTitleValue("");
    setDescriptionValue("");
    setCommunityValue("");
    setFlairValue("");
    setDateTime(utcDate);
  }

  return (
    <div className="w-full h-fit md:h-full flex md:flex-row flex-col gap-10 p-5 rounded-xl bg-zinc-200 dark:bg-zinc-700">
      {/*** BLOCCO SINISTRA ***/}
      <div className='w-full md:w-1/2 h-full flex flex-col gap-y-6'>
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
      <div className='w-full md:w-1/2 h-full flex flex-col p-5 gap-y-10 md:gap-y-0 bg-zinc-100 dark:bg-zinc-800 border border-border rounded-lg'>
        {/* Input subreddit, flair, date */}
        <div className='w-full flex flex-col md:flex-row md:flex-wrap gap-4'>
          <SearchInput
            communityValue={communityValue}
            setCommunityValue={setCommunityValue} />
          <SelectOption
            subreddit={communityValue}
            isDisabled={communityValue === "" ? true : false}
            placeholder='Select a flair'
            value={flairValue}
            setValue={setFlairValue} />
          <DateTimePicker
            date={dateTime}
            setDate={setDateTime} />
        </div>
        {/* Chart o invalida data */}
        {isDataLoading === true && chartData.length === 0 ? (
          <div className='w-full h-full min-h-[40svh] md:min-h-0 flex items-center justify-center'>
            <Loader2 className='animate-spin' />
          </div>
        ) : communityValue.length === 0 && chartData.length === 0 ? (
          <div className='w-full h-full min-h-[40svh] md:min-h-0 flex items-center justify-center'>
            <Ban className='mr-2' size={18} />
            <p>No data found</p>
          </div>
        ) : (
          <div className='w-full h-full min-h-[40svh] md:min-h-0 flex items-center justify-center'>
            <Chart
              subreddit={communityValue}
              chartData={chartData}
              setChartData={setChartData}
              isDataLoading={isDataLoading}
              setDataLoading={setDataLoading}
            />
          </div>
        )}
        {/* Button */}
        <Button
          className='w-full py-5 bg-orange-500 dark:bg-orange-500 hover:bg-orange-500 dark:hover:bg-orange-600 text-zinc-50 dark:text-zinc-50'
          onClick={handlePostCreation}>
          <Clock4 />
          Schedule your post
        </Button>
      </div>
    </div >
  );
}
