import { useState } from 'react';
import { updateMessage } from '../../services/messagesApi';
import { getColorShades } from '../../utils/color';

import './MsgCard.css';

export default function MsgCard({ message }) {
  const [editMode, setEditMode] = useState(false);
  const [draftText, setDraftText] = useState(message.text);
  const [draftUsername, setDraftUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardText, setCardText] = useState(message.text);
  const [modifiedAt, setModifiedAt] = useState(message.modifiedAt);
  const [modifiedBy, setModifiedBy] = useState(message.modifiedBy);
  const [error, setError] = useState(null);

  const handleEdit = () => {
    setDraftUsername('');
    setEditMode(true);
  };

  const handleCancel = () => {
    setDraftText(message.text);
    setDraftUsername('');
    setEditMode(false);
  };

  const handleSubmit = async () => {
    if (!draftUsername.trim()) {
      setError('You must provide a username');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const updated = await updateMessage(message.id, draftUsername, draftText);
      setCardText(draftText);
      setModifiedBy(updated.data.modifiedBy);
      setModifiedAt(updated.data.modifiedAt);
      setEditMode(false);
    } catch (err) {
      console.error('Failed to modify message', err);
      setError('Failed to modify message');
    } finally {
      setLoading(false);
    }
  };

  const colorShades = getColorShades(message.color);

  return (
    <article
      className={'msg-card'}
      style={{
        background: `linear-gradient(to bottom, ${colorShades.light}, ${colorShades.dark})`,
      }}
    >
      {editMode ? (
        <div className='msg-card__edit'>
          {error && <p className='msg-card__error'>{error}</p>}
          <input
            className='msg-card__username'
            type='text'
            value={draftUsername}
            placeholder='Username'
            onChange={(e) => setDraftUsername(e.target.value)}
            required
          />
          <textarea
            className='msg-card__text msg-card__text-area'
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={4}
            required
          />

          <div className='msg-card__edit-btns'>
            <button
              className='msg-card__cancel-btn'
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className='msg-card__submit-btn'
              onClick={handleSubmit}
              disabled={loading || draftText === message.text}
            >
              {loading ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </div>
      ) : (
        <div className='msg-card__standard'>
          <div className='msg-card__standard-t-container'>
            <time className='msg-card__date' dateTime={message.createdAt}>
              {message.createdAt}
            </time>
            <button className='msg-card__edit-btn' onClick={handleEdit}>
              Edit
            </button>
          </div>
          <p className='msg-card__text'>{cardText}</p>
          <p className='msg-card__name'>- {message.username}</p>
          {modifiedAt && (
            <p className='msg-card__modified-info'>
              Edited by{' '}
              <span className='msg-card__modified-info--bigger'>
                {modifiedBy}{' '}
              </span>
              <time dateTime={modifiedAt}>- {modifiedAt}</time>
            </p>
          )}
        </div>
      )}
    </article>
  );
}
