import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Content } from '@tiptap/react';
import DescriptionEditor from './DescriptionEditor';
import SelectFlair from './SelectFlair';
import TitleEditor from './TitleEditor';
import SearchSubreddits from './SearchSubreddits';
import { DateTimePicker } from './DateTimePicker';
import DailyTime from './DailyTime';
import WeekTime from './WeekTime';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Check, Loader2, ScanEye, Settings } from 'lucide-react';
import { checkRedditAuthorization } from '@/hooks/use-retrieve-data';
import { checkPlan } from '@/hooks/use-verify';
import { useAppContext } from '../context/AppContext';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

export default function Dashboard() {
  const [isAccessToken, setAccessToken] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [userTimeZone] = useState(localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone);

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
    isPro,
    setIsPro
  } = useAppContext();

  // Funzione per la validazione del form
  const handleValidateForm = useCallback((title: string, content: Content, community: string, data: Date) => {
    const errors = [
      !title.trim() && "The title can't be empty",
      !content || content.length <= 0 && "The content can't be empty",
      !community.trim() && "The community is not selected",
      (!data || isNaN(data.getTime())) && "The date selected is not valid",
      (data.getTime() < Date.now()) && "The date can't be in the past",
    ].filter(Boolean);

    return errors as string[];
  }, []);

  // Funzione per gestire il successo della funzionalità
  const handleSuccess = useCallback(() => {
    toast.success('Post scheduled correctly!');
    setTitleValue('');
    setDescriptionValue('');
    setCommunityValue('');
    setFlairValue('');
    const nowInUserTZ = new Date().toLocaleString("en-US", { timeZone: userTimeZone });
    setDateTime(new Date(nowInUserTZ));
  }, [setTitleValue, setDescriptionValue, setCommunityValue, setFlairValue, setDateTime, userTimeZone]);

  // Funzione per creare un post nel DB
  const handlePostCreation = useCallback(async () => {
    const errors = handleValidateForm(titleValue, descriptionValue, communityValue, dateTime);
    if (errors.length > 0) {
      errors.forEach((error) => toast.warning(error));
      return;
    }
    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');

      if (!isPro) {
        try {
          const { data } = await axios.get(`${SERVER_URL}/supabase/retrieve-posts`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });
          if (data.posts.length >= 1) {
            toast.info("Become pro to schedule more than 1 post at time");
            return;
          }
        } catch (error) {
          console.error("Errore durante il caricamento dei post già presenti nel DB");
          return;
        }
      }

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
    } finally {
      setLoading(false);
    }
  }, [titleValue, descriptionValue, communityValue, flairValue, dateTime, handleSuccess]);

  useEffect(() => {
    localStorage.setItem("userTimeZone", userTimeZone);
  }, [userTimeZone]);

  useEffect(() => {
    const fetchPlanStatus = async () => {
      try {
        const planStatus = await checkPlan();
        setIsPro(planStatus);
      } catch (error: any) {
        console.error(`Errore nel controllo dello stato del piano: ${error.message || error}`);
        setIsPro(false);
      }
    };
    fetchPlanStatus();
  }, []);

  useEffect(() => {
    (async () => {
      setAccessToken(await checkRedditAuthorization() || false);
    })();
  }, []);

  return (
    <div className="w-full h-fit md:h-full flex md:flex-row flex-col justify-center items-center gap-10 p-5 rounded-xl bg-zinc-200 dark:bg-zinc-700">
      {isAccessToken ? (
        <>
          <div className="w-full md:w-1/2 h-full flex flex-col gap-y-6">
            {/* Title editor */}
            <TitleEditor titleValue={titleValue} setTitleValue={setTitleValue} />
            {/* Content editor */}
            <DescriptionEditor descriptionValue={descriptionValue} setDescriptionValue={setDescriptionValue} />
          </div>
          <div className="w-full md:w-1/2 h-full flex flex-col p-5 gap-y-10 md:gap-y-0 bg-zinc-100 dark:bg-zinc-800 border border-border rounded-lg">
            {/* Input subreddit, flair, date */}
            <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-4">
              <SearchSubreddits communityValue={communityValue} setCommunityValue={setCommunityValue} />
              <SelectFlair
                subreddit={communityValue}
                isDisabled={!communityValue}
                placeholder="Select a flair"
                value={flairValue}
                setValue={setFlairValue}
              />
              <DateTimePicker date={dateTime} setDate={setDateTime} />
            </div>
            {/* Statistiche giornaliere e settimanali */}
            <div className="w-full h-auto min-h-[50svh] max-h-[50svh] md:max-h-full flex flex-col gap-3 my-3 md:my-5 overflow-scroll">
              <h1 className="font-bold text-xl md:text-lg text-zinc-900 dark:text-zinc-50">Best time for today ({userTimeZone})</h1>
              <DailyTime subreddit={communityValue} />
              <h1 className="font-bold text-xl md:text-lg text-zinc-900 dark:text-zinc-50">Best time for the week ({userTimeZone})</h1>
              <WeekTime subreddit={communityValue} />
            </div>
            {/* Bottoni per la preview e la programmazione del post */}
            <div className="w-full h-auto flex flex-col md:flex-row gap-4">
              <Button aria-label="Preview your post" className="w-full md:w-1/3 py-5" onClick={() => setPreviewDialogOpen(true)}>
                <ScanEye />
                Preview
              </Button>
              <Button
                aria-label="Schedule your post"
                className="w-full md:w-2/3 py-5 bg-orange-500 dark:bg-orange-500 hover:bg-orange-500 dark:hover:bg-orange-600 text-zinc-50 dark:text-zinc-50"
                onClick={handlePostCreation}>
                {isLoading ? <><Loader2 className='animate-spin' /> Loading</> : <><Check /> Schedule your post</>}
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-center gap-y-3">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Grant Reddit permissions to start creating your post
          </h1>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-300">
            You need to authorize access before you can schedule posts
          </p>
          <Button aria-label="Go to settings" className="bg-orange-500 dark:bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-600 dark:text-zinc-50" onClick={() => setSelectedSection('settings')}>
            <Settings />
            Go to Settings
          </Button>
        </div>
      )}
    </div>
  );
}