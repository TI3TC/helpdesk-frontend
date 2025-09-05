import { useEffect, useState } from 'react';

type Ticket = { id: string; title: string; status?: string; priority?: string; requester?: string; updatedAt?: string };

export default function TicketsPage(){
  const [items,setItems] = useState<Ticket[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string|null>(null);

  useEffect(()=>{
    const ctrl=new AbortController();
    fetch('/api/tickets',{signal: ctrl.signal})
      .then(r=> { if(!r.ok) throw new Error('HTTP '+r.status); return r.json();})
      .then(data=> { setItems(data.items || data); })
      .catch(e=> setError(String(e)))
      .finally(()=> setLoading(false));
    return ()=> ctrl.abort();
  },[]);

  if(loading) return <p style={{padding:'1rem'}}>Carregando...</p>;
  if(error) return <p style={{padding:'1rem', color:'red'}}>Erro: {error}</p>;
  if(!items.length) return <div style={{padding:'1rem'}}>Nenhum ticket ainda.</div>;

  return (
    <div style={{padding:'1rem'}}>
      <h1 style={{fontSize:'20px', fontWeight:600, marginBottom: '12px'}}>Tickets</h1>
      <ul>
        {items.map(t=>(
          <li key={t.id} style={{padding:'8px 0', borderBottom:'1px solid #eee'}}>
            <strong>{t.title}</strong> — {t.status || 'sem status'}
          </li>
        ))}
      </ul>
    </div>
  );
}
