import { authAPICall } from './apiCalls';
import { v4 as uuidv4 } from 'uuid';
const DEFAULT_BACKGROUND = '#FFFFFF';

export const getData = async () => {
  let data;
  try {
    data = await authAPICall('store', 'GET', localStorage.getItem('token'));
    if (data.data && data.data.error) {
      console.error('Error in response data:', data.data.error);
      return;
    }
    return data;
  } catch (error) {
    console.error('Error making API call:', error);
  }
}

export const setData = async (data) => {
  try {
    data = await authAPICall('store', 'PUT', localStorage.getItem('token'), JSON.stringify(data));
  } catch (error) {
    console.error('Error making API call:', error);
    return;
  }
  if (data.data && data.data.error) {
    console.error('Error in response data:', data.data.error);
  }
}

export const getPresentation = async (presentationId) => {
  const data = await getData();

  for (const presentation of data.store.presentations) {
    if (presentation.id === presentationId) {
      return presentation;
    }
  }
}

export const createNewSlide = (slideNum) => {
  const slide = {
    content: [],
    background: DEFAULT_BACKGROUND,
    useCustom: false,
    slideId: uuidv4(),
    slideNum
  };
  return slide;
}

export const createNewPresentation = (name, description, thumbnailUrl) => {
  const slide = createNewSlide(1);

  const newPresentation = {
    id: uuidv4(),
    isDeleted: false,
    transition: false,
    name,
    description,
    thumbnailUrl,
    numSlides: 1,
    defaultBackground: DEFAULT_BACKGROUND,
    slides: [slide]
  };
  return newPresentation;
}

export const addNewHistory = async (presentationHistorySnapshot) => {
  let data;
  try {
    data = await authAPICall('store', 'GET', localStorage.getItem('token'));
    if (data.data && data.data.error) {
      console.error('Error in response data:', data.data.error);
      return;
    }

    const now = new Date();
    const dateString = now.toISOString();

    let found = false;
    for (let i = 0; i < data.store.history.length; i++) {
      if (data.store.history[i].id === presentationHistorySnapshot.id) {
        data.store.history[i].versionHistory.push({
          time: dateString,
          snapshot: presentationHistorySnapshot
        });
        found = true;
        break;
      }
    }

    if (!found) {
      data.store.history.push({
        id: presentationHistorySnapshot.id,
        versionHistory: [{ time: dateString, snapshot: presentationHistorySnapshot }]
      });
    }

    data = await authAPICall('store', 'PUT', localStorage.getItem('token'), JSON.stringify(data));
    if (data.data && data.data.error) {
      console.error('Error in response data:', data.data.error);
    }
  } catch (error) {
    console.error('Error making API call:', error);
  }
};

export const changePresentationToVersion = async (version, id) => {
  let data;
  try {
    data = await authAPICall('store', 'GET', localStorage.getItem('token'));
    if (data.data && data.data.error) {
      console.error('Error in response data:', data.data.error);
      return;
    }

    let presentation;
    for (let i = 0; i < data.store.history.length; i++) {
      if (data.store.history[i].id === id) {
        for (let j = 0; j < data.store.history[i].versionHistory.length; j++) {
          if (data.store.history[i].versionHistory[j].time === version) {
            presentation = data.store.history[i].versionHistory[j].snapshot
            break;
          }
        }
        break;
      }
    }
    for (let i = 0; i < data.store.presentations.length; i++) {
      if (data.store.presentations[i].id === id) {
        data.store.presentations[i] = presentation;
        break;
      }
    }

    data = await authAPICall('store', 'PUT', localStorage.getItem('token'), JSON.stringify(data));
    if (data.data && data.data.error) {
      console.error('Error in response data:', data.data.error);
    }
  } catch (error) {
    console.error('Error making API call:', error);
  }
}

export const formattedDateTime = (isoString) => {
  const date = new Date(isoString);
  const hours12 = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  const timeFormat = `${hours12.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')} ${ampm}`;
  const dateFormat = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  const formattedDateTime = `${timeFormat} ${dateFormat}`;

  return formattedDateTime;
}
