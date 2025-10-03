import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import MsgCard from '../../components/MsgCard/MsgCard.jsx';
import CreateBtn from '../../components/CreateBtn/CreateBtn.jsx';
import { getMessages } from '../../services/messagesApi.js';
import './FeedPage.css';
import { useLocation } from 'react-router-dom';
import useUsername from '../../hooks/useUsername.js';

import wavesMobile from '../../assets/waves.png';
import wavesDesktop from '../../assets/waves-desktop.png';

export default function FeedPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [sortOrder, setSortOrder] = useState('newestFirst');
  const location = useLocation();
  const { username, setUsername } = useUsername();

  useEffect(() => {
    setLoading(true);
    getMessages(username, sortOrder)
      .then((result) => {
        setMessages(result.data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [username, sortOrder]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryUsername = params.get('username') || '';
    setUsername(queryUsername);
  }, [location.search]);

  if (loading)
    return (
      <div className='feed-page'>
        <div className='feed-page__top-container'>
          <SearchBar
            classNames={'feed-page__search-bar'}
            value={searchValue}
            onChange={setSearchValue}
            onSearch={setUsername}
          />
          <div className='feed-page__dropdown-container'>
            <label className='feed-page__dropdown-label' htmlFor='orderSelect'>
              Sort by
            </label>
            <select
              className='feed-page__dropdown'
              id='orderSelect'
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option className='feed-page__dropdown-opt' value='newestFirst'>
                Newest first
              </option>
              <option className='feed-page__dropdown-opt' value='oldestFirst'>
                Oldest first
              </option>
            </select>
          </div>
        </div>
        <section className='feed-section'>
          <p className='feed-section__loading-messages'>Loading messages...</p>
        </section>
        <CreateBtn />
      </div>
    );

  return (
    <div className='feed-page'>
      <div className='feed-page__top-container'>
        <SearchBar
          classNames={'feed-page__search-bar'}
          value={searchValue}
          onChange={setSearchValue}
          onSearch={setUsername}
        />
        <div className='feed-page__dropdown-container'>
          <label className='feed-page__dropdown-label' htmlFor='orderSelect'>
            Sort by
          </label>
          <select
            className='feed-page__dropdown'
            id='orderSelect'
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option className='feed-page__dropdown-opt' value='newestFirst'>
              Newest first
            </option>
            <option className='feed-page__dropdown-opt' value='oldestFirst'>
              Oldest first
            </option>
          </select>
        </div>
      </div>
      <section className='feed-section'>
        {messages.length > 0 ? (
          messages.map((msg) => <MsgCard key={msg.id} message={msg} />)
        ) : (
          <>
            <p className='feed-page__no-messages'>No messages to display.</p>
            <picture>
              <source media='(max-width: 699px)' srcSet={wavesMobile} />
              <source media='(min-width: 700px)' srcSet={wavesDesktop} />
              <img
                className='feed-page__waves'
                src={wavesMobile}
                alt='Blue waves'
              />
            </picture>
          </>
        )}
      </section>
      <CreateBtn />
    </div>
  );
}
