import { FaArrowUpFromBracket } from 'react-icons/fa6';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';

type FormData = {
   prompt: string;
};

const ChatBot = () => {
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   const onSubmit = (data: FormData) => {
      console.log(data);
      reset();
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         onKeyDown={handleKeyDown}
         className="flex gap-2 flex-col items-end border-2 p-5 rounded-2xl"
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (data) => data.trim().length > 0,
            })}
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="Ask something here ..."
            maxLength={1000}
         />
         <Button
            disabled={!formState.isValid}
            className="rounded-full w-10 h-10"
         >
            <FaArrowUpFromBracket />
         </Button>
      </form>
   );
};

export default ChatBot;
