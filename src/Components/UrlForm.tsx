import React, { useState } from 'react';
import { useCreateLinkMutation } from '../Store/apiSlice';
import './UrlForm.css'; 

interface UrlFormProps {
  setChange: React.Dispatch<React.SetStateAction<number>>;
}

const UrlForm: React.FC<UrlFormProps> = ({ setChange }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const createLink = useCreateLinkMutation();

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id || '';

  const validateUrl = (url: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    ); 
    return !!urlPattern.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl || !validateUrl(originalUrl)) {
      setErrorMessage('Please enter a valid URL.');
      return;
    }
    if (!customUrl) {
      setErrorMessage('Please enter a custom URL.');
      return;
    }
    if (!title) {
      setErrorMessage('Please enter a title.');
      return;
    }
    setErrorMessage('');
    try {
      await createLink[0]({ user_id: userId, original_url: originalUrl, custom_url: customUrl, title });
      setOriginalUrl('');
      setCustomUrl('');
      setTitle('');
      setChange((prev)=>prev+1)
    } catch (error) {
      setErrorMessage('An error occurred while creating the link.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={originalUrl}
        className='form-control'
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Enter URL"
      />
      {errorMessage && !originalUrl && <div className="error">{errorMessage}</div>}
      <input
        type="text"
        className='form-control'
        value={customUrl}
        onChange={(e) => setCustomUrl(e.target.value)}
        placeholder="Enter Custom URL"
      />
      {errorMessage && !customUrl && <div className="error">{errorMessage}</div>}
      <input
        type="text"
        className='form-control'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Title"
      />
      {errorMessage && !title && <div className="error">{errorMessage}</div>}
      <button type="submit">Shorten URL</button>
      {errorMessage && originalUrl && customUrl && title && <div className="error">{errorMessage}</div>}
    </form>
  );
};

export default UrlForm;
