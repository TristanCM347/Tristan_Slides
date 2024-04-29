/**
 * Given a js file object representing a jpg or png image, such as one taken
 * from a html file input element, return a promise which resolves to the file
 * data as a data url.
 * More info:
 *   https://developer.mozilla.org/en-US/docs/Web/API/File
 *   https://developer.mozilla.org/en-US/docs/Web/API/FileReader
 *   https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
 *
 * Example Usage:
 *   const file = document.querySelector('input[type="file"]').files[0];
 *   console.log(fileToDataUrl(file));
 * @param {File} file The file to be read.
 * @return {Promise<string>} Promise which resolves to the file as a data url.
 */
// export function fileToDataUrl (file) {
//   const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/webm', 'video/ogg'];
//   const valid = validFileTypes.find(type => type === file.type);

//   if (!valid) {
//     throw Error('provided file is not a png, jpg or jpeg image.');
//   }

//   const reader = new FileReader();
//   const dataUrlPromise = new Promise((resolve, reject) => {
//     reader.onerror = reject;
//     reader.onload = () => resolve(reader.result);
//   });
//   reader.readAsDataURL(file);
//   return dataUrlPromise;
// }

function isFile (input) {
  return input instanceof File;
}

export async function fileToDataUrl (input) {
  if (isFile(input)) {
    // Handle file object
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/webm', 'video/ogg'];
    const valid = validFileTypes.includes(input.type);

    if (!valid) {
      throw new Error('Provided file is not a valid image or video.');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(input);
    });
  } else if (typeof input === 'string') {
    // Handle URL
    const response = await fetch(input);
    if (!response.ok) {
      throw new Error('Failed to fetch the image');
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Error converting blob to data URL'));
      reader.readAsDataURL(blob);
    });
  } else {
    throw new Error('Input must be a file or a valid URL');
  }
}
