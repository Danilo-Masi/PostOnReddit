import { useEffect, useState, useCallback } from 'react';
// Axios
import axios from 'axios';
// minimal-tiptap
import { Content } from '@tiptap/react';
// Components
import DescriptionEditor from './DescriptionEditor';
import SelectOption from './SelectOption';
import TitleEditor from './TitleEditor';
import SearchInput from './SearchInput';
import { DateTimePicker } from './DateTimePicker';
import DailyTime from './DailyTime';
import WeekTime from './WeekTime';
// Shadcnui
import { toast } from 'sonner';
import { Button } from '../ui/button';
// Icons
import { Clock4, ScanEye, Settings } from 'lucide-react';
// Hooks
import { checkRedditAuthorization } from '@/hooks/use-retrieve-data';
// Context
import { useAppContext } from '../context/AppContext';

// Url del server
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function Dashboard() {
  const [isAccessToken, setAccessToken] = useState<boolean>(false);

  const {
    setSelectedSection,
    setPreviewDialogOpen,
    titleValue,
    setTitleValue,
    descriptionValue,
    setDescriptionValue,
    communityValue,
    setCommunityValue,
    flairValue,
    setFlairValue,
    dateTime,
    setDateTime,
  } = useAppContext();

  // Funzione per la validazione del form
  const handleValidateForm = useCallback(
    (title: string, content: Content, community: string, data: Date) => {
      const errors: string[] = [];
      if (!title.trim()) errors.push("The title can't be empty");
      if (!content || content.length <= 0) errors.push("The content can't be empty");
      if (!community.trim()) errors.push("The community is not selected");
      if (!data || isNaN(data.getTime())) {
        errors.push("The date selected is not valid");
      } else if (data.getTime() < Date.now()) {
        errors.push("The date can't be in the past");
      }
      return errors;
    },
    []
  );

  // Funzione per gestire il successo
  const handleSuccess = useCallback(() => {
    toast.success('Post scheduled correctly!');
    setTitleValue('');
    setDescriptionValue('');
    setCommunityValue('');
    setFlairValue('');
    setDateTime(
      new Date(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        new Date().getUTCHours(),
        new Date().getUTCMinutes(),
        0,
        0
      )
    );
  }, [setTitleValue, setDescriptionValue, setCommunityValue, setFlairValue, setDateTime]);

  // Funzione per creare un post
  const handlePostCreation = useCallback(async () => {
    const errors = handleValidateForm(titleValue, descriptionValue, communityValue, dateTime);
    if (errors.length > 0) {
      errors.forEach((error) => toast.warning(error));
      return;
    }

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post(
        `${SERVER_URL}/supabase/create-post`,
        {
          title: titleValue,
          content: descriptionValue,
          community: communityValue,
          flair: flairValue,
          date_time: dateTime,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.status === 200) handleSuccess();
    } catch (error: any) {
      console.error('Errore durante il salvataggio del post su DB', error.message);

      if (error.response?.data?.details) {
        error.response.data.details.forEach((errMsg: string) => toast.error(errMsg));
      } else {
        toast.error('An error occurred, please try again later');
      }
    }
  }, [titleValue, descriptionValue, communityValue, flairValue, dateTime, handleSuccess]);

  // Recupera il token di autorizzazione solo una volta
  useEffect(() => {
    const fetchInfo = async () => {
      const verifiedToken = await checkRedditAuthorization();
      setAccessToken(verifiedToken || false);
    };

    fetchInfo();
  }, []);

  // Struttura del componente
  return (
    <div className="w-full h-fit md:h-full flex md:flex-row flex-col justify-center items-center gap-10 p-5 rounded-xl bg-zinc-200 dark:bg-zinc-700">
      {isAccessToken ? (
        <>
          {/*** BLOCCO SINISTRA ***/}
          <div className="w-full md:w-1/2 h-full flex flex-col gap-y-6">
            {/* TITLE EDITOR */}
            <TitleEditor titleValue={titleValue} setTitleValue={setTitleValue} />
            {/* DESCRIPTION EDITOR */}
            <DescriptionEditor descriptionValue={descriptionValue} setDescriptionValue={setDescriptionValue} />
          </div>

          {/*** BLOCCO DESTRA ***/}
          <div className="w-full md:w-1/2 h-full flex flex-col p-5 gap-y-10 md:gap-y-0 bg-zinc-100 dark:bg-zinc-800 border border-border rounded-lg">
            {/* Input subreddit, flair, date */}
            <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-4">
              <SearchInput communityValue={communityValue} setCommunityValue={setCommunityValue} />
              <SelectOption
                subreddit={communityValue}
                isDisabled={!communityValue}
                placeholder="Select a flair"
                value={flairValue}
                setValue={setFlairValue}
              />
              <DateTimePicker date={dateTime} setDate={setDateTime} />
            </div>
            {/* Statistiche giorno e orari */}
            <div className="w-full h-auto min-h-[50svh] max-h-[50svh] md:max-h-full flex flex-col gap-3 my-3 md:my-5 overflow-scroll">
              <h1 className="font-bold text-xl md:text-lg text-zinc-900 dark:text-zinc-50">Best time for today</h1>
              <DailyTime subreddit={communityValue} setDateTime={setDateTime} />
              <h1 className="font-bold text-xl md:text-lg text-zinc-900 dark:text-zinc-50">Best time for the week</h1>
              <WeekTime subreddit={communityValue} />
            </div>
            {/* Buttons */}
            <div className="w-full h-auto flex flex-col md:flex-row gap-4">
              <Button className="w-full md:w-1/3 py-5" onClick={() => setPreviewDialogOpen(true)}>
                <ScanEye />
                Preview
              </Button>
              <Button
                className="w-full md:w-2/3 py-5 bg-orange-500 dark:bg-orange-500 hover:bg-orange-500 dark:hover:bg-orange-600 text-zinc-50 dark:text-zinc-50"
                onClick={handlePostCreation}>
                <Clock4 />
                Schedule your post
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-center gap-y-6 overflow-scroll">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Grant Reddit permissions to start creating your post
          </h1>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-300">
            You need to authorize access before you can schedule posts
          </p>
          <Button className="bg-orange-500 dark:bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-600 dark:text-zinc-50" onClick={() => setSelectedSection('settings')}>
            <Settings />
            Go to Settings
          </Button>
        </div>
      )}
    </div>
  );
}