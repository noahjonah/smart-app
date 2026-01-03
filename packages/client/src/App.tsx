import './App.css';
import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';

function App() {
   const [message, setMessage] = useState('');

   useEffect(() => {
      fetch('/api/hello')
         .then((res) => res.json())
         .then((data) => setMessage(data.message));
   }, []);

   return (
      <div className="p-5 space-y-2">
         <p className="text-2xl tracking-wider font-bold">{message}</p>
         <Button>Click ShadCN</Button>
      </div>
   );
}

export default App;
