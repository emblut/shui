import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMessage } from '../../services/messagesApi.js';
import useUsername from '../../hooks/useUsername.js';
import { getRandomColor, getColorShades } from '../../utils/color.js';
import './CreateMsgPage.css';

export default function CreateMsgPage() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username, setUsername } = useUsername();
  const [color] = useState(getRandomColor());

  const colorShades = getColorShades(color);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createMessage(username, text, color);
      setUsername('');
      setText('');
      navigate('/');
    } catch (err) {
      setError(JSON.parse(err.message).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='create-msg'
      style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, ${colorShades.light}, ${colorShades.dark})`,
      }}
    >
      <form className='create-msg__form' onSubmit={handleSubmit}>
        <textarea
          aria-label='Your message'
          className='create-msg__text'
          value={text}
          placeholder='Your message'
          onChange={(e) => setText(e.target.value)}
          required
          rows={15}
        />
        <div>
          <input
            aria-label='Username'
            className='create-msg__username'
            type='text'
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button className='create-msg__btn' type='submit' disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
