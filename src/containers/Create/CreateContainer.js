'use client';

import { useEffect, useRef, useState } from 'react';
import classes from './CreateContainer.module.css';
import searchLogo from '@assets/logos/search.svg';
import {
  createBlog,
  createDraft,
  getDraftDetails,
  searchTags,
} from '@utils/api';
import { enqueueSnackbar } from 'notistack';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@context/AuthContext';
import RichEditor from '@containers/Editor/Editor';
import ChoiceModal from '@components/modals/ThumbnailChoiceModal/ChoiceModal';
import { getCookie } from 'cookies-next';
import { getTokenFromCookie } from '@utils/localStorageUtils';

const CreateContainer = () => {
  const { setOpenLogin } = useAuth();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [selectedTags, setSelectedTags] = useState({
    places: [],
    activities: [],
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [editorLoading, setEditorLoading] = useState(true);
  const [data, setData] = useState({ title: '', content: '', attachments: [] });
  const [nextTask, setNextTask] = useState();
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const auth = getTokenFromCookie();
    if (!auth) {
      setOpenLogin(true);
      router.push('/');
    }
    const draftId = searchParams.get('draftId');
    const fetchDraftDetails = async (draftId) => {
      try {
        const response = await getDraftDetails(`/draft/${draftId}`);
        setData({
          title: response.data.title,
          content: response.data.content,
          attachments: response.data.attachments,
        });
        setThumbnailUrl(response.data.thumbnail);
        setSelectedTags(response.data.tags);
      } catch (error) {
        console.error(error);
        router.push('/create');
      }
    };
    if (draftId) {
      fetchDraftDetails(draftId);
    }
  }, []);

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      setSearchResult([]);
      return;
    }
    try {
      const response = await searchTags('/tags/search', {
        search: e.target.value,
      });
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTagSelect = (item) => {
    if (item.isPlace || !item.types) {
      setSelectedTags((prev) => ({ ...prev, places: [item, ...prev.places] }));
    } else {
      setSelectedTags((prev) => ({
        ...prev,
        activities: [item, ...prev.activities],
      }));
    }
    setQuery('');
    setSearchResult([]);
  };

  const handleTagRemove = (tag) => {
    if (tag.isPlace || !tag.types) {
      const newPlaces = selectedTags.places.filter((el) => {
        return el._id !== tag._id;
      });
      setSelectedTags((prev) => ({ ...prev, places: newPlaces }));
    } else {
      const newActivities = selectedTags.activities.filter((el) => {
        return el._id !== tag._id;
      });
      setSelectedTags((prev) => ({ ...prev, activities: newActivities }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Esc' || e.key === 'Escape') {
      setSearchResult([]);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!document.activeElement.closest('.search-result')) {
        setSearchResult([]);
      }
    }, 0);
  };

  const checkThumbnail = (next) => {
    if (thumbnailUrl && thumbnail) {
      setShowChoiceModal(true);
      setNextTask(next);
    } else {
      if (next === 'create') {
        if (thumbnailUrl) handleCreateBlog('url');
        else if (thumbnail) handleCreateBlog('file');
        else {
          enqueueSnackbar('Choose a thumbnail!', { variant: 'error' });
          return;
        }
      } else {
        if (thumbnailUrl) handleCreateDraft('url');
        else handleCreateDraft('file');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setThumbnail(e.target.files[0]);
  };

  const handleCreateDraft = async (type) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('tags', selectedTags);
    if (type === 'url') formData.append('thumbnailUrl', thumbnailUrl);
    else formData.append('thumbnailFile', thumbnail);
    setLoading(true);
    try {
      const draftId = searchParams.get('draftId');
      const response = await createDraft(`/draft?draftId=${draftId}`, formData);
      if (response.status == 201) {
        enqueueSnackbar('Draft saved!', { variant: 'success' });
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error occurred!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (type) => {
    if (!data.title || !data.content) {
      enqueueSnackbar('Fill all the required fields!', { variant: 'error' });
      return;
    }
    if (type === 'url' && !thumbnailUrl) {
      enqueueSnackbar('Fill all the required fields!', { variant: 'error' });
      return;
    }
    if (type === 'file' && !thumbnail) {
      enqueueSnackbar('Fill all the required fields!', { variant: 'error' });
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('tags', selectedTags);
    if (type === 'url') formData.append('thumbnailUrl', thumbnailUrl);
    else formData.append('thumbnailFile', thumbnail);
    setLoading(true);
    try {
      const draftId = searchParams.get('draftId');
      const response = await createBlog(`/blog?draftId=${draftId}`, formData);
      if (response.status == 201) {
        enqueueSnackbar('Blog created!', { variant: 'success' });
        router.push('/');
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error occurred!', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={classes.create}>
        <div className={classes['create-left']}>
          <div className={classes.heading}>
            <h2>Write your Blog</h2>
          </div>
          <div className={classes.title}>
            <div className={classes['title-label']}>Title</div>
            <div className={classes['title-value']}>
              <input
                type='text'
                placeholder='Enter the title'
                name='title'
                value={data.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={classes.body}>
            <RichEditor
              setEditorLoading={setEditorLoading}
              editorLoading={editorLoading}
              onChange={(content) =>
                setData((prev) => ({ ...prev, ['content']: content }))
              }
            />
          </div>
        </div>
        <div className={classes['create-right']}>
          <div className={classes.tags}>
            <div className={classes['tags-label']}>Tags</div>
            <div className={classes['tags-value']}>
              <img src={searchLogo.src} alt='' />
              <input
                value={query}
                onChange={handleSearch}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                type='text'
                placeholder='Search tags related to your travlog'
              />
              {searchResult.length > 0 && (
                <div className={`search-result ${classes['result-list']}`}>
                  {searchResult.map((item) => {
                    if (
                      selectedTags.places.includes(item._id) ||
                      selectedTags.activities.includes(item._id)
                    )
                      return null;
                    return (
                      <div
                        onMouseDown={() => handleTagSelect(item)}
                        className={classes.result}
                        key={item._id}
                      >
                        {item.name}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className={classes['selected-tags-container']}>
            <div style={{ textAlign: 'center', width: '100%' }}>
              {selectedTags.length > 0
                ? 'Click on the tags to remove'
                : 'Search and select tags to add'}
            </div>
            <div className={classes['selected-tags-div']}>
              {selectedTags?.places?.length > 0 &&
                selectedTags?.places.map((tag) => {
                  return (
                    <span onClick={() => handleTagRemove(tag)} key={tag._id}>
                      {tag.name}
                    </span>
                  );
                })}
              {selectedTags?.activities?.length > 0 &&
                selectedTags?.activities.map((tag) => {
                  return (
                    <span onClick={() => handleTagRemove(tag)} key={tag._id}>
                      {tag.name}
                    </span>
                  );
                })}
            </div>
          </div>
          <div className={classes.thumbnail}>
            <div className={classes['thumbnail-text']}>
              <div className={classes['thumbnail-label']}>Thumbnail</div>
              <div className={classes['thumbnail-value']}>
                <input
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  type='text'
                  placeholder='Add thumbnail url'
                />
              </div>
            </div>
            <div style={{ width: '100%', textAlign: 'center' }}>Or</div>
            <input
              ref={inputRef}
              style={{ display: 'none' }}
              type='file'
              accept='image/*'
              onChange={(e) => handleFileChange(e)}
            />
            <div
              onClick={() => inputRef.current.click()}
              className={`${classes['thumbnail-file']} pointer`}
            >
              {thumbnail ? thumbnail.name : 'Choose thumbnail file'}
            </div>
          </div>
          <div className={classes['btns']}>
            <button
              onClick={() => checkThumbnail('save')}
              className={`btn ${classes['create-btn']}`}
            >
              Save
            </button>
            <button
              onClick={() => checkThumbnail('create')}
              className={`btn ${classes['create-btn']}`}
            >
              Publish
            </button>
          </div>
        </div>
      </div>
      {showChoiceModal && (
        <ChoiceModal
          open={showChoiceModal}
          close={() => setShowChoiceModal(false)}
          next={nextTask}
          create={handleCreateBlog}
          save={handleCreateDraft}
        />
      )}
    </>
  );
};

export default CreateContainer;
