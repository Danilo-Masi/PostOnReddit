import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { CalendarCheck2, Loader2, ScanEye, Settings } from 'lucide-react';
import { checkRedditAuthorization } from '@/hooks/use-retrieve-data';
import { checkPlan } from '@/hooks/use-verify';
import { useAppContext } from '../context/AppContext';
import { cn } from '@/lib/utils';
import DescriptionEditor from './DescriptionEditor';
import SelectFlair from './SelectFlair';
import TitleEditor from './TitleEditor';
import SearchSubreddits from './SearchSubreddits';
import { DateTimePicker } from './DateTimePicker';
import DailyTime from './DailyTime';
import WeekTime from './WeekTime';
import { toZonedTime } from 'date-fns-tz';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

interface FormErrors {
  title?: string;
  content?: string;
  community?: string;
  date?: string;
}

export default function Dashboard() {
  const [isAccessToken, setAccessToken] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [userTimeZone] = useState(() =>
    localStorage.getItem("userTimeZone") || Intl.DateTimeFormat().resolvedOptions().timeZone
  );

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

  // Funzione per validare il form
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!titleValue?.trim()) {
      newErrors.title = "The title can't be empty";
    }

    if (!descriptionValue || (typeof descriptionValue === 'string' && descriptionValue.length <= 0)) {
      newErrors.content = "The content can't be empty";
    }

    if (!communityValue?.trim()) {
      newErrors.community = "The community is not selected";
    }

    if (!dateTime || isNaN(dateTime.getTime())) {
      newErrors.date = "The date selected is not valid";
    } else if (dateTime.getTime() < Date.now()) {
      newErrors.date = "The date can't be in the past";
    }

    return newErrors;
  }, [titleValue, descriptionValue, communityValue, dateTime]);

  // Funzione per gestire il successo
  const handleSuccess = useCallback(() => {
    toast.success('Post scheduled correctly!');
    setTitleValue('');
    setDescriptionValue('');
    setCommunityValue('');
    setFlairValue('');
    setDateTime(toZonedTime(new Date(), userTimeZone));
    setErrors({});
  }, [setTitleValue, setDescriptionValue, setCommunityValue, setFlairValue, setDateTime]);

  // Funzione per gestire la creazione del post
  const handlePostCreation = useCallback(async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      if (!isPro) {
        const { data } = await axios.get(`${SERVER_URL}/supabase/retrieve-posts`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (data.posts.length >= 1) {
          toast.info("Become pro to schedule more than 1 post at time");
          return;
        }
      }

      await axios.post(
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

      handleSuccess();
    } catch (error: any) {
      console.error('Error saving post:', error);
      if (error.response?.data?.details) {
        error.response.data.details.forEach((errMsg: string) => toast.error(errMsg));
      } else {
        toast.error('An error occurred, please try again later');
      }
    } finally {
      setLoading(false);
    }
  }, [titleValue, descriptionValue, communityValue, flairValue, dateTime, isPro, validateForm, handleSuccess]);

  useEffect(() => {
    localStorage.setItem("userTimeZone", userTimeZone);
  }, [userTimeZone]);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const [planStatus, isAuthorized] = await Promise.all([
          checkPlan(),
          checkRedditAuthorization()
        ]);
        setIsPro(planStatus);
        setAccessToken(isAuthorized || false);
      } catch (error) {
        console.error('Error initializing app:', error);
        setIsPro(false);
        setAccessToken(false);
      }
    };
    initializeApp();
  }, [setIsPro]);

  // Funzione per generare il contenuto del pulsante di pianificazione
  const scheduleButtonContent = useMemo(() => (
    isLoading ? (
      <>
        <Loader2 className="mr-2 animate-spin" />
        Loading
      </>
    ) : (
      <>
        Schedule your post
        <CalendarCheck2 />
      </>
    )
  ), [isLoading]);

  if (!isAccessToken) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center text-center bg-zinc-200 dark:bg-zinc-700 rounded-lg">
        <h1 className="text-xl text-balance font-semibold text-zinc-700 dark:text-zinc-50">
          Connect your Reddit account to get started
        </h1>
        <p className="text-sm font-medium text-balance text-zinc-500 dark:text-zinc-300 mb-6">
          You need to connect your Reddit account to schedule posts
        </p>
        <Button
          aria-label="Go to settings"
          className="bg-orange-600 dark:bg-orange-600 hover:bg-orange-600/85 dark:hover:bg-orange-600/85 text-white dark:text-white"
          onClick={() => setSelectedSection('settings')}>
          Go to settings
          <Settings />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn(
      "w-full h-fit md:h-full",
      "flex md:flex-row flex-col",
      "justify-center items-center gap-10 p-5",
      "rounded-xl bg-zinc-200 dark:bg-zinc-700"
    )}>
      <div className="w-full md:w-1/2 h-full flex flex-col gap-y-6">
        <TitleEditor
          titleValue={titleValue}
          setTitleValue={setTitleValue}
          error={errors.title}
        />
        <DescriptionEditor
          descriptionValue={descriptionValue}
          setDescriptionValue={setDescriptionValue}
          error={errors.content}
        />
      </div>

      <div className={cn(
        "w-full md:w-1/2 h-full",
        "flex flex-col p-5 gap-y-10 md:gap-y-0",
        "bg-zinc-100 dark:bg-zinc-800",
        "border border-border rounded-lg"
      )}>
        <div className="w-full flex flex-col md:flex-row md:flex-wrap gap-4">
          <SearchSubreddits
            communityValue={communityValue}
            setCommunityValue={setCommunityValue}
            error={errors.community}
          />
          <SelectFlair
            subreddit={communityValue}
            isDisabled={!communityValue}
            placeholder="Select a flair"
            value={flairValue}
            setValue={setFlairValue}
          />
          <DateTimePicker />
        </div>

        <div className={cn(
          "w-full h-auto min-h-[50svh] max-h-[50svh] md:max-h-full",
          "flex flex-col gap-3 my-3 md:my-5",
          "overflow-scroll"
        )}>
          <h1 className="font-bold text-xl md:text-lg text-zinc-900 dark:text-zinc-50">
            Best time in the next 24 hours ({userTimeZone})
          </h1>
          <DailyTime subreddit={communityValue} />

          <h1 className="font-bold text-xl md:text-lg text-zinc-900 dark:text-zinc-50">
            Best time for the week ({userTimeZone})
          </h1>
          <WeekTime subreddit={communityValue} />
        </div>

        <div className="w-full h-auto flex flex-col md:flex-row gap-4">
          <Button
            aria-label="Preview your post"
            className="w-full md:w-1/3 py-5"
            onClick={() => setPreviewDialogOpen(true)}>
            Preview
            <ScanEye className="mr-2" />
          </Button>
          <Button
            aria-label="Schedule your post"
            className={cn(
              "w-full md:w-2/3 py-5",
              "bg-orange-600 dark:bg-orange-500",
              "hover:bg-orange-700 dark:hover:bg-orange-600",
              "text-zinc-50 dark:text-zinc-50"
            )}
            onClick={handlePostCreation}
            disabled={isLoading}>
            {scheduleButtonContent}
          </Button>
        </div>
      </div>
    </div>
  );
}