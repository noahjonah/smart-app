import { FaArrowUpFromBracket } from 'react-icons/fa6';
import { Button } from './ui/button';

const ChatBot = () => {
   return (
      <div className="flex gap-2 flex-col items-end border-2 p-5 rounded-2xl">
         <textarea
            className="w-full border-0 focus:outline-0 resize-none"
            placeholder="Ask something here ..."
            maxLength={1000}
         />
         <Button className="rounded-full w-10 h-10">
            <FaArrowUpFromBracket />
         </Button>
      </div>
   );
};

export default ChatBot;
