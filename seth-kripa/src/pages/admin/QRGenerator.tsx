import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, QrCode, Plus, Trash2 } from 'lucide-react';
import QRCode from 'qrcode';
import toast from 'react-hot-toast';

interface TableQR {
  tableNumber: number;
  label: string;
  url: string;
  dataUrl?: string;
}

const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://sethkripa.com';

const QRGenerator: React.FC = () => {
  const [tables, setTables] = useState<TableQR[]>([
    { tableNumber: 1, label: 'Table 1', url: `${BASE_URL}/menu?table=1` },
    { tableNumber: 2, label: 'Table 2', url: `${BASE_URL}/menu?table=2` },
    { tableNumber: 3, label: 'Table 3', url: `${BASE_URL}/menu?table=3` },
    { tableNumber: 4, label: 'Table 4', url: `${BASE_URL}/menu?table=4` },
    { tableNumber: 5, label: 'Table 5', url: `${BASE_URL}/menu?table=5` },
  ]);
  const [generated, setGenerated] = useState<Record<number, string>>({});
  const [newLabel, setNewLabel] = useState('');
  const [newNum, setNewNum] = useState('');
  const [generating, setGenerating] = useState(false);

  const generateAll = async () => {
    setGenerating(true);
    const result: Record<number, string> = {};
    for (const table of tables) {
      try {
        const dataUrl = await QRCode.toDataURL(table.url, {
          width: 300,
          margin: 2,
          color: { dark: '#1C1C1E', light: '#FFFFFF' },
          errorCorrectionLevel: 'H',
        });
        result[table.tableNumber] = dataUrl;
      } catch (err) {
        console.error('QR error', err);
      }
    }
    setGenerated(result);
    setGenerating(false);
    toast.success(`Generated ${Object.keys(result).length} QR codes`);
  };

  const downloadQR = (table: TableQR) => {
    const dataUrl = generated[table.tableNumber];
    if (!dataUrl) return toast.error('Generate first');
    const link = document.createElement('a');
    link.download = `seth-kripa-${table.label.toLowerCase().replace(/\s+/g, '-')}-qr.png`;
    link.href = dataUrl;
    link.click();
    toast.success(`Downloaded QR for ${table.label}`);
  };

  const downloadAll = () => {
    tables.forEach((t, i) => {
      setTimeout(() => downloadQR(t), i * 300);
    });
  };

  const addTable = () => {
    const num = Number(newNum);
    if (!newLabel.trim() || !num) return toast.error('Enter label and number');
    if (tables.some(t => t.tableNumber === num)) return toast.error('Table number already exists');
    setTables(prev => [...prev, { tableNumber: num, label: newLabel.trim(), url: `${BASE_URL}/menu?table=${num}` }]);
    setNewLabel(''); setNewNum('');
    toast.success('Table added');
  };

  const removeTable = (num: number) => {
    setTables(prev => prev.filter(t => t.tableNumber !== num));
    setGenerated(prev => { const n = { ...prev }; delete n[num]; return n; });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>QR Code Generator</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.825rem', marginTop: '0.25rem' }}>Generate table-wise QR codes for your digital menu</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={generateAll}
            disabled={generating}
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #7B1D2E, #9B2D3E)', color: 'white', border: 'none', borderRadius: 10, padding: '0.65rem 1.25rem', fontSize: '0.825rem', fontWeight: 600, cursor: 'pointer', opacity: generating ? 0.7 : 1 }}
          >
            <QrCode size={15} /> {generating ? 'Generating…' : 'Generate All'}
          </button>
          {Object.keys(generated).length > 0 && (
            <button onClick={downloadAll} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', borderRadius: 10, padding: '0.65rem 1.25rem', fontSize: '0.825rem', fontWeight: 600, cursor: 'pointer' }}>
              <Download size={15} /> Download All
            </button>
          )}
        </div>
      </div>

      {/* Add table */}
      <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 14, padding: '1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ color: '#C9A84C', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.75rem' }}>Add New Table</div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', display: 'block', marginBottom: '0.3rem' }}>Table Number</label>
            <input type="number" value={newNum} onChange={e => setNewNum(e.target.value)} placeholder="e.g. 6"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.5rem 0.75rem', color: 'white', width: 100, outline: 'none' }} />
          </div>
          <div>
            <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', display: 'block', marginBottom: '0.3rem' }}>Label</label>
            <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="e.g. Table 6"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.5rem 0.75rem', color: 'white', width: 160, outline: 'none' }} />
          </div>
          <button onClick={addTable} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '0.825rem', cursor: 'pointer' }}>
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* Tables grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {tables.map(table => (
          <motion.div
            key={table.tableNumber}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}
          >
            <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>{table.label}</div>

            {generated[table.tableNumber] ? (
              <div style={{ background: 'white', padding: 8, borderRadius: 12 }}>
                <img src={generated[table.tableNumber]} alt={`QR ${table.label}`} style={{ width: 140, height: 140, display: 'block' }} />
              </div>
            ) : (
              <div style={{ width: 156, height: 156, background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '2px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <QrCode size={40} color="rgba(255,255,255,0.2)" />
              </div>
            )}

            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', wordBreak: 'break-all' }}>{table.url}</div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {generated[table.tableNumber] && (
                <button onClick={() => downloadQR(table)} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#C9A84C', color: '#0F0608', border: 'none', borderRadius: 8, padding: '0.5rem 0.9rem', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                  <Download size={13} /> PNG
                </button>
              )}
              <button onClick={() => removeTable(table.tableNumber)} style={{ background: 'rgba(255,100,100,0.1)', border: '1px solid rgba(255,100,100,0.2)', color: '#ff8a8a', borderRadius: 8, padding: '0.5rem', cursor: 'pointer', display: 'flex' }}>
                <Trash2 size={13} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 12, padding: '1rem', fontSize: '0.825rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
        <strong style={{ color: '#C9A84C' }}>How to use:</strong><br />
        1. Add tables and generate QR codes.<br />
        2. Download each QR code as PNG.<br />
        3. Print and place on the respective table.<br />
        4. When customers scan, they'll be taken directly to the menu with the table number pre-identified.
      </div>
    </div>
  );
};

export default QRGenerator;
